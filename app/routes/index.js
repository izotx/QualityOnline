import Ember from 'ember';

export default Ember.Route.extend({

  model(){
  // let d1= getData(this);

  var data = new Array()
  var self = this;
  var d = this.store.findAll('college').then(function(colleges){
        colleges.forEach(function(college){
        let d = getData(self, college);
        data.push({"college":college, "data":d});

      })
      return {"data":data};
    });

    return d;
  }


});


function getData(self, college){
  console.log("Inside Get Data");
  // var college = this.get('college');
  var department = self.get('department'); // Only one of both should be specified, that's how we will identify the query
  var store = self.store;

 var funCount = 0;
 var internalCount = 0;
 var externalCount = 0;
 var training = {};

 var dqoc = 0;
 var qotc = 0;
 var iyoc = 0;

 var reviewQuery;// = undefined;
 var trainingQuery;// = undefined;

 var depts = store.findAll('department')

 if(college){
   reviewQuery = store.query('review',{'faculty.department.college':college});
   trainingQuery = store.query('training',{'faculty.department.college':college});
 }
 else if(department){
   reviewQuery = store.query('review',{'faculty.department':department});
   trainingQuery = store.query('training',{'faculty.department':department});
 }


 var d =  reviewQuery.then(function(reviews){

    reviews.forEach(function(review){
        console.log("Review");
        var r = review.getProperties('courseName','internalDate','externalDate','funDate')
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

 }).then(function(){
   trainingQuery.then(function(trainings){

     trainings.forEach(function(training){
       console.log("Training");
         var t = training.getProperties('type');
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

   });
  //return
}).then(function(){
   console.log("End of Query" + qotc);

  return   [{
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
})

   return d;
}
