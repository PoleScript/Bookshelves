function loadPartialHTML_(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();  
}

function loadHomeView(){
  return loadPartialHTML_("home");
}

function loadPageView(){
  return loadPartialHTML_("page");
}

function loadSearchView(){
  return loadPartialHTML_("search");
}

function loadAddCustomerView(){
  return loadPartialHTML_("addcustomer");
}

function loadEditCustomerView(){
  return loadPartialHTML_("editcustomer");
}

function loadNoAccessView(){
  return loadPartialHTML_("noaccess");
}