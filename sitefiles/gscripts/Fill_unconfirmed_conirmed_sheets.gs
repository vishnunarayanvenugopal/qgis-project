FormsheetID="1r2CO9oXYa5ulFY5qmWNF1bBdHyBLGjKgeCj6d6vZ1MA"
confirmedsheetID="18MADAyY_I2f1HG400j3QWvRkqwd4WMoH_RwAeXNF8p4"
unconfirmedsheetID="1eqC-eBgsvb6G0c8l6D2jiZ_5zMPW7Sax8ouPtFvdHDg"
MasterDataID="1colUZpViqUppDA27vHm7BrK64EH6W0pWzcbOGtjTSPw"
pincodeID="1UnH5t3T6tOkUHR_PorAfdZsAnq5oCX5cwYDLiqkSBaw"

var sheetdata=SpreadsheetApp.openById(FormsheetID).getSheets()[0].getDataRange().getValues().filter(String);
var masterdata=SpreadsheetApp.openById(MasterDataID).getSheets()[0].getDataRange().getValues().filter(String);

var pinsheet=SpreadsheetApp.openById(pincodeID).getSheets()[0].getDataRange().getValues().filter(String);


var statusform=sheetdata.map(function(value,index) { return value[5]; }).slice(1, );
var confirmationform=sheetdata.map(function(value,index) { return value[6]; }).slice(1, );
var yeardata=sheetdata.map(function(value,index) { return value[3]; }).slice(1, );
var MRDform=sheetdata.map(function(value,index) { return value[2]; }).slice(1, );
var hisform=sheetdata.map(function(value,index) { return value[4]; }).slice(1, );
var pincodes=sheetdata.map(function(value,index) { return value[1]; }).slice(1, );

var pincodenum=pinsheet.map(function(value,index) { return value[1]; }).slice(1, );
var pincodelat=pinsheet.map(function(value,index) { return value[9]; }).slice(1, );
var pincodelong=pinsheet.map(function(value,index) { return value[10]; }).slice(1, );

function filldata() {
  for(i=0;i<statusform.length;i++)
  {
    if(statusform[i]=="New" && confirmationform[i]=="yes")
    {
      stringed=pincodes[i].toString()
      for(j=0;j<pincodenum.length;j++)
        {
          if(pincodenum[j]==stringed)
          {
            console.log("found")
            console.log(pincodelat[j])
            console.log(pincodelong[j])
            break; 
          }
        }
       var loc=pincodelat[j].toString()+","+pincodelong[j].toString()
       
       SpreadsheetApp.openById(confirmedsheetID).getSheets()[0].appendRow([loc,MRDform[i]+"ok",yeardata[i]+"ok"]);
       SpreadsheetApp.openById(FormsheetID).getRange('F'+(i+2)).setValue("Updated");
                
       
    }
    else if(statusform[i]=="New" && confirmationform[i]=="no")
    {
      stringed=pincodes[i].toString()
      for(j=0;j<pincodenum.length;j++)
        {
          if(pincodenum[j]==stringed)
          {
            console.log("found")
            console.log(pincodelat[j])
            console.log(pincodelong[j])
            break; 
          }
        }
       var loc=pincodelat[j].toString()+","+pincodelong[j].toString()
       
       SpreadsheetApp.openById(unconfirmedsheetID).getSheets()[0].appendRow([loc.toString(),MRDform[i].toString(),yeardata[i].toString()]);
       SpreadsheetApp.openById(FormsheetID).getRange('F'+(i+2)).setValue("Updated");
    }
  }
  
}
