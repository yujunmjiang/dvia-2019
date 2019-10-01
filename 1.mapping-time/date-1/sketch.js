// function setup() {
//   // set the width & height of the sketch
//   createCanvas(400, 130)

//   // print the time to the console once at the beginning of the run. try opening up the
//   // web inspector and poking around to see the various values the clock function gives you
//   print('starting time:', clock())

// }

// function draw() {
//   // check the clock for the current time and unpack some of its fields to generate a time-string
//   var now = clock()

//   // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
//   // note that setting the background also clears the canvas from our previous round of drawing
//   background('white')

//   // set up typography & drawing-color
//   textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
//   textSize(42) // make it big
//   fill(100, 50, 50)

//   // draw the time string to the canvas
//   text(now.text.date, 30, 50)
//   text(now.text.time, 30, 100)

// }



var x = 20  // starting x position to draw
var y = 20  // starting y position to draw
var bigBarHeight = 265// height of big bar
var smallBarHeight = 75 // height of small bar
var bigBarWidth =265 // maximum width of big bar (the actual width will always be ≤ this)
var smallBarWidth = 75 // maximum width of small bar (the actual width will always be ≤ this)
var spacing = 20 // the horizontal and vertical space to skip between bars

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
    var monthHeight = map(now.month, 1, 12, 0, bigBarHeight)  // from months (1-12) to pixels (0–bigBarHeight)
    var hoursHeight = map(now.hours, 0, 23, 0, smallBarHeight)  // from hours (0-23) to pixels (0–smallBarHeight)
  }else{
    // alternatively, we can use the clock's 'progress' percentages
    monthHeight = bigBarHeight * now.progress.year
    hoursHeight = smallBarHeight * now.progress.day
  }
    // Seasons bar
if (now.season == 1){
    fill(57, 181, 74)
    rect(x, y, bigBarWidth, monthHeight)
}



if (now.season == 2){
    fill(251, 174, 255)
    rect(x, y, bigBarWidth, monthHeight)
} 



if (now.season == 3){
    fill(241, 90, 36)
    rect(x, y, bigBarWidth, monthHeight)
} 



if (now.season == 4){
    fill(153, 153, 153)
    rect(x, y, bigBarWidth, monthHeight)
} 

    // Monday bar
    // fill(0, 0, 0)
    // rect(x + bigBarWidth + spacing, y, smallBarWidth, hoursHeight)
if (now.weekday == 1){

if (now.am){
    fill(110, 203, 255)
    rect(x + bigBarWidth + spacing, y, smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + bigBarWidth + spacing, y, smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + bigBarWidth + spacing, y, smallBarWidth, hoursHeight)
}

    // Tuesday bar
    // fill(0, 0, 0)
    // rect(x + bigBarWidth + spacing, y + smallBarHeight + spacing, smallBarWidth, hoursHeight)
if (now.weekday == 2){

if (now.am){
    fill(110, 203, 255)
    rect(x + bigBarWidth + spacing, y + smallBarHeight + spacing, smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + bigBarWidth + spacing, y + smallBarHeight + spacing, smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + bigBarWidth + spacing, y + smallBarHeight + spacing, smallBarWidth, hoursHeight)
}



    // Wednesday bar
    // fill(0, 0, 0)
    // rect(x + bigBarWidth + spacing, y + 2 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
if (now.weekday == 3){

if (now.am){
    fill(110, 203, 255)
    rect(x + bigBarWidth + spacing, y + 2 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + bigBarWidth + spacing, y + 2 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + bigBarWidth + spacing, y + 2 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}



    // Thursday bar
    // fill(0, 0, 0)
    // rect(x + bigBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
if (now.weekday == 4){

if (now.am){
    fill(110, 203, 255)
    rect(x + bigBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + bigBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + bigBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}



    // Friday
    // fill(0, 0, 0)
    // rect(x + 2 * (smallBarWidth + spacing), y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
if (now.weekday == 5){

if (now.am){
    fill(110, 203, 255)
    rect(x + 2 * (smallBarWidth + spacing), y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + 2 * (smallBarWidth + spacing), y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + 2 * (smallBarWidth + spacing), y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}



    // Saturday
    // fill(0, 0, 0)
    // rect(x + smallBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
if (now.weekday == 6){

if (now.am){
    fill(110, 203, 255)
    rect(x + smallBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x + smallBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}

}else{
    fill(255)
    rect(x + smallBarWidth + spacing, y + 3 * (smallBarHeight + spacing), smallBarWidth, hoursHeight)
}



    // Sunday
    // fill(0, 0, 0)
    // rect(x, y + 3 * (smallBarHeight + spacing), smallBarHeight, hoursHeight)
if (now.weekday == 7){

if (now.am){
    fill(110, 203, 255)
    rect(x, y + 3 * (smallBarHeight + spacing), smallBarHeight, hoursHeight)
}else{
    fill(0, 67, 76)
    rect(x, y + 3 * (smallBarHeight + spacing), smallBarHeight, hoursHeight)
}

}else{
    fill(255)
    rect(x, y + 3 * (smallBarHeight + spacing), smallBarHeight, hoursHeight)
}
}