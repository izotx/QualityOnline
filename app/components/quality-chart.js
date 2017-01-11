import Ember from 'ember';
// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output
//http://stackoverflow.com/questions/35679479/how-to-extract-a-computedproperty-to-its-real-valueloc
const { isEmpty, computed,get,getProperties } = Ember;

export default Ember.Component.extend({
  constants : Ember.inject.service('constants'),
  college : null,


data:computed(function(){
  var college = this.get('college');
  var department = this.get('department'); // Only one of both should be specified, that's how we will identify the query
  var store = this.store;

  var funCount = 0;
  var internalCount = 0;
  var externalCount = 0;
  var training = {};

  var dqoc = 0;
  var qotc = 0;
  var iyoc = 0;

  var reviewQuery;// = undefined;
  var trainingQuery;// = undefined;
  // var depts = store.findAll('department')

  var facultyQuery = undefined;


  if(college){
  var cid = college.getProperties("id").id
  facultyQuery = getFacultyFromCollege(cid,store).then(function(fac){

  return  Ember.RSVP.Promise.all(fac).then(values=>{
        var facs = []
        values.forEach(function(v){
              v.forEach(function(f){
                facs.push(f)
            })
        })
        var data = getFacultyData(facs)
         console.log(data);

        var trainingStats = getTrainingStats(data.training)
        var reviewStats = getReviewsStats(data.reviews)

        console.log(trainingStats);
        console.log(reviewStats);

        dqoc = trainingStats.dqoc
        qotc = trainingStats.qotc
        iyoc = trainingStats.iyoc

        funCount = reviewStats.fun
        internalCount = reviewStats.internal
        externalCount = reviewStats.externalCount


        return data
    })


  })
  }
  else if(department){
  //  reviewQuery = store.query('review',{'faculty.department':department});
  //  trainingQuery = store.query('training',{'faculty.department':department});
    return
  }

//  return {"fun":funCount, "internal":internalCount, "externalCount":externalCount}

  var getData = function() {
    var promise =   new Ember.RSVP.Promise(function(resolve, reject){
           facultyQuery.then(function(data){
           resolve(data);
         });
      });
      return promise;
  }

  var promises = {
    data:getData(),

  };


  var endPromise =   new Ember.RSVP.Promise(function(resolve, reject){
      Ember.RSVP.hash(promises).then(function(results) {

          var array =  [{
              "label": "DQOC",
              "value": dqoc,
              "color": "#6dcb8e"
            },
            {
              "label": "QOTC",
              "value":qotc,
              "color": "#6dbb8c"
            },
            {
              "label": "IYOC",
              "value": iyoc,
              "color": "#d2ca49"
            },
            {
              "label": "QM FUN",
              "value": funCount,
              "color": "#088274"
            },
            {
              "label": "QM CERT",
              "value": externalCount,
              "color": "#448ec6"
            }
          ];
          resolve(array)

      })
  });

  return endPromise;
}),


 didRender() {
    this._super(...arguments);
 },


  init()
  {
    this._super(...arguments);
    this.set('refresh', true);

  },
  didInsertElement() {
    this._super(...arguments);
    // getData(this.store);
    // var store = this.store
    // var name = "";
     var college = this.get('college');
     var department = this.get('department');
    //
     if(college){
        name = college.getProperties('name').name;
    }

    if(department){
        name = department.getProperties('name').name;
    }
    console.log("_____");
    console.log(name);
     var divName =  "chartdiv"+name;
     var data = this.get('data');


     data.then(function(d){

       console.log("Inside the then "+ divName);
       drawHorizontalLinearChart(divName,"Quality",d,false,4)
     })
  },
});




function getTrainingStats(trainings){
  var dqoc = 0;
  var qotc = 0;
  var iyoc = 0;

  console.log("Trainings");
  console.log(trainings);

  // trainings.then(function(vals){
  //   console.log(vals);
  //
  // })

  var promise =   new Ember.RSVP.Promise(function(resolve, reject){
         Ember.RSVP.Promise.all(trainings).then(function(values){
           console.log("V");
           console.log(values);

           values.forEach(function(training){
             console.log(training);
               var t = training.getProperties('type');
                console.log(t.type);
                // console.log(training.faculty.department.college);
               if(t.type){
                 var count = training[t.type] + 1 ;
                 training[t.type] = count;

                 if(t.type == 'ATC Teaching Course (TQOC)'){
                   qotc = qotc + 1;
                 }
                 else if(t.type == 'ATC Design Course (DQOC)' ){
                   dqoc = dqoc + 1;
                 }
                 else if(t.type == 'Improving Your Online Course (IYOC)'){
                   iyoc = iyoc + 1
                 }
               }
             }
           );

         })
  });



  return {"dqoc":dqoc,"qotc":qotc,"iyoc":iyoc}
}


function getReviewsStats(reviews){
  var funCount = 0;
  var internalCount = 0;
  var externalCount = 0;

  reviews.forEach(function(review){

      var r = review.getProperties('courseName','internalDate','externalDate','funDate','faculty')
      if(r.internalDate){
          internalCount++;
      }
      if(r.externalDate){
          externalCount++;
      }
      if(r.funDate){
          funCount++;
      }
  })
  return {"fun":funCount, "internal":internalCount, "externalCount":externalCount}
}

function getFacultyData(facultyArray){
  var training =[]
  var reviews =[]


  facultyArray.forEach(function(facultyMember){
    var r = facultyMember.getProperties(['firstname','reviews'])
    // console.log("Faculty Member inside Get Faculty Data");
    // console.log(facultyMember);
    // console.log(r);

    if (r.reviews){
      r.reviews.forEach(function(rev)
      {
          reviews.push(rev)
      }
    )
    }
    var t = facultyMember.getProperties(['training']).training
    if (t){
      training.push(t)
    }
  })

  return {"training":training, "reviews":reviews}
}

