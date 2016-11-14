/**Mothn Data Structure*/
var Month = function(){
	  	this.month = 0;
		this.year = 0;
		this.date = Date();
	    this.count;
}

/**Mothn Data Structure*/
var Department = function(){
	  	this.name = 0;
		this.reviewsCount = 0;
}
 
   
/**Checking if the date belongs*/
function dateBelongs(element, date){

	
	if (typeof element != "undefined" && typeof date != "undefined") {
	
	
	if (element.date.getMonth() != date.getMonth()){
		return false;
	}
	
	if (element.date.getYear() != date.getYear()){
		return  false
	}
	
	return true
	}

	return false	
}
/**Extracts month from date*/
function getMonthFromDate(date){
	var locale = "en-us";
    var m = date.toLocaleString(locale, { month: "long" });
	return m;
}

/**Used to sort dates*/
function compareMonths(a, b){
	return a.date.getTime() - b.date.getTime()
}



/**Returns data from the sample set*/
function getDataWithSampleSet(result, sampleSet){
	
	var date_format =  d3.time.format("%m/%d/%Y");
	var months = []
	sampleSet.forEach(function(d){
	 	d.date = date_format.parse(d.date);  
	})
	
	sampleSet.forEach(function(d){
	
	//check if object with given date exists. If yes ignore		
	var dates =	months.filter(function(element){
				return dateBelongs(element, d.date);	
			}
		)
		if (dates.length == 0 ){
			//get all dates from given month
			var newDates = sampleSet.filter(function(element){
				return dateBelongs(element, d.date);
			})
			
			var month = new Month();
			month.date = d.date;
			month.count = newDates.length;
			month.month = getMonthFromDate(d.date);
			months.push(month);
		}
		
				
	   });
	   //sort by months   
		months.sort(compareMonths)
	   // console.log(months);
	   result(months);
}



/**Call this function to render a graph*/
function renderGraphWithSet(sampleSet, headerLabel){


getDataWithSampleSet(function(results){
	drawGraph(results, "QM", headerLabel);
	//console.log(results);
}, sampleSet);
}

function myMin(data){
 var sortedData = data.sort(compareMonths)
	if(data.length > 0){
		return sortedData[0];	
	}

}

function myMax(data){
 var sortedData = data.sort(compareMonths)
	if(data.length > 0){
		return sortedData[data.length - 1];	
	}

}



/**Draws time based graph*/
function drawGraph(data, id, label){
	if (data.length == 0) {
		return;	
	}
	var id = typeof id !== 'undefined' ?  id : Date.now();
	 
	var margin = {top: 40, right: 20, bottom: 50, left: 40},
    width = getWidth(40,20),
    height = 500 - margin.top - margin.bottom;

	
	
var svg = d3.select("body").append("svg")
    .attr("id", "graph"+id)
	
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.attr("left",240)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	var text = svg.append("text");
	
	text
                 .attr("x", 10)
                 .attr("y", -10)
                 .text(label)
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "16px")
                 .attr("fill", "steelblue");				   
					   


  var yScale = d3.scale.linear()
  	.domain([0, d3.max(data, function(d) { return d.count; })]).range([height  , 0])

  var yAxis = d3.svg.axis()
			.orient("left")
			.scale(yScale)
			.tickPadding(8)
			.tickFormat(d3.format("d"));
			

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count");

	
	
	 var sortedData = data.sort(compareMonths)
	 sortedData.map(function(d){
		   console.log(d.date)
		    var newDate = d.date
			
			return newDate.setDate(1); 
			 }
		)
	 
	 var minDate = myMin(data).date
	 minDate.setMonth(minDate.getMonth() - 1)
	 
	 var maxDate = new Date()
	 
	 var monthD = monthDiff(minDate, maxDate) + 1 ;
	 
	 var x_domain = d3.extent(data, function(d) { return d.date; })
	 x_domain = [minDate, maxDate]
	
	 var xScale = d3.time.scale().domain(x_domain).range([0, width - margin.right]); 

	
  // display date format
        var  date_format = d3.time.format("%b %Y");

  // define the x axis
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale)
			.ticks(d3.time.month, 1)
            .tickFormat(date_format)
			

//call tip
var tip =  d3.tip().attr('class', 'd3-tip').html(function(d) { return d.count; });
svg.call(tip);

  svg.append("g")
            .attr("class", "xaxis axis")  // two classes, one for css formatting, one for selection below
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
			.selectAll('text')
		    .attr("transform", "rotate(45)")
		    .attr("y", 0)
		    .attr("x", 9) 
      	    .attr("dy", ".35em")
 			.style("text-anchor", "start");
  
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return  xScale(d.date) ; }) //- getWidth(width,margin,data )/2.0  attr("width", getWidth(width,margin,data )) 
	  .attr("width", width/monthD)  
	  .attr("height", 0)
	  .attr("y",height)
      .on('mouseover', tip.show)
	  .on('mouseout', tip.hide)
	  .transition().duration(1000)
      .attr("y", function(d) { return yScale(d.count); })
	  .attr("height", function(d) { return height - yScale(d.count); })
	  
}

/**Returns width of the single bar*/
function getWidth(width, margin, data){
	return  Math.min(100, 1 *(width - margin.left - margin.right) / (getRangeOfMonths(data)+1));
}

/**Returns range of the month based on sorted dates*/
function getRangeOfMonths(data){
		var d1 = data[0].date;
		var d2 = data[data.length -1].date;
		return monthDiff(d1,d2)	
	}
	
/*Get range of months*/	
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function resize(xScale, yScale){
	var width = parseInt(d3.select("#graph").style("width")) - margin*2,
    height = parseInt(d3.select("#graph").style("height")) - margin*2;

    /* Update the range of the scale with new width/height */
    xScale.range([0, width]).nice(d3.time.year);
    yScale.range([height, 0]).nice();

    /* Update the axis with the new scale */
    graph.select('.x.axis')
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    graph.select('.y.axis')
      .call(yAxis);

    /* Force D3 to recalculate and update the line */
    graph.selectAll('.line')
      .attr("d", line);	
}


/*Width*/
function getWidth(marginLeft, marginRight){
	var width = (0.9*(100 - 16.66666667)/100) * window.innerWidth - marginLeft - marginRight;
	return width;
}

/**Draws the basic bar chart - used fo drawing the deparmtents*/
function drawBarChart(data,id){
	var margin = {top: 20, right: 20, bottom: 150, left: 40},
    width = getWidth(40,20),
    height = 440 - margin.top - margin.bottom;


var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
   

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(1)
	.tickFormat(d3.format("d"));

var svg = d3.select("body").append("svg")
	 .attr("id", "graph"+id)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.count; })]);

	//call tip
	var tip =  d3.tip().attr('class', 'd3-tip').html(function(d) { return d.count; });
	svg.call(tip);

  		svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll('text')
	  .attr("transform", "rotate(45)")
	  .style("text-anchor", "start")


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  svg.selectAll("bar")
	  
      .data(data)
      .enter().append("rect")
	  .attr("class", "bar")
      //.style("fill", "steelblue")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); })
	   .on('mouseover', tip.show)
	  .on('mouseout', tip.hide)
	  .transition().duration(1000);


}
