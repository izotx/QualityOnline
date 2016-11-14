var colorList = {t1: 'red', t2: 'green', t3: 'blue'};

var trainingData = [
  {
    "label": "ATC Design Course (DQOC)",
    "color": "#6dcb8e"
  },
  {
    "label": "ATC Teaching Course (TQOC)",
    "color": "#6dbb8c"
  },
  {
    "label": "Improving Your Online Course (IYOC)",
    "color": "#d2ca49"
  },
  {
    "label": "QM Fundamentals Review (QM FUN)",

    "color": "#088274"
  },
  {
    "label": "QM Course Certification (QM CERT)",
    "color": "#448ec6"
  },

]

colorize = function(colorList, id ) {
  var container = document.getElementById(id);
  var legendContainer = document.createElement("DIV");
  legendContainer.className = "row";
  for (var i = 0, len = trainingData.length; i < len; i++) {
        var dict = trainingData[i];
        var boxContainer = document.createElement("DIV");
        var box = document.createElement("DIV");
        var label = document.createElement("SPAN");
        label.className = "boxSpan";
        console.log(dict);

        label.innerHTML = dict["label"];
        box.className = "box";
        box.style.backgroundColor = dict["color"];
        boxContainer.className = "boxContainer";
        boxContainer.appendChild(box);
        boxContainer.appendChild(label);
        legendContainer.appendChild(boxContainer);
   }
        container.insertBefore(legendContainer, container.children[1]);
}
