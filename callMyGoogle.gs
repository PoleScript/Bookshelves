//*****************************************  Add user to "adminroomcalendar@decathlon.net" with rights on MyGoogle calendar feature
function setAdminCalendar(userEmail) {
  var  urlGiveAdminRights      ="https://www.googleapis.com/admin/directory/v1/groups/adminroomcalendar%40decathlon.net/members?";
  var  paramsGiveAdminRights  = {
    'method': 'post',  
    "headers":
      {
      "Authorization": "Bearer "+ ScriptApp.getOAuthToken(),  
      'Content-Type': 'application/json',  

      },
      'payload': JSON.stringify({"email": userEmail})
    };
  
try {UrlFetchApp.fetch(urlGiveAdminRights,paramsGiveAdminRights);
Logger.log("Droit donné/ Building and Calendar")} catch (e)  {Logger.log("Building and Calendar/"+e);} 
return;    
}  