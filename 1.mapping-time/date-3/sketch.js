var x = 20
var y = 20
var barWidth = 100
var barHeight = 85

var discrete = false // flag whether to have the bars 'tick' from one value to the next or move smoothly,
                    // try setting it to false and see what happens...

function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400)
}

function draw() {
  // draw time use clock() function
  background(255)
  noStroke()

  // measure the current time & calculate the width in pixwls of each bar
  var now = clock ()
  if (discrete) {
    // the map() function lets us *normalize* a value from a starting range then *project* it into another range
    var weekdayHeight = map(now.weekday, 1, 7, 0, barHeight)  // from weekday (1-7) to pixels (0–barHeight)
    var moonPercent = map(now.moon, 0, 1, 0, PI)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    weekdayHeight = barHeight * now.progress.week
    moonPercent = PI * now.progress.moon
  }


    // use triangle (and upsidown triangle) to represent seasons
  if (now.season == 1){
      fill(57, 181, 74)
      triangle(80, 225, 130, 140, 180, 225)
  }

  if (now.season == 2){
      fill(251, 174, 255)
      triangle(80, 225, 130, 140, 180, 225)
  }

  if (now.season == 3){
      fill(241, 90, 36)
      triangle(220, 140, 270, 225, 320, 140)
  }

  if (now.season == 4){
      fill(153, 153, 153)
      triangle(220, 140, 270, 225, 320, 140)
  }

    // use arc to represent moon
  if (now.moon){
      fill(251, 190, 23)
      arc(200, 190, 40, 40, 0, PI + moonPercent)
  }

    // use rectangle (cover triangle) to represent time
  translate(0, - (weekdayHeight + 85))

  if (now.season == 1, 2){
      fill(255, 255, 255)
      rect(80, 225, 100, 85)
  }

  if (now.season == 3, 4){
      fill(255, 255, 255)
      rect(220, 225, 100, 85)
  }
}