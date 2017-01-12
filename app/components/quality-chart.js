import Ember from 'ember';
// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output
//http://stackoverflow.com/questions/35679479/how-to-extract-a-computedproperty-to-its-real-valueloc
const { isEmpty, computed,get,getProperties } = Ember;

export default Ember.Component.extend({
  constants : Ember.inject.service('constants'),
  helper: Ember.inject.service('quality-data'),
  college : null,


data:computed(function(){
  var college = this.get('college');
  var department = this.get('department'); // Only one of both should be specified, that's how we will identify the query
  var store = this.store;
  var facultyQuery = undefined;

  var helper = this.get('helper')

  if(college){
    var cid = college.getProperties("id").id
    facultyQuery = helper.getFacultyFromCollege(cid,store).then(function(fac){
      return helper.getDataFromFaculty(fac)
    })
  }
  else if(department){
    facultyQuery = helper.getFacultyFromDepartment(department,store).then(function(fac){
          return helper.getDataFromFaculty(fac)
    })
  }
  var getData = function() {
    var promise =   new Ember.RSVP.Promise(function(resolve, reject){
           facultyQuery.then(function(data){
            //  console.log("Data Resolved");
            //  console.log(data);
           resolve(data);
         });
      });
      return promise;
  }

  var promises = {
    data:getData(),

  };


  var endPromise =   new Ember.RSVP.Promise(function(resolve, reject){
      getData().then(function(results) {
          var array =  [{
              "label": "DQOC",
              "value": results.dqoc,
              "color": "#6dcb8e"
            },
            {
              "label": "QOTC",
              "value":results.qotc,
              "color": "#6dbb8c"
            },
            {
              "label": "IYOC",
              "value": results.iyoc,
              "color": "#d2ca49"
            },
            {
              "label": "QM FUN",
              "value": results.funCount,
              "color": "#088274"
            },
            {
              "label": "QM CERT",
              "value": results.externalCount,
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
    // console.log("_____");
    // console.log(name);
     var divName =  "chartdiv"+name;
     var data = this.get('data');


     data.then(function(d){

      //  console.log("Inside the then "+ divName);
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
