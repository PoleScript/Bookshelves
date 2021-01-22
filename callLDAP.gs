//*****************************************  To get Country by LDAP
function getCountry(userEmail,token){ 
  var country; 
  var url               = "https://api.decathlon.net/directory/v1/users?mail="+userEmail+"&fields=c&items_per_page=2";
  var headers = 
    {
    'method': 'GET',  
    "headers":
      {
      "Authorization": "Bearer "+token,
      "accept": "application/json",  
      "x-api-key": getLdapXapikey()
      }
    };
  var response_api      = JSON.parse(UrlFetchApp.fetch(url, headers));
  country               = response_api[0]["c"];
  Logger.log(country);
return country; 
}


//*****************************************  To get Branch by LDAP
function getBranch(userEmail,token){ 
  var branch; 
  var url               = "https://api.decathlon.net/directory/v1/directory/v1/users?mail="+userEmail+"&fields=branch&items_per_page=2";
  var headers = 
    {
    'method': 'GET',  
    "headers":
      {
      "Authorization": "Bearer "+token,
      "accept": "application/json",  
      "x-api-key": getLdapXapikey()
      }
    };
  var response_api      = JSON.parse(UrlFetchApp.fetch(url, headers));
  branch               = response_api[0]["branch"][0];
return branch; 
}

//*****************************************  Your Basic and Client_id
function getLdapXapikey(){
  return "354d3db0-5dc3-41e3-8f1d-6ba96fcf04df";  
}