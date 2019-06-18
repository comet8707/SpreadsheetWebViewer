var imageLogo = DriveApp.getFileById('1HOUBFBGYLfUM6_HhKlBqS9mwXgrCj_ow').getBlob();


var ss = SpreadsheetApp.openById('1eGZpemXTK5a9H6m1ZV3S92mM_eLYCHvsb6zcwO_nV_A');
var sheet = ss.getSheetByName('2.Team General Information');
var sheet2 = ss.getSheetByName('1. Member General Information');
var str;


//get specific cell's Data
function getInfoData (col,num) {

  var infoData = sheet.getRange(String(col+num)).getValue();

  return infoData;
}


//make an array includes needed a company infomation
function GetCompanyinfo (num) {

  var problem = getInfoData('R',num);
  var underlyingTech = getInfoData('AF',num);
  var target = getInfoData('T',num);
  var link = getInfoData('C',num);
  var foundDate = getInfoData('K',num);
  var supervisor = getInfoData('BP',num);

  if (foundDate !="(Not Provided)"){

   foundDate = Utilities.formatDate(foundDate, "GMT", "yyyy-MM-dd");
  }

  else {foundDate = "Not Provided";}

  var comInfo = {problems:problem,underlyingTechs:underlyingTech,targets:target,links:link,foundDates:foundDate, supervisors: supervisor};


return comInfo;

}



//get a column's Data from the sheets

function getData(n) {

  var dataRange = sheet.getRange(n+'2:'+n+sheet.getLastRow());
 var datas = dataRange.getValues().toString().split(',');

return datas;
}

// make a list of all Companies from  the sheets
function getListofCompany () {

var names = getData('I');
var valiDationData =  getData('BK');
var dateData = getData('K');


var dic = names.map(function (x, i) {
  return {name: x, validation: valiDationData[i], row: i+2, show : "visible"};
                      });


  var listOfGraduated = dic.filter(function(a)
  {
  return a.validation == "Graduated";
});
  var listOfIboostzone = dic.filter(function(a)
  {
  return a.validation != "Graduated";


});


  var listofAll = listOfIboostzone.concat(listOfGraduated);


  return listofAll;
}


function getMemberinfo(name){
  var teamName = name
  var index = filter(teamName);
  var teamMembers = getMembersByTeamName(index);

 // var temp = teamMembers[0][0][1];
  //var secondIndex = temp.length;

  var stop = 0;

  return teamMembers;
}

function getTeamName(){
  var teamNameDataRange = sheet.getRange(2, 9, sheet.getLastRow(), 1);
  var teamName = teamNameDataRange.getValues();

  return teamName;
}

function getTeamId(){

  var teamIdDataRange = sheet.getRange(2, 4, sheet.getLastRow(), 1);
  var teamId = teamIdDataRange.getValues();

  return teamId;
}

function getMembers(){
  var memberFirstNameDataRange = sheet2.getRange(2,5,sheet2.getLastRow(), 1);
  var memberFirstName = memberFirstNameDataRange.getValues();
  var memberLastNameDataRange = sheet2.getRange(2, 6, sheet2.getLastRow(), 1);
  var memberLastName = memberLastNameDataRange.getValues();
  var memberFullName = [];

  for(var j=0; j<memberFirstName.length; j++){
    memberFullName[j] = memberFirstName[j] + " " + memberLastName[j];
  }

  return memberFirstName;
}

function getMembersTeamId(){
  var membersTeamIdDataRange = sheet2.getRange(2, 4, sheet2.getLastRow(), 1);
  var membersTeamId = membersTeamIdDataRange.getValues();

  return membersTeamId;
}

function getMembersTeamName(){
  var membersTeamNameDataRange = sheet2.getRange(2, 14, sheet2.getLastRow(), 1);
  var membersTeamName = membersTeamNameDataRange.getValues();

  return membersTeamName;
}

function getMemberNameWithTeamName(){
  var memberNameWithTeamName = [];

  memberNameWithTeamName.push({
    key: getMembersTeamName(),
    value: getMembers()
  });

  return memberNameWithTeamName;
}

function filter(value){
  var dict = getMemberNameWithTeamName();
  var index = [];
  var indexFlag = 0;
  var i = 0;
  for(var j=0; j<= dict[0].key.length; j++){
    if(dict[0].key[j] == value){
      index[indexFlag] = j+2;
      indexFlag++;
    }
  }

  var test = index;

  return index;
}


function getMembersByTeamName(index){
  var memberDataRange = [];
  var memberData = [];
  for(j=0; j<index.length; j++){
     memberDataRange[j] = sheet2.getRange(index[j], 2, 1, 11);
     memberData[j] = memberDataRange[j].getValues().toString().split(",");
  }
  var stop= 0;

  return memberData;

}

function isFounder(){

  var memberDataRange = sheet2.getRange(2, 2, sheet2.getLastRow(), 13);
  var memberData = memberDataRange.getValues();
  var founderOnly = [];

  var stop = 0;
  for(var j = 0; j < memberData.length; j++){
    if(memberData[j][7] == "Founder or Co-Founder"){
      founderOnly.push(memberData[j]);
    }
  }

  return founderOnly;

}

function searchByMemberName(name){
  //var name = "Adam";
  var gotName = String(name).toLowerCase();
  var memberDataRange = sheet2.getRange(2, 2, sheet2.getLastRow(), 13);
  var memberData = memberDataRange.getValues();
  var dataFound = [];
  var rows = [];
  var index = 0;

  for(var j = 0; j < memberData.length; j++){
    if(memberData[j][3].toLowerCase() == gotName){
      dataFound.push(memberData[j]);
      index++;
    }
  }

  for(var k = 0; k < dataFound.length; k++){
    rows.push(getCompanyRowByCode(dataFound[k][2]));
  }


  //var stop = 0;

  return rows;

}

function getCompanyRowByCode(code){

  var teamCodeDataRange = sheet.getRange(2,4,sheet.getLastRow(), 1);
  var teamCodeData = teamCodeDataRange.getValues();
  var codeFoundRow = [];

  for(var j=0; j < teamCodeData.length; j++){
    if(teamCodeData[j] == code){
      codeFoundRow = j+2;
    }
  }

  var stop = 0;

  return codeFoundRow;
}
