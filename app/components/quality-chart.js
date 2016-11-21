import Ember from 'ember';
// http://emberjs.jsbin.com/kexamedo/3/edit?html,css,js,output
//http://stackoverflow.com/questions/35679479/how-to-extract-a-computedproperty-to-its-real-valueloc
const { isEmpty, computed,get,getProperties } = Ember;

export default Ember.Component.extend({
  constants : Ember.inject.service('constants'),
  chartData: function(){
     return generateChartData();
   }.property(),
   //
  //  departments:computed(function(){
  //   //  console.log("departments");
  //    return this.store.findAll('department');
  //  }),

//college:null,

data:function(){
  var college = this.get('college');
  var store = this.store;

 var funCount = 0;
 var internalCount = 0;
 var externalCount = 0;
 var training = {};

 var dqoc = 0;
 var qotc = 0;
 var iyoc = 0;


 var data = store.query('review',{'faculty.department.college':college}).then(function(reviews){

    reviews.forEach(function(review){

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
   store.query('training',{'faculty.department.college':college}).then(function(trainings){
     trainings.forEach(function(training){
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
  return
}).then(function(){
  console.log("End of Query");

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

  return data;
}.property(),

 didRender() {
    this._super(...arguments);
    var ccolege =  this.get('college').getProperties('name');
//    var chartData = this.get('chartData');
    var data = this.get('data');
    data.then(function(d){
      console.log("Inside");
      var divName =  "chartdiv"+ccolege.name;
      drawHorizontalLinearChart(divName,"Quality",d,false,4)
      console.log(JSON.stringify(d));

    })

    // console.log(data);


    //
    // this.set('chartData', chartData);
    //
  //  console.log(chartData);


    // var chart = AmCharts.makeChart(divName, {
    //   "type": "serial",
    //   "dataProvider": chartData,
    //   "categoryField": "country",
    //   "graphs": [ {
    //     "valueField": "visits",
    //     "type": "column"
    //   }]
    // },5000 );

    // chart.addListener("init", ainit);
    // chart.addListener("rendered", arendered);
    // console.log("Chart");
    // console.log(chart);
    //
    //  chart.addListener("rendered", this.ainit.bind(this));
    //  chart.addListener("init", this.arendered.bind(this));

 },
 ainit:function (){
   console.log("init");
 },

 arendered:function(){
 console.log("rendered");
 },


  init()
  {
    this._super(...arguments);
    // this.get('data')

  },
  didInsertElement() {
    this._super(...arguments);
    // getData(this.store);
    var store = this.store
  },
});


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

  //this.set('chart', chart);
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
