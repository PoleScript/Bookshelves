//*****************************************  To get Org Unit by Google
function getOrgUnitId(orgUnitPath){ 
  var  orgUnitIdSub = ""
  //----Parameters to find roles list  
  var  urlorgUnit          ="https://www.googleapis.com/admin/directory/v1/customer/my_customer/orgunits/";
  var  paramsorgUnit       ={
      'method': 'GET',
      "headers": {
        "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),
        'Accept': 'application/json',
        "Content-type" : "application/json"
      }};
  
  //----To get API results
  var responseAPI        = JSON.parse(UrlFetchApp.fetch(urlorgUnit+orgUnitPath,paramsorgUnit));
 
  //----To get userId only  
  var orgUnitId       = responseAPI.orgUnitId; 
  orgUnitIdSub        = orgUnitId.substring(3);
   
return orgUnitIdSub;  
}


//*****************************************  To get User ID by Google
function getUserId(userEmail){
  var userId             = "" 
  //----Parameters to find roles list  
  var  urlUser           ="https://www.googleapis.com/admin/directory/v1/users/";
  var  paramsUser        ={
      'method': 'GET',
      "headers": {
        "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),
        'Accept': 'application/json',
        "Content-type" : "application/json"
      }};
  
  //----To get API results
  var responseAPI        = JSON.parse(UrlFetchApp.fetch(urlUser+userEmail,paramsUser));
 
  //----To get userId only  
  userId       = responseAPI.id; 
   
return userId;  
}


//*****************************************  To get Role ID by Google
function getRoleId(roleRequest){  
  var roleId = "";
  //----Parameters to find roles list  
  var  urlRolesList      ="https://www.googleapis.com/admin/directory/v1/customer/my_customer/roles";
  var  paramsRolesList   ={
    'method': 'GET',
    "headers": {
      "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),
      'Accept': 'application/json',
      "Content-type" : "application/json"
    }};
  
  //----To get API results
  var ResponseAPI        = JSON.parse(UrlFetchApp.fetch(urlRolesList,paramsRolesList));
  var rolesList          = ResponseAPI.items;  
  
  //----'For' to list roles 
  for (var i=0; i < rolesList.length; i++) 
  {
    var roleDescription = rolesList[i].roleName; 
    if (roleDescription == roleRequest) {  
      //----To get the object values role ID
      roleId          = rolesList[i].roleId;
    } 
  } 
Logger.log("RoleId trouvé/"+roleId);  
return roleId; 
}

//*****************************************  ROLE MANAGEMENT

//*****************************************  PART I : UTILITIES
//*****************************************  To set Admin Rights Large (means all domain)
function setAdminRightsLarge(userId,roleId) {
  var  urlGiveAdminRights      ="https://www.googleapis.com/admin/directory/v1/customer/my_customer/roleassignments";
  var  paramsGiveAdminRights  ={
      'method': 'POST',
      "headers": {
        "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),
        'Accept': 'application/json',
        "Content-type" : "application/json"
      },
      'payload': JSON.stringify({
        "assignedTo": userId,
        "roleId": roleId,
        "scopeType": "CUSTOMER"  
      })
    };
  
try {UrlFetchApp.fetch(urlGiveAdminRights,paramsGiveAdminRights);
Logger.log("Droit donné/"+roleId);} catch (e)  {Logger.log("Erreur setAdminRightsLarge/"+e);} 
return;  
}


//*****************************************  To set Admin Rights Restricted (means some countries)
function setAdminRightsRestricted(userId,roleId,orgUnitId) { 
var  urlGiveAdminRights      ="https://www.googleapis.com/admin/directory/v1/customer/my_customer/roleassignments";
var  paramsGiveAdminRights  ={
      'method': 'POST',
      "headers": {
        "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),
        'Accept': 'application/json',
        "Content-type" : "application/json"
      },
      'payload': JSON.stringify({
        "assignedTo": userId,
        "orgUnitId": orgUnitId,
        "roleId": roleId,
        "scopeType": "ORG_UNIT"  
      })
    };
  
try {UrlFetchApp.fetch(urlGiveAdminRights,paramsGiveAdminRights);
Logger.log("Droit donné/"+roleId+", sur l'OrgUnitId/"+orgUnitId);} catch (e)  {Logger.log("Erreur setAdminRightsRestricted/"+e);} 
return;    
}
   
//*****************************************  PART II : GLOBAL FUNCTIONS                    
//*****************************************  To set Admin Rights All Orgs
function setAdminRightsAllOrgs(userEmail,requestRoleAllorgs,token){

  var userId                = getUserId(userEmail);
  Logger.log("UserId trouvé/"+userId);
  var rolesList             = [];
  rolesList                 = requestRoleAllorgs.split(", ");
   
     for (var j=0; j < rolesList.length; j++){
       var roleRequest      = rolesList[j];
       Logger.log("Liste des "+roleRequest);  
       var roleId           = Number(getRoleId(roleRequest));     
       setAdminRightsLarge(userId,roleId);
       Logger.log("Récapitulatif du droit donné/"+roleRequest+", correspondant au role Id N°/"+roleId+", pour/"+userEmail);    
     }
  return;
}

//*****************************************  To set Admin Rights Restricted OU
function setAdminRights(userEmail,requestCountry,requestRole,token){
            var userId                = getUserId(userEmail);
            Logger.log("UserId trouvé/"+userId);
            var countryList           = [];
            countryList               = requestCountry.split(", ");
 
            for (var k=0; k < countryList.length; k++){                
                var countryRequest    = countryList[k];
                var orgUnitId         = getOrgUnitId(countryRequest);
                var rolesList         = [];
                rolesList             = requestRole.split(", ");
              
                for (var j=0; j < rolesList.length; j++){
                     var roleRequest  = rolesList[j];
                     Logger.log("Liste des "+roleRequest); 
                     var roleId       = Number(getRoleId(roleRequest));  
                     
                     if (roleRequest == "Building and Rooms management"){
                         setAdminCalendar(userEmail); 
                         Logger.log("Récapitulatif du droit donné/"+roleRequest+", pour/"+userEmail+", sur MyGoogle");
                     }
                  
                     else {  
                     setAdminRightsRestricted(userId,roleId,orgUnitId);
                     Logger.log("Récapitulatif du droit donné/"+roleRequest+", correspondant au role Id N°/"+roleId+", pour/"+userEmail+", sur le pays N°/"+orgUnitId);                
                  }
                }
            }
  return;
}