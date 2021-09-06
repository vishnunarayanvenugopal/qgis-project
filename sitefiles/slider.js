jQuery(document).ready(main)

function main() {

 var map = L.map('map', {
              center: [10.833, 77.245],
              zoom: 7.4
          });

         var carto=L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
           attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'//,
          // maxZoom: 11,
          // minZoom: 4
         }).addTo(map);

         //change the file url to match yours
         $.getJSON("https://raw.githubusercontent.com/neiugis/lab7_map/main/city.geojson")
         .done(function(data) {
           console.log("ok")
          //  var info = processData(data);
            //console.log(info.timestamps)
            // console.log(info)
            // createPropSymbols(info.timestamps, data);
           //  createSliderUI(info.timestamps);
         });

         ////////////////////////////////////get data sheet/////////////////////////////////////////////////

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
 var info
 var layerGroup = L.layerGroup().addTo(map);

fetched=getdata("https://script.google.com/macros/s/AKfycbzvqzDgrTVWyKDpAF9ymfObmgc6fWgXRcxi4cmc-KYFmP-x02k9/exec",arryz,map);

//getdata("https://script.google.com/macros/s/AKfycbzlUi1Mw79iga74qqXjib5S_cfBSGmPHFDWspy4B-tNWGVsQuU/exec",arryz,map);

 

function getdata(link,arryz,where){
  fetch(link, requestOptions)
    .then(response => response.json())
    .then(result => arryz=result)
    .then(data =>  {
              var years=[]
              for(let i = 0; i < arryz.geometries[0].years[0].length; i++)
              {
                      years.push(arryz.geometries[0].years[0][i].replace("ok",""))

              }
              var temp= [...new Set(years)];
              years=temp.sort();
              var yeartodraw=years[0]
                      info = updatemap(arryz,map,years,yeartodraw,flag=1);
                      
                   })

    //.then(() => updatemap(arryz,where))
  .then(function(data) {
           //  var info = updatemap(arryz,map);
             //console.log(info.timestamps)
             
           //  createPropSymbols(info.timestamps, data);
            // createPropSymbols(info.timestamps, data);
          //   createSliderUI(info.timestamps);
         })
    .catch(error => console.log('error', error)
      );
    
    
}



function updatemap(arryz,where,years,yeartodraw,flag=0){

//  console.log(arryz.geometries[0].yearoccu[0][years.indexOf(yeartodraw)])

  if (typeof arryz.geometries[0].yearoccu[0][years.indexOf(yeartodraw)] !== 'undefined')
  {
        for (let i = 0; i < arryz.geometries[0].yearoccu[0][years.indexOf(yeartodraw)].length; i++) 
      {

        var min=1 //make it to count of patient in pincode later
        var max=1 //make it to count of patient in pincode later

        var temp=arryz.geometries[0].names[0][arryz.geometries[0].yearoccu[0][years.indexOf(yeartodraw)][i]].replace("ok", "")+"<br>"+yeartodraw.replace("ok", "")
      //  L.marker(arryz.geometries[0].coordinates[0][i].split(",").map(Number)).bindPopup(temp).addTo(where);
        
        circlemakers(arryz.geometries[0].coordinates[0][arryz.geometries[0].yearoccu[0][years.indexOf(yeartodraw)][i]],map,temp,layerGroup)



       // markers.clearLayers();


    }
  }
  
    //updatePropSymbols(years[0]);


  /*   function clearmarks() 
     {
      markers.clearLayers();
     } */

  //   createTimeLabel(years[0])
    if(flag==1)
    {
      createSliderUI(years,layerGroup,arryz)
    }
      

    return { // the function finally returns the timestamps array, the min and max of population data
              timestamps : years,
              min : min,
              max : max
          }
}



