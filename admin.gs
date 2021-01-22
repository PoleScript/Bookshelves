function adminRightsDistributor() {
  
  //******************************************************** To get one FED token
  var token                          = getTokenFed();
  
  //******************************************************** GLOBAL VARIABLE    
  var adminEmail                     = "collaborative.tools@decathlon.com";
  var now                            = new Date(); 
    
  //******************************************************** SHEET DEFINITION
  var document                       = SpreadsheetApp.getActive();
  var mySheetList                    = document.getSheetByName("AdminRightsRequests");
  var requestUserList                = mySheetList.getDataRange().getValues();

  //******************************************************** FOR LOOP
  for (var i=1; i < requestUserList.length; i++) {
    var row                   = requestUserList[i];
    var doneTimestamp         = row[8];

     if (doneTimestamp == ''){ 
       
       //******************************************************** GET LOCAL VARIABLE 
       var userEmail             = row[1];
       Logger.log(userEmail); 
       var branch                = getBranch(userEmail,token);
       var requestedCounties     = row[4];
       var country               = getCountry(userEmail,token);
       var specificOrgsRights    = row[3];	
       var allOrgsRights         = row[5]; 	
       var status                = row[6];
       
       //******************************************************** CHECK VALIDATION
       var checkCountry;
        if (country==requestedCounties) { checkCountry    = "Passed"; } 
          else { checkCountry    = "Failed"; }

       var checkBranch;
         if (branch=="informationSystem") { checkBranch   = "Passed"; } 
          else {  checkBranch    = "Failed"; }

       //******************************************************** AUTOMATIC RIGHTS
       if (checkBranch == "Passed" && checkCountry == "Passed"){
         try {setAdminRights(userEmail,requestedCounties,specificOrgsRights,token); 
              GmailApp.sendEmail(userEmail, "Admin Rights Available", "Hello,\n\nI well granted your access to the following admin right you asked for on your country.\n\nI advise you to follow the trainig on that website (https://www.coursera.org/specializations/g-suite-administration#courses) and to follow contents published on our website (https://sites.google.com/decathlon.com/g-co-en/by-topic/quality).\n\nBest Regards");
              mySheetList.getRange(i+1,9).setValue(now);} 
           catch (e) {}
       } 
       
       //******************************************************** VALIDATED RIGHTS
       var emailSendDate         = row[7];
       if (emailSendDate != "" && status == "Accepted") {
         if (allOrgsRights != "" ) {            
           try {setAdminRights(userEmail,requestedCounties,specificOrgsRights,token);
                setAdminRightsAllOrgs(userEmail,allOrgsRights,token);
                GmailApp.sendEmail(userEmail, "Admin Rights Available", "Hello,\n\nI well granted your access to the following admin right you asked for on several countries and/or domain wide.\n\nI strongly recommend you to follow the trainig on that website (https://www.coursera.org/specializations/g-suite-administration#courses) and to follow contents published on our website (https://sites.google.com/decathlon.com/g-co-en/by-topic/quality).\n\nBest Regards");
                mySheetList.getRange(i+1,9).setValue(now);} 
             catch (e) {}   
         }  
       }  
       
       //******************************************************** NOTIFICATION AUTOMATION
       if (emailSendDate == "") {

         if (checkCountry == "Failed" | checkBranch == "Failed" | allOrgsRights != "" ) {
           GmailApp.sendEmail(adminEmail, "Admin Rights to validate", "Hello,\n\nThere are some rights to validate for "+userEmail+" working in "+branch+".\n\nIn order to grant the admin right requested please visit this page : https://docs.google.com/spreadsheets/d/19gz6Q88accjXvJBJNsgy5C-5er7_YXBGnp1Q6f-A9-Y/. You can find the whole process/criterias of validation in our website (https://sites.google.com/decathlon.com/g-co-en/by-topic/quality/of-subsidiarity#h.p_W1Sqrf-ABY-q).\n\nBest Regards");         
           mySheetList.getRange(i+1,8).setValue(now);
         }
       }
       
       
    } 
  }
}