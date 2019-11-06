var totals
var electricityShare

function preload(){
  totals = loadJSON('data/totals.json')
  electricity = loadJSON('data/electricity.json')
}

function setup(){
  createCanvas(3900, 900)
  background(255)
  angleMode(DEGREES)

  // pick one of the three data files to work with and call it 'data'
  var data = totals

  // set up typography
  textFont("Courier New")
  textSize(12)
  fill(0)
  noStroke()

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 50

  // draw country name labels on the left edge of the table
  // textStyle()
  textAlign(RIGHT)
  for (var country in data.tests){
    text(country, x-colWidth, y*1.5)
    y += rowHeight
  }

  // draw each year's totals, one column at a time
  textStyle(NORMAL)
  textAlign(CENTER)
  for (var i=0; i<data.years.length; i++){
    y = 100

    // draw the year label in the header row
    var year = data.years[i]
    fill(0)
    text(year, x, y-rowHeight)

    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){
      // draw the * total tests * as a blue circle
      var value = totals.tests[country][i]
      var radius = Math.sqrt(30 * value)
      fill(0, 0, 255, 50)
      // arc(x, y, radius, radius, -PI, 0)
      ellipse(x, y*1.5, radius)

      // draw the percent of * nuclear electricity production * as a red arc
      value = electricity.tests[country][i]
      // radius = 360 * value
      if(value > 0){
      	fill(255, 0, 0, 50)
      	// arc(x, y, radius, radius, 0, PI)
      	let end = map (value, 0, 100, 0, 360)
      	arc(x, y*1.5, 30, 30, 0, end)
      }

      // shift downward before drawing the next country
      y += rowHeight
    }

    // shift leftward before drawing the next year
    x += colWidth
  }

}

save('totals-electricity.svg')
