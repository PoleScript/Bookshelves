//*****************************************  To get Token by FED
function getTokenFed(){ 
  var token;
  var fed_prod         = "https://idpdecathlon.oxylane.com/as/token.oauth2"; 
  // prod : https://idpdecathlon.oxylane.com/as/token.oauth2 
  // preprod : https://preprod.idpdecathlon.oxylane.com/as/token.oauth2
  var headers_fed_prod = 
            {
                "method" : "post",
                "headers": {  
                    "Authorization": "Basic "+getBasic() // "ClientID:ClientSecret" in BASE 64  
                },
              "payload" :  {
                "grant_type": "client_credentials",
                "client_id": getClient_id()
              }            
            };
  var response_fed     = UrlFetchApp.fetch(fed_prod, headers_fed_prod);
  var data_fed         = JSON.parse(response_fed.getContentText());
  token                = data_fed.access_token;
  Logger.log(token);
  return token; 
}

//*****************************************  Your Basic and Client_id

function getBasic(){
  return "QzQwYWU4YTMxNzlmMWQ1OTZkMmI1NzM2YjJjMWVhZDAyMWUzMDM1NzY6U3FBNngxRUpBUzIyeUU1SVdOTEJNS1YwM1c4ZkpCRDB3S21JQVFMZmlvbVlpZjgxQUg3WXBMRjhYYWtBT1dBTg==";
}

function getClient_id(){
  return "C40ae8a3179f1d596d2b5736b2c1ead021e303576";
}
