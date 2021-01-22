function doGet() {
  const htmlServ = HtmlService.createTemplateFromFile("index"); 
  return htmlServ.evaluate();
}
/*
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Formulaire');
}
*/