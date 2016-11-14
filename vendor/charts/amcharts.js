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
