jQuery(document).ready(main)

function main() {

/*	var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
	var topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});
	var pnt = L.layerGroup(); 
	var unconfirm = L.layerGroup(); 

	// Markers cos50 & cos110
	var cos50 = L.layerGroup(); 
	var cos110= L.layerGroup(); 

    var map = L.map('map', {center: [10.833, 77.245], zoom: 7.4, layers: [osm, pnt , unconfirm]}).setView([10.833, 77.245], 7);;
   /// var map = L.map('map', {}).setView([49.5, 16], 14);


  L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    atribution: 'Map data &copy; OSM.org'
  }).addTo(map);


*/




// Tile layer
//let map = L.map("map", {center: [10.833, 77.245], zoom: 7});
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
var topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'});

// Coordinates array (lat-lon)

// Markers confirmed & non confirmed
var pnt = L.layerGroup(); 
var unconfirm = L.layerGroup(); 

// Markers cos50 & cos110
var cos50 = L.layerGroup(); 
var cos110= L.layerGroup(); 


// Line
//var line = L.polyline(coords, {color: "red", weight: 7}).bindPopup("Travel Path");

// Map
var map = L.map('map', {center: [10.833, 77.245], zoom: 7.4, layers: [osm, pnt , unconfirm]}).setView([10.833, 77.245], 7);

// Description
var legend = L.control({position: "bottomleft"});
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML = 
        '<h3>LeapFrog GIS Cancer Study</h3>' +
        '<ul>' +
        '<li>Confirm : Verified Data</li>' +
        '<li>Unconfirm : Yet To Verify</li>' +
        '<li>Topology Map</li>' +
        '<li>Regular OpenStreetMap</li>' +
        '</ul>'
    return div;
};
legend.addTo(map);


var coastal50 = 'https://raw.githubusercontent.com/vichuroxx/Qgis-Project/main/coastal/ne_50m_coastline.geojson'
var coastal110 = 'https://raw.githubusercontent.com/vichuroxx/Qgis-Project/main/coastal/coastal-buffer.geojson'  //note 60 km buffer actually

// create a leaflet map (you must have loaded leaflet first)

fetch(
  coastal50
).then(
  res => res.json()
).then(
  data => L.geoJSON(data, style = {"color": "#0000CD"}).addTo(cos50)
)


fetch(
  coastal110
).then(
  res => res.json()
).then(
  data => L.geoJSON(data, style = {"color": "#8B008B"}).addTo(cos110)
)




// Load GeoJSON from an external file
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "application/json");

var raw = "hi";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

var arryz
getdata("https://script.google.com/macros/s/AKfycbzvqzDgrTVWyKDpAF9ymfObmgc6fWgXRcxi4cmc-KYFmP-x02k9/exec",arryz,pnt);
getdata("https://script.google.com/macros/s/AKfycbzlUi1Mw79iga74qqXjib5S_cfBSGmPHFDWspy4B-tNWGVsQuU/exec",arryz,unconfirm);

function getdata(link,arryz,where){
    fetch(link, requestOptions)
    .then(response => response.json())
    .then(result => arryz=result)
    .then(data => arryz = data)
    .then(() => updatemap(arryz,where))
    .catch(error => console.log('error', error));
}



function updatemap(arryz,where){
    for (let i = 0; i < arryz.geometries[0].coordinates[0].length; i++) 
        {
            L.marker(arryz.geometries[0].coordinates[0][i].split(",").map(Number)).bindPopup(arryz.geometries[0].names[0][i]).addTo(where);
        }
}



 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
setTimeout(() => {  console.log(getdata()); }, 10000);
//console.log()

// Layer control
var baseMaps = {
    "OSM": osm,
    "Topography": topography
};
var overlayMaps = {
    "Confirmed": pnt,
    "Unconfirmed" : unconfirm,
    "Coastal : 50m": cos50,
    "Coastal : 60 km buffer" : cos110
};
//L.control.layers(baseMaps, coastalline, {position: "topleft", collapsed: false}).addTo(map);
L.control.layers(baseMaps,overlayMaps, {position: "topleft", collapsed: false}).addTo(map);







}


