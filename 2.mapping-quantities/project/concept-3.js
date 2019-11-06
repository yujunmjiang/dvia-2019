var totals
var electricPower

function preload(){
  totals = loadJSON('data/totals-us.json')
  electricPower = loadJSON('data/nuclear-electric-power.json')
  electricityShare = loadJSON('data/nuclear-share-of-electricity-net-generation.json')
}

function setup(){
  createCanvas(3200, 300)
  background(0)

  // pick one of the three data files to work with and call it 'data'
  var data = totals

  // set up typography
  textFont("Courier New")
  textSize(12)
  fill(230)
  noStroke()

  var x = 200
  var y = 100
  var rowHeight = 60
  var colWidth = 40

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
    fill(230)
    text(year, x, y-rowHeight)

    // step through all the countries' totals for the year, row by row
    for (var country in data.tests){
      // draw the * total tests * as an upper semicircle using the palette to set the color by value
      var value = totals.tests[country][i]
      var radius = Math.sqrt(60 * value)
      fill(0, 255, 0, 75)
      // arc(x, y, radius, radius, -PI, 0)
      ellipse(x, y, radius)

      fill(0)
      // arc(x, y, radius, radius, -PI, 0)
      ellipse(x, y, radius/2)

      // draw the * nuclear electric power * as a lower semicircle using its *negative* value to pick the color
      value = electricPower.tests[country][i]
      radius = Math.sqrt(60 * value)
      fill(255, 0, 0, 75)
      // ellipse(x, y*2, radius)
      ellipse(x, y*1.5, radius)

      fill(0)
      // arc(x, y, radius, radius, -PI, 0)
      ellipse(x, y*1.5, radius/2)

      // draw the * nuclear share electricity percent * as a lower semicircle using its *negative* value to pick the color
      value = electricityShare.tests[country][i]
      radius = Math.sqrt(60 * value)
      fill(255, 255, 0, 75)
      // arc(x, y, radius, radius, 0, PI)
      ellipse(x, y*2, radius)

      fill(0)
      // arc(x, y, radius, radius, -PI, 0)
      ellipse(x, y*2, radius/2)

      // shift downward before drawing the next country
      y += rowHeight
    }

    // shift leftward before drawing the next year
    x += colWidth
  }

}
