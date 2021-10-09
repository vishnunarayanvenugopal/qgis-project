jQuery(document).ready(main)



function main() {

/*  var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
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
var airquality = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=847d225206311fa61b0bdc52e27ee8afdf462246', {attribution: 'World Air Quality Index project: &copy; <a href="https://aqicn.org/home/">link</a> contributors, <a href="https://aqicn.org/sources/">EPA sources</a> '});

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

//////////////////////////////////////////////Sidebar Start///////////////////////////////////////////////////////////////////////////////////////////////////////////////

 var sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'right'
        });
        map.addControl(sidebar);

setTimeout(function () {
            sidebar.hide();
        }, 500);

 map.on('click', function () {
            sidebar.hide();
        })

        sidebar.on('show', function () {
           // console.log('Sidebar will be visible.');
        });

        sidebar.on('shown', function () {
            //console.log('Sidebar is visible.');
        });

        sidebar.on('hide', function () {
           // console.log('Sidebar will be hidden.');
        });

        sidebar.on('hidden', function () {
            //console.log('Sidebar is hidden.');
        });

        L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
            //console.log('Close button clicked.');
        });

/////////////////////////////////////////////////////////sidebar end//////////////////////////////////////////////////////////////////////////////////////////////////////////////




var rubberplantation = 'https://raw.githubusercontent.com/vichuroxx/Qgis-Project/main/shape/rubber/rubber-dissolved.geojson' //rubber dissolved actually
var buffer60km = 'https://raw.githubusercontent.com/vichuroxx/Qgis-Project/main/shape/coastal/coastal-buffer.geojson'  //note 60 km buffer actually
//var airquality = 'https://raw.githubusercontent.com/vichuroxx/Qgis-Project/main/shape/coastal/coastal-buffer.geojson'  //note 60 km buffer actually

// create a leaflet map (you must have loaded leaflet first)

fetch(
  rubberplantation
).then(
  res => res.json()
).then(
  data => L.geoJSON(data, style = {"color": "#228B22"}).addTo(cos50)
)


fetch(
  buffer60km
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

/////////////////////////////////////////////////////////API request custom patient data///////////////////////////////////////////////////////////////////////////////////////////////////


var header1 = new Headers();

var arryz1
getpatientdata("https://script.google.com/macros/s/AKfycbyI1JbOfteRSxzw1WuH76RoHyuQsG5_nMj_yA8kBKKVczaChzeb/exec",arryz1,raw);

function getpatientdata(link,arryz1,raw){
    fetch(link, {
  method: 'POST',
  headers: header1,
  body: raw,
  redirect: 'follow'
})
    .then(response => response.json())
    .then(result => arryz1=result)
    .then(data => arryz1 = data)
    .then(() => sidebar.setContent(GenerateTable(arryz1)))
    .catch(error => console.log('error', error));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function circlemakers(loc,where,popup,layerGroup)   //vishnu defined
{
  L.circleMarker(loc.split(",").map(Number), { // we use circle marker for the points
                      fillColor: "#FF5733 ",  // fill color of the circles
                      color: '#880808',  // border color of the circles
                      radius: 5,      
                      weight: 2,             // circle line weight in pixels
                      fillOpacity: 0.5       // fill opacity (0-1)
                  }).on({
                        mouseover: function(e) {
                            this.openPopup();
                            this.setStyle({fillColor: 'green'});  // fill color turns green when mouseover
                        },
                        mouseout: function(e) {
                            this.closePopup();
                            this.setStyle({fillColor: '#FF5733'});  // fill turns original color when mouseout
                        },
                        click: function (e) {
                                                sidebar.show();
                                                sidebar.setContent("<div id=\"dvTable\">Loading..<\/div>");
                                                getpatientdata("https://script.google.com/macros/s/AKfycbyI1JbOfteRSxzw1WuH76RoHyuQsG5_nMj_yA8kBKKVczaChzeb/exec",arryz1,popup);
        }
                }).bindPopup(popup).addTo(layerGroup);

         return layerGroup
}



function updatemap(arryz,where){
    for (let i = 0; i < arryz.geometries[0].coordinates[0].length; i++) 
        {

            circlemakers(arryz.geometries[0].coordinates[0][i],where,arryz.geometries[0].names[0][i].replace("ok",""),where)
           // L.circleMarker(arryz.geometries[0].coordinates[0][i].split(",").map(Number)).bindPopup(arryz.geometries[0].names[0][i].replace("ok","")).addTo(where);
        }
}

/////////////////////////////////////////////////////////generate table from JSON//////////////////////////////////////////////////////////////////////////////

 function GenerateTable(json) {
 
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";
 
 var includethis=["MRD","Age","District","Coastal","Gender","Obesity","Alcohol","Smoking","DOD","DOE","Mortality","Name"];

for (var property in json) {

  if (includethis.includes(property))
  {
        row = table.insertRow(-1);
      var cell = row.insertCell(-1);
      cell.innerHTML = property;
      var cell = row.insertCell(-1);
      cell.innerHTML = json[property];
      //  console.log(property,":",json[property]);
  }
  
}
 
 
      //  var dvTable = document.getElementById("dvTable");
      //  dvTable.innerHTML = "";
      //  sidebar.setContent("table");
     //   dvTable.appendChild(table);

     return(table)

    }

/////////////////////////////////////////////////////////Radioactivity datapoints////////////////////////////////////////////////////////////////////////////////////

var LeafIcon = L.Icon.extend({
    options: {
      shadowUrl: 'sitefiles/img/leaf-shadow.png',
      iconSize:     [25, 25],
      shadowSize:   [0, 0],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
    }
  });

  var greenIcon = new LeafIcon({iconUrl: 'sitefiles/img/radioactive.png'});

  //,
  //  redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
 //   orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

  L.marker([8.9753950, 76.5348376], {icon: greenIcon}).bindPopup("Chavara - Natural Radioactivity").addTo(map);
  L.marker([8.9428812, 76.5386280], {icon: greenIcon}).bindPopup("Neendakara - Natural Radioactivity").addTo(map);
   L.marker([9.9412805, 76.3359475], {icon: greenIcon}).bindPopup("Poonithura - Natural Radioactivity").addTo(map);

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//console.log()

// Layer control
var baseMaps = {
    "OSM": osm,
    "Topography": topography
};
var overlayMaps = {

    "Confirmed": pnt,
    "Unconfirmed" : unconfirm,
    "Air Quality": airquality,
    "Rubber plantations": cos50,
    "Coastal : 60 km buffer" : cos110
};
//L.control.layers(baseMaps, coastalline, {position: "topleft", collapsed: false}).addTo(map);
L.control.layers(baseMaps,overlayMaps, {position: "topleft", collapsed: false}).addTo(map);

}
