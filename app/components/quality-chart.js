import Ember from 'ember';
// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output
//http://stackoverflow.com/questions/35679479/how-to-extract-a-computedproperty-to-its-real-valueloc
const { isEmpty, computed,get,getProperties } = Ember;

export default Ember.Component.extend({
  constants : Ember.inject.service('constants'),
  college : null,


// data:function(){
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
//  }
//  else if(department){
//    reviewQuery = store.query('review',{'faculty.department':department});
//    trainingQuery = store.query('training',{'faculty.department':department});
//  }
//
//
//  var d =  reviewQuery.then(function(reviews){
//
//     reviews.forEach(function(review){
//         console.log("Review");
//         var r = review.getProperties('courseName','internalDate','externalDate','funDate')
//         if(r.internalDate){
//             internalCount++;
//         }
//         if(r.externalDate){
//             externalCount++;
//         }
//         if(r.funDate){
//             funCount++;
//         }
//     })
//
//  }).then(function(){
//    trainingQuery.then(function(trainings){
//
//      trainings.forEach(function(training){
//        console.log("Training");
//          var t = training.getProperties('type');
//          if(t.type){
//            var count = training[t.type] + 1 ;
//            training[t.type] = count;
//
//            if(t.type == 'ATC Teaching Course (TQOC)'){
//              qotc = qotc + 1;
//            }
//            else if(t.type == 'ATC Design Course (DQOC)' ){
//              dqoc = dqoc + 1;
//            }
//            else if(t.type == 'Improving Your Online Course (IYOC)'){
//              iyoc = iyoc + 1
//            }
//          }
//        }
//      );
//
//    });
//   //return
// }).then(function(){
//    console.log("End of Query" + qotc);
//
//   return   [{
//       "label": "DQOC",
//       "value": dqoc,
//       "color": "#6dcb8e"
//     },
//     {
//       "label": "QOTC",
//       "value":qotc,
//       "color": "#6dbb8c"
//     },
//     {
//       "label": "IYOC",
//       "value": iyoc,
//       "color": "#d2ca49"
//     },
//     {
//       "label": "QM FUN",
//       "value": funCount,
//       "color": "#088274"
//     },
//     {
//       "label": "QM CERT",
//       "value": externalCount,
//       "color": "#448ec6"
//     }
//   ];
// })
//
//    return d;
// }.property(),

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
    var store = this.store
    var name = "";
    var college = this.get('college');
    var department = this.get('department');

    if(college){
        name = college.getProperties('name').name;
    }

    if(department){
        name = department.getProperties('name').name;
    }


    var data = this.get('data');
    data.then(function(d){
      var divName =  "chartdiv"+name;
      drawHorizontalLinearChart(divName,"Quality",d,false,4)
    })
  },
});


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
