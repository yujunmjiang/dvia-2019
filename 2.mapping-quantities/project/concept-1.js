var atmospheric
var electricPower

function preload(){
  atmospheric = loadJSON('data/atmospheric-us.json')
  electricPower = loadJSON('data/nuclear-electric-power.json')
}

function setup(){
  createCanvas(3200, 300)
  background(0)

  // pick one of the three data files to work with and call it 'data'
  var data = atmospheric

  // create a divergent palette where we'll use negative values for nuclear electric power
  // and positive values for atmospheric (the -50 .. 50 range came from eyeballing the data)
  var palette = Brewer.divergent('RdBu', Infinity, -50, 0, 50)

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
      // draw the * atmospheric tests * as an upper rectangle using the palette to set the color by value
      var value = atmospheric.tests[country][i]
      var radius = Math.sqrt(60 * value)
      var color = palette.colorForValue(value)
      fill(color)
      // ellipse(x, y, radius)
      rect(x, y*1.5, 10, -radius)

      // draw the * nuclear electric power * as a lower rectangle using its *negative* value to pick the color
      value = electricPower.tests[country][i]
      radius = Math.sqrt(60 * value)
      color = palette.colorForValue(-value)
      fill(color)
      // ellipse(x, y*2, radius)
      rect(x, y*1.5, 10, radius)

      //
      fill(230)
      rect(x, y*1.5, 1000, 1)

      // shift downward before drawing the next country
      y += rowHeight
    }

    // shift leftward before drawing the next year
    x += colWidth
  }

}
