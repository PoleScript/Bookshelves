function userInfos(){
  var email = Session.getActiveUser().getEmail();
  Logger.log(email);
  var token = getTokenFed();
   Logger.log(token);
  var country = getCountry(email,token);
   Logger.log(country);
  return country;
}

function getDataForSearch() {
  const ss = SpreadsheetApp.openById("1lFHVtmcokHQToeptw-jRWqi7iLQHqc80k_JzxxSKzWA"); 
  const ws = ss.getSheetByName("Data"); 
  return ws.getRange(2,1,ws.getLastRow()-1,6).getValues();
}
