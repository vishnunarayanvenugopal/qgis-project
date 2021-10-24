var sheetdata=SpreadsheetApp.openById("1eqC-eBgsvb6G0c8l6D2jiZ_5zMPW7Sax8ouPtFvdHDg").getSheets()[0].getDataRange().getValues().filter(String);
var loc=sheetdata.map(function(value,index) { return value[0]; }).slice(1, );
var names=sheetdata.map(function(value,index) { return value[1]; }).slice(1, );
var years=sheetdata.map(function(value,index) { return value[2]; }).slice(1, );

function doGet(e) 
{
 //Web response 
  
 
  console.log(years)
  
  
  var geo=""
  var namesa=""
  var yearsa=""
   for(j=0;j<loc.length;j++)
  {
    
    if(j<loc.length-1)
    {
      geo+="["+loc[j]+"],"
      namesa+="["+names[j]+"],"
      yearsa+="["+years[j]+"],"
    }
    else
    {
      geo+="["+loc[j]+"]"
      namesa+="["+names[j]+"]"
      yearsa+="["+years[j]+"]"
    }
    
    
  }
  
  var jso={
  "type": "GeometryCollection",
  "geometries": [
    {
      "type": "MultiPoint",
      "coordinates": [
        geo
      ],
      "names" : [ namesa ],
      "years" : [ yearsa ]
      
    }
  ]
}
var geo0= JSON.stringify(jso).replace("[\"[","[["); 
var geo1= geo0.replace("]\"]","]]"); 
console.log(geo1+"haha")
  
 return HtmlService.createHtmlOutput(geo1);
 
}


function doPost(e)
{ 
//API response
 
  
  var geo=""
/*  var namesa=""
  var yearsa=""
   for(j=0;j<loc.length;j++)
  {
    
    if(j<loc.length-1)
    {
      geo+="["+loc[j]+"],"
      namesa+="["+names[j]+"],"
      yearsa+="["+years[j]+"],"
    }
    else
    {
      geo+="["+loc[j]+"]"
      namesa+="["+names[j]+"]"
      yearsa+="["+years[j]+"]"
    }
    
    
  }
  */
  var jso={
  "type": "GeometryCollection",
  "geometries": [
    {
      "type": "MultiPoint",
      "coordinates": [
      [].concat.apply([], loc.filter(String))
        
      ],
      "names" : [
      [].concat.apply([], names.filter(String))
      
      ],
      "years" : [
      [].concat.apply([], years.filter(String))
      
      ],
       "yearoccu" : [
       getrowno(years).filter(String)
      
      ]
    }
  ]
}
var geo0= JSON.stringify(jso).replace("[\"[","[["); 
var geo1= geo0.replace("]\"]","]]"); 
console.log(geo1)
  return  ContentService.createTextOutput(geo1);
}
////////////////////////////////////////get all row no of each years//////////////////////////////////////////////////////////////////////////////////////
function getrowno(years)
{
  var years=sheetdata.map(function(value,index) { return value[2].replace("ok",""); }).slice(1, );
 var uniqyears= [...new Set(years)];
  var loc=[]
  
  function getAllIndexes(arr, val)
  {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1)
    {
        indexes.push(i);
    }
    return indexes;
   }

  for(i=0; i<uniqyears.length; i++)
  {
    loc.push(getAllIndexes(years, uniqyears[i]))
  }
  console.log(loc,uniqyears);
  return loc;
}



