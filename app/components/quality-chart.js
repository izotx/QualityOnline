import Ember from 'ember';
// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output
//http://stackoverflow.com/questions/35679479/how-to-extract-a-computedproperty-to-its-real-valueloc
const { isEmpty, computed,get,getProperties } = Ember;

export default Ember.Component.extend({
  chartData: function(){
     return generateChartData();
   }.property(),
   //
  //  departments:computed(function(){
  //   //  console.log("departments");
  //    return this.store.findAll('department');
  //  }),

//college:null,

data:Ember.computed(function(){
  var college = this.get('college');
  var store = this.store;

//  if(college)

  console.log("____");
  console.log(college);

/**
 {faculty.department.college : college}
*/
//var cfaculty = [];
//var departments = college.get('departments');
//console.log(departments.count);



 // college.departments.forEach(function(department){
 //    cfaculty.push(department.faculty);
 // });

 var instructors = []
 var departmentsPromise = this.store.query('Department',{college:college}).then(function(departments){
   departments.forEach(function(dept){
      var instr = dept.getProperties('faculty','name')
      instructors.push(instr)
      console.log("DEPARTMETN");
   })
   instructors.forEach(function(i){
     console.log("_______");
     console.log(i.name);
     console.log("_______");
   });
//   console.log(instructors);

 });

 // var departmentsPromise = this.store.query('Department',{college:college}).then(function(departments){
 //  var instructors = []
 //   departments.forEach(function(dept){
 //      var instr = dept.getProperties('instructors')
 //      instructors.push(instr)
 //   }).then(function(instructors)){
 //     instructors.foreach(function(instructor){
 //       var revs = instructor.getProperties('reviews')
 //       revs.forEach(function(review){
 //         var r = review.getProperties('internalDate','externalDate','funDate')
 //         console.log(r);
 //
 //         if(r.internalDate){
 //             internalCount++;
 //         }
 //         if(r.externalDate){
 //             externalCount++;
 //         }
 //         if(r.funDate){
 //             funCount++;
 //         }
 //         console.log(r.internalDate);
 //
 //       });
 //     })
 //   }
 //


 var rquery = store.findAll('review')

  var data = rquery.then(function(reviews){
      // console.log("reviews");
      // console.log(reviews);
      // reviews.forEach(function(review){
      //
      // });
      // review.filtered.
      // var filtered = review.forEach(function(r)){
      //
      //
      // }


      return reviews
  }).then(function(reviews){
      var funCount = 0
      var internalCount = 0
      var externalCount = 0
      //{faculty.department.college:college}
      store.find('training',1).then(function(trainings){
      // console.log(trainings);


      reviews.forEach(function(review){
        var r = review.getProperties('internalDate','externalDate','funDate')
        console.log(r);

        if(r.internalDate){
            internalCount++;
        }
        if(r.externalDate){
            externalCount++;
        }
        if(r.funDate){
            funCount++;
        }
        console.log(r.internalDate);

      });

      console.log(internalCount);
      console.log(externalCount);
      console.log(funCount);

      // console.log(reviews);
      trainings.forEach(function(training){
      var t = training.getProperties()


          return trainings

      });
    })
  });

  return data;
}),

 didRender() {
    this._super(...arguments);
    var chartData = this.get('chartData');
    drawHorizontalLinearChart("chartdiv","Quality",chartData,false,100)



    //
    // this.set('chartData', chartData);
    //
    // var chart = AmCharts.makeChart( "chartdiv", {
    //   "type": "serial",
    //   "dataProvider": chartData,
    //   "categoryField": "country",
    //   "graphs": [ {
    //     "valueField": "visits",
    //     "type": "column"
    //   }]
    // },5000 );
    //
    // // chart.addListener("init", ainit);
    // // chart.addListener("rendered", arendered);
    // // console.log("Chart");
    // // console.log(chart);
    // this.set('chart', chart);
    //
    // chart.addListener("rendered", this.ainit.bind(this));
    // chart.addListener("init", this.arendered.bind(this));

 },
 ainit:function (){
   console.log("init");
 },

 arendered:function(){
 console.log("rendered");
 },
 data1:function(){
   var store = this.store
   return new Promise(function(resolve,reject){
     store.findAll('department').then(function(deparments){
       resolve(deparments);
     })});
 },

  init()
  {
    this._super(...arguments);
    this.get('data')
//  var store = this.store
  // this.get('data1').then(function(deparments){
  //
  //
  // })

  // var promise = new Promise(function(resolve,reject){
  //   store.findAll('department').then(function(deparments){
  //     resolve(deparments);
  //   })});

  //  promise()

    //console.log();

    // console.log(this.store);

    //
    // this.get("departments").forEach(function(college){
    //     console.log(college);
    // });



  },
  didInsertElement() {
    this._super(...arguments);
    // getData(this.store);
    var store = this.store
    // var reviews = store.findAll('review').then(function(reviews){
    //     console.log("reviews");
    //     // console.log(reviews);
    //     reviews.forEach(function(review){
    //         console.log(review.courseName);
    //
    //     });
    //
    // }).then(function(){
    //     store.findAll('training').then(function(trainings){
    //     console.log("training");
    //     // console.log(trainings);
    //     trainings.forEach(function(training){
    //         console.log(training.type);
    //
    //     });
    //
    //   })
    // });

    // var deparments = this.store.findAll('department').then(function(departments){
    //   departments.forEach(function(department){
    //     console.log(college);
    //     //calculate number of reviews
    //     // department.
    //
    //
    //   })
    //
    // });



    // var colleges = this.store.findAll('college');
    // // //let's say we have a college
    // // college.departments
    // colleges.forEach(function(college){
    //   console.log(college);
    //
    // })
  },
});

function getData(store){

  console.log("Get Data");
    //get all colleges
    var colleges = store.findAll('college');
    // //let's say we have a college
    // college.departments
    colleges.forEach(function(college){
      console.log(college);

    })

}


function drawHorizontalLinearChart(div,title,dataProvider,rotate,maximum){
//console.console.log();
  //console.log(div);

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
  //chart.fontSize = 5;



}

function generateChartData() {
    // var chartData = [];
    var chartData = [ {
       "country": "USA",
       "visits": 4252
     }, {
       "country": "China",
       "visits": 1882
     }, {
       "country": "Japan",
       "visits": 1809
     }, {
       "country": "Germany",
       "visits": 1322
     }, {
       "country": "UK",
       "visits": 1122
     }, {
       "country": "France",
       "visits": 1114
     }, {
       "country": "India",
       "visits": 984
     }, {
       "country": "Spain",
       "visits": 711
     }, {
       "country": "Netherlands",
       "visits": 665
     }, {
       "country": "Russia",
       "visits": 580
     }, {
       "country": "South Korea",
       "visits": 443
     }, {
       "country": "Canada",
       "visits": 441
     }, {
       "country": "Brazil",
       "visits": 395
     }, {
       "country": "Italy",
       "visits": 386
     }, {
       "country": "Australia",
       "visits": 384
     }, {
       "country": "Taiwan",
       "visits": 338
     }, {
       "country": "Poland",
       "visits": 328
   } ];
    return chartData;
}