function getFacultyFromCollege(id,store){
  // console.log("College Id "+id)
  var collegesQuery = store.query('department',{orderBy:'college', equalTo:id})
  var facQuery = undefined
  return collegesQuery.then(function(departments){

    var promises = []
     departments.forEach(function(department){
      // console.log("Department: ");
      // console.log(department.getProperties(['name','faculty']));

      var p = new Promise((resolve,reject)=>{
        department.get('faculty').then(function(faculty){
            var facultyArray = []
            // console.log(faculty);
            faculty.forEach(function (f){
                facultyArray.push(f)
                // console.log(f.getProperties(['firstname']));
            })
            resolve(facultyArray)
        })
      });
      promises.push(p)
    });

    return promises
  })

}

function getFacultyFromDepartment(id){
  // var depts = store.find('department',{orderBy:'_id', equalTo:id}})
  var dept = store.find('department',id)
  var faculty = []
  var facQuery = dept.then(function(department){
      console.log("Departments");
      console.log(department);
      var facultyArray = department.getProperties(['faculty']).faculty
      console.log("Departments");
      facultyArray.forEach(function(fac){
            console.log("faculty " + fac);
            faculty.push(fac)
      });
      return faculty
    }
  )
  return facQuery
}


function drawHorizontalLinearChart(div,title,dataProvider,rotate,maximum){

  var chart = AmCharts.makeChart(div, {
  	"type": "serial",
       "theme": "light",
  	"categoryField": "label",
  	"rotate": rotate,

  	"startDuration": 1,
  	"categoryAxis": {
  		"gridPosition": "start",
  		"position": "left",
      "fontSize":9
  	},
    "fillColorsField":"color",

  	"graphs": [
  		{
  			"balloonText": "[[value]]",
  			"fillAlphas": 0.8,
  			"id": "AmGraph-1",
  			"lineAlpha": 0.2,
  			"title": "Value",
  			"type": "column",
  			"valueField": "value",
        "fillColorsField":"color",
  		},
  		{
  			"balloonText": "Expenses:[[value]]",
  			"fillAlphas": 0.8,
  			"id": "AmGraph-2",
  			"lineAlpha": 0.2,
  			"title": "Value",
  			"type": "column",
  			"valueField": "expenses"
  		}
  	],
  	"guides": [],
  	"valueAxes": [
  		{
  			"id": "ValueAxis-1",
  			"position": "top",
  			"axisAlpha": 0,
        "integersOnly":true,
        "maximum":maximum

  		} //"title":title,
  	],
    "creditsPosition":"bottom-left",

  	"dataProvider": dataProvider,
      "export": {
      	"enabled": true
       }

  });
}



//
//
// data1:computed(function(){
//   var college = this.get('college');
//   var department = this.get('department'); // Only one of both should be specified, that's how we will identify the query
//   var store = this.store;
//
//  var funCount = 0;
//  var internalCount = 0;
//  var externalCount = 0;
//  var training = {};
//
//  var dqoc = 0;
//  var qotc = 0;
//  var iyoc = 0;
//
//  var reviewQuery;// = undefined;
//  var trainingQuery;// = undefined;
//
//  var depts = store.findAll('department')
//
//  if(college){
//    reviewQuery = store.query('review',{'faculty.department.college':college});
//    trainingQuery = store.query('training',{'faculty.department.college':college});
//   //  getFacultyFromCollege(college)
//
//  }
//  else if(department){
//    reviewQuery = store.query('review',{'faculty.department':department});
//    trainingQuery = store.query('training',{'faculty.department':department});
//  }
//
//
//  var d =  reviewQuery.then(function(reviews){
//
//
//     reviews.forEach(function(review){
//
//         var r = review.getProperties('courseName','internalDate','externalDate','funDate')
//         // console.log("Review "+r.courseName);
//         if(r.internalDate){
//             internalCount++;
//         }
//         if(r.externalDate){
//             externalCount++;
//         }
//         if(r.funDate){
//             funCount++;
//         }
//
//
//     })
//
//
//     trainingQuery.then(function(trainings){
//
//       trainings.forEach(function(training){
//
//           var t = training.getProperties('type');
//           // console.log("Training " + t.type);
//           if(t.type){
//             var count = training[t.type] + 1 ;
//             training[t.type] = count;
//
//             if(t.type == 'ATC Teaching Course (TQOC)'){
//               qotc = qotc + 1;
//             }
//             else if(t.type == 'ATC Design Course (DQOC)' ){
//               dqoc = dqoc + 1;
//             }
//             else if(t.type == 'Improving Your Online Course (IYOC)'){
//               iyoc = iyoc + 1
//             }
//           }
//           // console.log(qotc);
//           // console.log(dqoc);
//           // console.log(iyoc);
//         }
//       );
//
//     }).then(function(){
//       console.log("end of trainings");
//       return   [{
//           "label": "DQOC",
//           "value": dqoc,
//           "color": "#6dcb8e"
//         },
//         {
//           "label": "QOTC",
//           "value":qotc,
//           "color": "#6dbb8c"
//         },
//         {
//           "label": "IYOC",
//           "value": iyoc,
//           "color": "#d2ca49"
//         },
//         {
//           "label": "QM FUN",
//           "value": funCount,
//           "color": "#088274"
//         },
//         {
//           "label": "QM CERT",
//           "value": externalCount,
//           "color": "#448ec6"
//         }
//       ];
//
//     });
//
//  })
//
//    return d;
// }),
