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
let separator = '                                                                                                                                                                                                    ';



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
    createCanvas(window.innerWidth, window.innerHeight+100);
    background(0);



    // ************ All Earthquakes (scale) ************

    // draw scale for the maps base on magnitude
    textFont("Verdana")
    textSize(12)

    fill(0, 175, 255)
    text(`Depth (latest earthquakes in the past 30 days)`, 20, 30)
    fill(255)
    text(`Plotting ${tableAll.getRowCount()} seismic events`, 20, 50)
    text(`Minimum Depth: ${columnMin(tableAll, 'depth')}`, 320, 50)
    text(`Maximum Depth: ${columnMax(tableAll, 'depth')}`, 620, 50)

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



    // // ************ All Earthquakes (bar chart) ************

    // draw bar chart for all earthquakes base on depth
    // print(tableAll.getColumn('depth'));
    var allValues = tableAll.getColumn('depth');

    for (var j = 0; j < allValues.length; j++) {
        fill(colorScaleAll(allValues[j]).rgb()); 
        rect(j*10+25, 140, 10, allValues[j]/5);
    }



    // ************ Sig Earthquakes (scale) ************

    // draw scale for the maps base on magnitude
    textFont("Verdana")
    textSize(12)

    fill(255, 50, 0)
    text(`Depth (significant earthquakes in the past 30 days)`, 20, 200)
    fill(255)
    text(`Plotting ${tableSig.getRowCount()} seismic events`, 20, 220)
    text(`Minimum Depth: ${columnMin(tableSig, 'depth')}`, 320, 220)
    text(`Maximum Depth: ${columnMax(tableSig, 'depth')}`, 620, 220)

    var start = 50;
    var step = 50;
    for (var i=0; i<18; i++){
        var loc = start + i*step
        fill(colorMapSig(i/17).rgb())
        circle(loc, 250, 20, 20);
    }

    fill(255)
    let sigMessage = join(depthScale, separator);
    text(sigMessage, 35, 280);



    // ************ Sig Earthquakes (bar chart) ************

    // draw bar chart for the significant earthquakes base on depth
    // print(tableSig.getColumn('depth'));
    var sigValues = tableSig.getColumn('depth');

    for (var j = 0; j < sigValues.length; j++) {
        fill(colorScaleSig(sigValues[j]).rgb()); 
        rect(j*10+25, 310, 10, sigValues[j]/5);
    }



    // ************ All Earthquakes (comparison text) ************
    textFont("Verdana")
    textSize(12)

    fill(0, 175, 255)
    text(`Magnitude (latest earthquakes in the past 30 days)`, 20, 470)
    fill(255)
    text(`Minimum Magnitude: ${columnMin(tableAll, 'mag')}`, 20, 490)
    text(`Minimum Magnitude Error: ${columnMin(tableAll, 'magError')}`, 320, 490)
    text(`Minimum Number of Seismic Stations: ${columnMin(tableAll, 'magNst')}`, 620, 490)
    text(`Maximum Magnitude: ${columnMax(tableAll, 'mag')}`, 20, 510)
    text(`Maximum Magnitude Error: ${columnMax(tableAll, 'magError')}`, 320, 510)
    text(`Maximum Number of Seismic Stations: ${columnMax(tableAll, 'magNst')}`, 620, 510)



    // ************ All Earthquakes (comparison text) ************
    textFont("Verdana")
    textSize(12)

    fill(255, 50, 0)
    text(`Magnitude (significant earthquakes in the past 30 days)`, 20, 700)
    fill(255)
    text(`Minimum Magnitude: ${columnMin(tableSig, 'mag')}`, 20, 720)
    text(`Minimum Magnitude Error: ${columnMin(tableSig, 'magError')}`, 320, 720)
    text(`Minimum Number of Seismic Stations: ${columnMin(tableSig, 'magNst')}`, 620, 720)
    text(`Maximum Magnitude: ${columnMax(tableSig, 'mag')}`, 20, 740)
    text(`Maximum Magnitude Error: ${columnMax(tableSig, 'magError')}`, 320, 740)
    text(`Maximum Number of Seismic Stations: ${columnMax(tableSig, 'magNst')}`, 620, 740)



    // ************ All Earthquakes (comparison diagram) ************

    // setup for my comparison
    noFill()
    strokeWeight(3)

    // mag
    stroke(25, 64, 125)
    circle(75, 600, columnMin(tableAll, 'mag')*20, columnMin(tableAll, 'mag')*20)
    circle(225, 600, columnMax(tableAll, 'mag')*20, columnMin(tableAll, 'mag')*20)
    // magError
    stroke(148, 206, 193)
    circle(75, 600, columnMin(tableAll, 'magError')*20, columnMin(tableAll, 'magError')*20)
    circle(225, 600, columnMax(tableAll, 'magError')*20, columnMin(tableAll, 'magError')*20)
    // magNst
    stroke(255)
    square(75-columnMin(tableAll, 'magNst')/12, 600-columnMin(tableAll, 'magNst')/12, columnMin(tableAll, 'magNst')/6)
    square(225-columnMax(tableAll, 'magNst')/12, 600-columnMax(tableAll, 'magNst')/12, columnMax(tableAll, 'magNst')/6)



    // ************ All Earthquakes (comparison diagram) ************

    // setup for my comparison
    noFill()
    strokeWeight(3)

    // mag
    stroke(117, 20, 12)
    circle(75, 850, columnMin(tableSig, 'mag')*20, columnMin(tableSig, 'mag')*20)
    circle(225, 850, columnMax(tableSig, 'mag')*20, columnMin(tableSig, 'mag')*20)
    // magError
    stroke(240, 157, 108)
    circle(75, 850, columnMin(tableSig, 'magError')*20, columnMin(tableSig, 'magError')*20)
    circle(225, 850, columnMax(tableSig, 'magError')*20, columnMin(tableSig, 'magError')*20)
    // magNst
    stroke(255)
    square(75-columnMin(tableSig, 'magNst')/12, 850-columnMin(tableSig, 'magNst')/12, columnMin(tableSig, 'magNst')/6)
    square(225-columnMax(tableSig, 'magNst')/12, 850-columnMax(tableSig, 'magNst')/12, columnMax(tableSig, 'magNst')/6)
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
        ext: 'png'
        // id: 'mapbox.streets',
        // accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    }).addTo(mymap);
}

function addCircles(){

    // ************ All Earthquakes (mark) ************

    // calculate minimum and maximum values for magnitude and depth
    // var magnitudeMin = 0.0
    // var magnitudeMax = columnMax(tableAll, 'mag');
    // console.log('magnitude range:', [magnitudeMin, magnitudeMax])

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
        circle.bindPopup(moment(row.get('time')).format('LLLL')).addTo(mymap);
        circle.addTo(mymap);
    }



    // ************ Sig Earthquakes (mark) ************

    // calculate minimum and maximum values for magnitude and depth
    // var magnitudeMin = 0.0;
    // var magnitudeMax = columnMax(tableSig, 'mag');
    // console.log('magnitude range:', [magnitudeMin, magnitudeMax])

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
        circle.bindPopup(moment(row.get('time')).format('LLLL')).addTo(mymap);
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
