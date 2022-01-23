var sheetdata=SpreadsheetApp.openById("1colUZpViqUppDA27vHm7BrK64EH6W0pWzcbOGtjTSPw").getSheets()[0].getDataRange().getValues().filter(String);
var MRD=sheetdata.map(function(value,index) { return value[1]; }).slice(1, );


function doGet(e) 
{
 //Web response 
  
 
  console.log("Web Ran")
  return HtmlService.createHtmlOutput("Working Fine");
 
}


function doPost(e)
{ 
//API response
  var indexref=MRD.indexOf(Number(e.postData.contents));
  
  json="{ \n";
  for (let i = 0; i < sheetdata[indexref+1].length; i++) 
  {
    if (sheetdata[indexref+1][i]!="")
    {
    if (i!=sheetdata[indexref+1].length-1)
    {
      json += '"'+sheetdata[0][i] + '": ' + '"'+sheetdata[indexref+1][i] + '",\n';
    }
    else
    {
      json += '"'+sheetdata[0][i] + '": ' + '"'+sheetdata[indexref+1][i] + '"\n';
    }
    }
  }
  if(json.endsWith(",\n"))
  {
    json = json.slice(0, -3);
    json+='"\n';
  }
  json+=" }";
  
//var geo0= JSON.stringify(jso).replace("[\"[","[["); 
//var geo1= geo0.replace("]\"]","]]"); 
//console.log(geo1)
  return  ContentService.createTextOutput(json);
}



