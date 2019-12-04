// the data loaded from a USGS-provided CSV file
var tableAll;
var tableSig;

// minimum and maximum values for data and time
var magnitudeMin, magnitudeMax;
// var timeMin, timeMax;

// var times; // an array for the time
// var magnitudes; // an array for the magnitude

// my leaflet.js map
var mymap;
var colorScaleAll = chroma.scale('GnBu').mode('lch').domain([-150,700]);
var colorScaleSig = chroma.scale('OrRd').mode('lch').domain([-150,700]);
var colorMapAll = chroma.scale('GnBu').mode('lch');
var colorMapSig = chroma.scale('OrRd').mode('lch');

// magnitude and depth scales
let depthScale = ['-150', '700'];
let separator = '                                                                                                                   ';



function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    tableAll = loadTable("../project/data/all_month.csv", "csv", "header");
    tableSig = loadTable("../project/data/significant_month.csv", "csv", "header");
}

function setup() {

    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap();

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();
    // setupChart();

    // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);



    // ************ All Earthquakes (scale) ************

    // draw scale for the maps base on magnitude
    textFont("Courier New")
    textSize(12)

    fill(0, 175, 255)
    text(`Latest earthquakes in the past 30 days`, 20, 30)
    fill(255)
    text(`Plotting ${tableAll.getRowCount()} seismic events`, 20, 50)
    text(`Largest Magnitude: ${columnMax(tableAll, 'mag')}`, 320, 50)
    text(`Greatest Depth: ${columnMax(tableAll, 'depth')}`, 620, 50)

    var start = 50;
    var step = 50;
    for (var i=0; i<18; i++){
        var loc = start + i*step
        fill(colorMapAll(i/17).rgb())
        circle(loc, 80, 20, 20);
    }

    fill(255)
    let allMessage = join(depthScale, separator);
    text(allMessage, 35, 110);



    // ************ Sig Earthquakes (scale) ************

    // draw scale for the maps base on magnitude
    textFont("Courier New")
    textSize(12)

    fill(255, 50, 0)
    text(`Significant earthquakes in the past 30 days`, 20, 150)
    fill(255)
    text(`Plotting ${tableSig.getRowCount()} seismic events`, 20, 170)
    text(`Largest Magnitude: ${columnMax(tableSig, 'mag')}`, 320, 170)
    text(`Greatest Depth: ${columnMax(tableSig, 'depth')}`, 620, 170)

    var start = 50;
    var step = 50;
    for (var i=0; i<18; i++){
        var loc = start + i*step
        fill(colorMapSig(i/17).rgb())
        circle(loc, 200, 20, 20);
    }

    fill(255)
    let sigMessage = join(depthScale, separator);
    text(sigMessage, 35, 230);



    // // ************ All Earthquakes (bar chart) ************

    // draw bar chart for all earthquakes base on depth
    // print(tableAll.getColumn('depth'));
    textFont("Courier New")
    textSize(12)

    fill(0, 175, 255)
    text(`The depth of latest earthquakes in the past 30 days`, 20, 270)

    var allValues = tableAll.getColumn('depth');

    for (var j = 0; j < allValues.length; j++) {
        fill(colorScaleAll(allValues[j]).rgb()); 
        rect(j*10+25, 300, 10, allValues[j]/5);
    }



    // ************ Sig Earthquakes (bar chart) ************

    // draw bar chart for the significant earthquakes base on depth
    // print(tableSig.getColumn('depth'));
    textFont("Courier New")
    textSize(12)

    fill(255, 50, 0)
    text(`The depth of significant earthquakes in the past 30 days`, 20, 350)

    var sigValues = tableSig.getColumn('depth');

    for (var j = 0; j < sigValues.length; j++) {
        fill(colorScaleSig(sigValues[j]).rgb()); 
        rect(j*10+25, 380, 10, sigValues[j]/5);
    }
}

function setupMap(){
    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // create your own map
    mymap = L.map('quake-map').setView([40.730610, -73.935242], 4);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png',
        // id: 'mapbox.streets',
        // accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
}

function addCircles(){

    // ************ All Earthquakes (mark) ************

    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0
    var magnitudeMax = columnMax(tableAll, 'mag');
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    var depthMin = 0.0;
    var depthMax = columnMax(tableAll, 'depth');
    console.log('depth range:', [depthMin, depthMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<tableAll.getRowCount(); i++){
        var row = tableAll.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: colorMapAll(row.getNum('depth')/17).hex(), // the dot stroke color
            fillColor: colorMapAll(row.getNum('depth')/17).hex(), // the dot fill color
            fillOpacity: 1.0,
            radius: row.getNum('mag')*10000
        })

        // place the new dot on the map
        circle.addTo(mymap);
    }



    // ************ Sig Earthquakes (mark) ************

    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0;
    var magnitudeMax = columnMax(tableSig, 'mag');
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    var depthMin = 0.0;
    var depthMax = columnMax(tableSig, 'depth');
    console.log('depth range:', [depthMin, depthMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<tableSig.getRowCount(); i++){
        var row = tableSig.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: colorMapSig(row.getNum('depth')/17).hex(), // the dot stroke color
            fillColor: colorMapSig(row.getNum('depth')/17).hex(), // the dot fill color
            fillOpacity: 1.0,
            radius: row.getNum('mag')*10000
        })

        // place the new dot on the map
        circle.addTo(mymap);
    }
}



// removes any circles that have been added to the map
function removeAllCircles(){
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer)
        }
    })
}

// get the maximum value within a column
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}

// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
}