function circlemakers(loc,where,popup,layerGroup)   //vishnu defined
{
  L.circleMarker(loc.split(",").map(Number), { // we use circle marker for the points
                      fillColor: "#501e65",  // fill color of the circles
                      color: '#501e65',      // border color of the circles
                      weight: 2,             // circle line weight in pixels
                      fillOpacity: 0.5       // fill opacity (0-1)
                  }).on({
                        mouseover: function(e) {
                            this.openPopup();
                            this.setStyle({fillColor: 'green'});  // fill color turns green when mouseover
                        },
                        mouseout: function(e) {
                            this.closePopup();
                            this.setStyle({fillColor: '#501e65'});  // fill turns original color when mouseout
                        }
                }).bindPopup(popup).addTo(layerGroup);



         return layerGroup
  /*L.circleMarker(loc.split(",").map(Number), { // we use circle marker for the points
                      fillColor: "#501e65",  // fill color of the circles
                      color: '#501e65',      // border color of the circles
                      weight: 2,             // circle line weight in pixels
                      fillOpacity: 0.5       // fill opacity (0-1)
                  }).on({
                        mouseover: function(e) {
                            this.openPopup();
                            this.setStyle({fillColor: 'green'});  // fill color turns green when mouseover
                        },
                        mouseout: function(e) {
                            this.closePopup();
                            this.setStyle({fillColor: '#501e65'});  // fill turns original color when mouseout
                        }
                }).bindPopup(popup).addTo(where);
*/
}

   function createSliderUI(timestamps,layerGroup,data) {
          var sliderControl = L.control({ position: 'bottomleft'} ); // position of the slider
          var checkbox = L.control({position: 'bottomleft'});
          var checked=0

            checkbox.onAdd = function (map) {
             var div = L.DomUtil.create('div', 'checkbox');
              div.innerHTML = '<form style="padding-left: 20px;"><input id="checkbox" type="checkbox"/>Show Previous</form>'; 
         return div;
                      };


      checkbox.addTo(map);

      function handleCommand() 
          {
            if(this.checked==false)
            {
              checked=0
            }
            else
            {
              checked=1
            }

          }


                  document.getElementById ("checkbox").addEventListener ("click", handleCommand, false);

      
      
      

                            // Another use of L.control :)
          sliderControl.onAdd = function(map) {
            //initialize a range slider with mousedown control
              var slider = L.DomUtil.create("input", "range-slider");
              L.DomEvent.addListener(slider, 'mousedown', function(e) {
                  L.DomEvent.stopPropagation(e);
              });
              $(slider).mousedown(function () { map.dragging.disable(); });

            // Define the labels of the time slider as an array of strings
            // Modify this for your data
            var yearlist = [];
            var minyear=timestamps[0];
            var maxyear=timestamps[timestamps.length-1];
      for (var i = minyear; i <= maxyear; i++)        //generate lower year ranges

      {
          yearlist.push(i.toString());
      }

            var labels = yearlist;

            $(slider)
                .attr({
                  'type':'range',
                  'max': timestamps[timestamps.length-1],
                  'min':timestamps[0],
                  'step': 1, // Change this to match the numeric interval between adjacent timestamps
                  'value': String(timestamps[0])
                })
                .on('input change', function() {

                  //console.log("changed to",$(this).val().toString())

                  if(checked==0)
                  {
                    layerGroup.clearLayers();
                  }

                  //  updatePropSymbols($(this).val().toString()); // automatic update the map for the timestamp
                    var i = $.inArray(this.value,labels);
                    $(".temporal-legend").text(labels[i]); // automatic update the label for the timestamp

                  updatemap(data,map,timestamps,$(this).val())




                  

                  
                });
            return slider;
          }
          sliderControl.addTo(map);
          createTimeLabel(timestamps[0]); //The starting timestamp label
          }


          // Add labels to the time slider when the map first loaded
          function createTimeLabel(startTimestamp) {
            var temporalLegend = L.control({position: 'bottomleft' }); // same position as the slider
                               // One more use of L.control !!
            temporalLegend.onAdd = function(map) {
              var output = L.DomUtil.create("output", "temporal-legend");
              $(output).text(startTimestamp);
              return output;
            }
            temporalLegend.addTo(map);
          }
}
