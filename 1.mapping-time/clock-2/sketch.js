// // Constants
// var barHeight = 150 // height of each bar
// var maxWidth = 600 // maximum width of each bar (the actual width will always be ≤ this)
// var spacing = 10

// var X_AXIS = 2;
// var c1, c2;

// var discrete = false // flag whether to have the bars 'tick' from one value to the next or move smoothly,
//                     // try setting it to false and see what happens...

// //this gets called only once in the very beginning
// function setup() {
//   createCanvas(400, 400)

//   // Define colors
//   c1 = color(255)
//   c2 = color(0)

// }

// function draw() {
//   background(255)
//   setGradient(width / 4, height / 4, 600, 60, c2, c1, X_AXIS)
// }

// function setGradient(x, y, hourWidth, barHeight, c1, c2, axis) {

//   // measure the current time & calculate the width in pixels of each bar
//   var now = clock()
//   if (discrete){
//     // the map() function lets us *normalize* a value from a starting range then *project* it into another range
//     var hourWidth = map(now.hour, 1,12, 0,maxWidth) // from hours (1-12) to pixels (0–maxWidth)
//     var minsWidth = map(now.min,  0,60, 0,maxWidth)  // from mins (0–60) to pixels (0–maxWidth)
//     var secsWidth = map(now.sec,  0,60, 0,maxWidth)  // from secs (0–60) to pixels (0–maxWidth)
//   }else{
//     // alternatively, we can use the clock's 'progress' percentages
//     hourWidth = maxWidth * now.progress.day
//     minsWidth = maxWidth * now.progress.hour
//     secsWidth = maxWidth * now.progress.min
//   }

//   if (axis == X_AXIS) {  // Left to right gradient
//     for (var i = x; i <= x+hourWidth; i++) {
//       var inter = map(i, x, x+hourWidth, 0, 1)
//       var c = lerpColor(c1, c2, inter);
//       stroke(c);
//       rect(i, y,                         hourWidth, barHeight)
//       rect(i, y +    barHeight+spacing,  minsWidth, barHeight)
//       rect(i, y + 2*(barHeight+spacing), secsWidth, barHeight)
//     }
//   }
// }





function setup() {
  // set the width & height of the sketch
  createCanvas(400, 400)

}

function draw(){
  // draw time use clock() function
  background(255)
  noStroke()

  var now = clock(),
      pctHours = now.progress.day;
      pctMin = now.progress.hour;
      pctSec = now.progress.min;

  // var c

  // for (let i = 0; i < width; i++) {
  //   c = chroma.scale(['white', 'black'])
  // }

  fill(0, 0, 0)
  rect(20, 120, 360*pctHours, 40)

  fill(128, 128, 128)
  rect(20, 180, 360*pctMin,   40)

  fill(220, 220, 220)
  rect(20, 240, 360*pctSec,   40)
}