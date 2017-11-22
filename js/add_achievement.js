const todayDate = new Date();
const thisYear = todayDate.getFullYear();
//year in footer
document.getElementById("thisYear").innerHTML= thisYear;
let isTeamAchievement = false;
//on individual achievement entry
function setSingle(){
  isTeamAchievement = false;
}

//on individual achievement entry
function setTeam(){
  isTeamAchievement = true;
}

//createTeamInput
function createTeamInput(){
  let size = document.getElementById("teamSize").value;
  if(size == 1 || size ==0){
    alert("Team must contain atleast 2 members.\n\nElse Save details in individual Achievement");
  }
  else {
    var myNode = document.getElementById("teamRollno");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    for(var i=0;i<size;i++){
      var divElement = document.createElement('div');
      divElement.setAttribute('class',"form-group");
      var labelElement = document.createElement('label');
      labelElement.innerHTML = "Team Member "+(i+1);
      labelElement.setAttribute('for',"t_"+i);
      var rollnoElement = document.createElement("input");
      rollnoElement.type = "text";
      rollnoElement.setAttribute('class',"form-control");
      rollnoElement.id = "t_"+i;
      rollnoElement.placeholder = "Member "+ (i+1) +"'s roll no";
      var inputTag = document.createElement("div");
      inputTag.setAttribute('class',"form-group");
      inputTag.innerHTML = "<input type = 'button' class='btn btn-success' value = 'Get Name' onClick = 'fetchMemberName("+i+")'>";
      var nameElement = document.createElement("label");
      nameElement.id = "name_"+i;
      var errorElement = document.createElement('span');
      errorElement.setAttribute('class',"error no-error");
      errorElement.id = "error_"+i;
      divElement.append(labelElement);
      divElement.append(rollnoElement);
      divElement.appendChild(inputTag);
      divElement.append(nameElement);
      divElement.append(errorElement);

      document.getElementById("teamRollno").append(divElement);
      var line = document.createElement('hr');
      document.getElementById("teamRollno").append(line);
    }
  }
}

function fillYear(){
  var yearDropDown = document.getElementById("year");
  for (var yy=thisYear;yy>thisYear-6;yy--){
    var thisYearOption = document.createElement('option');
    thisYearOption.innerHTML = yy;
    thisYearOption.value = yy;
    yearDropDown.append(thisYearOption);
  }
  if(yearDropDown.selectedIndex!=0){
    emptyMonth();
    fillMonth();
  }
}
function emptyMonth(){
  var monthDropDown = document.getElementById("month");
  monthDropDown.innerHTML=" ";
  var thisMonthOption = document.createElement('option');
  thisMonthOption.innerHTML = "Select Month";
  thisMonthOption.value = "select";
  monthDropDown.append(thisMonthOption);
}
function fillMonth(){
  let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const thisMonth = todayDate.getMonth();
  var monthDropDown = document.getElementById("month");
  if(monthDropDown.childElementCount>1){
    emptyMonth();
  }
  let yyyy = document.getElementById("year").value;
  let sem = document.getElementById("semester").selectedIndex;
  let startFrom;
  let endAt;
  if (yyyy<thisYear) { // all months to be displayed
    if(sem==1) { // even semester jan-jun
      startFrom=0;
      endAt=5;
    }
    if(sem==2) { // odd semester jul-dec
      startFrom=6;
      endAt=11;
    }
  }
  if(yyyy==thisYear) {
    if (sem==1) {
      startFrom=0;
      if(thisMonth>=5){
        endAt=5;
      }
      else{
        endAt=thisMonth;
      }
    }
    if (sem==2) {
      startFrom=6;
      endAt=thisMonth;
    }
  }

  for (var mm=startFrom;mm<=endAt;mm++){
    var thisMonthOption = document.createElement('option');
    thisMonthOption.innerHTML = monthNames[mm];
    if(mm<10){
      thisMonthOption.value = "0"+ mm.toString();
    }
    else {
      thisMonthOption.value = mm;
    }
    monthDropDown.append(thisMonthOption);
  }

}

function toggleEventDetail() {
  // var eventType = document.singleAchievement.positionHolder.selectedIndex;
  var eventType = document.getElementById("positionHolder").selectedIndex;
  if(eventType==1) { //competition
    document.getElementById("competition").style="display:block";
    document.getElementById("otherEvent").style="display:none";
  }
  if(eventType==2) { //otherEvent
    document.getElementById("otherEvent").style="display:block";
    document.getElementById("competition").style="display:none";
  }
}



//function to validate
function validate(){
  $(".error").addClass("no-error");
  let isError = 0;
  let rollNo = document.getElementById("roll_no").value;
  rollNo=rollNo.toUpperCase();
  let category = document.getElementById("category"); //.selectedIndex must not be 0
  let semester = document.getElementById("semester"); //.selectedIndex must not be 0
  let year = document.getElementById("year"); //.selectedIndex must not be 0
  let month = document.getElementById("month"); //.selectedIndex must not be 0
  var desc = document.getElementById("description").value;
  var positionHolder = document.getElementById("positionHolder"); //.selectedIndex must not be 0
  var eventLevel = document.getElementById("level");  //.selectedIndex must not be 0
  var eventPosition = document.getElementById("position");  //.selectedIndex must not be 0
  var eventType = document.getElementById("eventType");  //.selectedIndex must not be 0

  if(rollNo===""){
    if(isTeamAchievement===false){
      $("#errorRollNo").removeClass("no-error");
    isError=1;
    }
  }
  if(category.selectedIndex == 0) {
    $("#errorCategory").removeClass("no-error");
    isError=1;
  }
  if(semester.selectedIndex == 0) {
    $("#errorSem").removeClass("no-error");
    isError=1;
  }
  if(year.selectedIndex == 0) {
    $("#errorYear").removeClass("no-error");
    isError=1;
  }
  if(month.selectedIndex == 0) {
    $("#errorMonth").removeClass("no-error");
    isError=1;
  }
  if(desc ==="") {
    $("#errorDesc").removeClass("no-error");
    isError=1;
  }

  if(positionHolder.selectedIndex==0){
    $("#errorPositionHolder").removeClass("no-error");
    isError=1;
  }
  if(positionHolder.selectedIndex==1) {
    if(eventLevel.selectedIndex==0){
      $("#errorLevel").removeClass("no-error");
      isError=1;
    }
    if(eventPosition.selectedIndex==0) {
      $("#errorPosition").removeClass("no-error");
      isError=1;
    }
  }
  if(positionHolder.selectedIndex==2){
    if(eventType.selectedIndex==0) {
      $("#errorEventTyp").removeClass("no-error");
      isError=1;
    }
  }

  if(!isError){ // no validation breeched
    var name = document.getElementById("name").innerHTML;
    //Finding the session.
    let year_numeric = parseInt(year.value);
    var session = "";
    if(semester.value=="O"){
      session=session=(year_numeric)+"-"+(year_numeric+1);
    }
    else if(semester.value=="E"){
      session=session=(year_numeric-1)+"-"+(year_numeric);
    }


  //Calculating the score.
    var score = 0;
    if(positionHolder.selectedIndex==2){
      if(eventType.value=="1"){
        score=20;
      }
      else if(eventType.value=="1"){
        score=10;
      }
      else if(eventType.value=="2"){
        score=15;
      }
      else if(eventType.value=="3"){
        score=5;
      }
      else if(eventType.value=="4"){
        score=10;
      }
      else if(eventType.value=="5"){
        score=4;
      }
      else if(eventType.value=="6" || eventType.value=="8"){
        score=2;
      }
      else if(eventType.value=="7" || eventType.value=="8"){
        score=7;
      }
      else if(eventType.value=="9"){
        score=30;
      }
      else if(eventType.value=="9"){
        score=5;
      }
    }
    else if(positionHolder.selectedIndex==1) {
      if (category.value=="T"){
        if (eventLevel.value=="1"){
          if (eventPosition.value=="1")
            score = 20;
          else if (eventPosition.value=="2")
            score = 10;
          else if(eventPosition.value=="3")
            score = 5;
        }
        else if (eventLevel.value=="2"){
          if (eventPosition.value=="1")
            score = 40;
          else if (eventPosition.value=="2")
            score = 20;
          else if(eventPosition.value=="3")
            score = 10;
        }
        else if (eventLevel.value=="3"){
          if (eventPosition.value=="1")
            score = 50;
          else if (eventPosition.value=="2")
            score = 30;
          else if(eventPosition.value=="3")
            score = 20;
        }
      }
        
      else if (category.value=="NT"){
        if (eventLevel.value=="1"){
          if (eventPosition.value=="1")
            score = 10;
          else if (eventPosition.value=="2")
            score = 5;
          else if(eventPosition.value=="3")
            score = 3;
        }
        else if (eventLevel.value=="2"){
          if (eventPosition.value=="1")
            score = 20;
          else if (eventPosition.value=="2")
            score = 10;
          else if(eventPosition.value=="3")
            score = 5;
        }
        else if (eventLevel.value=="3"){
          if (eventPosition.value=="1")
            score = 30;
          else if (eventPosition.value=="2")
            score = 20;
          else if(eventPosition.value=="3")
            score = 15;
        }
      }
    }

    var oldScore = 0;
    if(isTeamAchievement===false){
      firebase.database().ref('users/'+rollNo+'/photo').once('value',function(urlSnapshot){}).then(function(urlSnapshot) {
        var formData = {
          teamEvent: false,
          rollNo:rollNo,
          photo: urlSnapshot.val(),
          name: name,
          category:category.value,
          semester:semester.value,
          year:year.value,
          month:month.value,
          desc:desc,
          positionHolder:positionHolder.value,
          eventLevel:eventLevel.value,
          eventPosition:eventPosition.value,
          eventType:eventType.value,
          session: session,
          score: score
        }

        firebase.database().ref('achievements/' + year.value+"_"+month.value).push(formData).then(function(Response){
              firebase.database().ref('user_achievements/' + rollNo+'/'+Response.key).set({desc: desc, score:score, category:category.value, month:month.value, year:year.value, teamEvent:false }).then(function(){
                firebase.database().ref('leaderboard/'+session+'/'+rollNo).once('value', function(snap){
                  if(snap.val()===null){
                    firebase.database().ref('leaderboard/'+session+'/'+rollNo).set(score).then(function(){
                      firebase.database().ref('users/' + rollNo).once('value', function(snap){
                        oldScore = parseInt(snap.val().total_score);
                        // firebase.database().ref().update({['users/' + rollNo+'/total_score']=snap.val().score+score;});
                        firebase.database().ref('users/'+rollNo+'/total_score').set(oldScore+score);
                      });
                      alert("Achievement Added.")
                    });
                  }
                  else{
                    firebase.database().ref('leaderboard/'+session+'/' + rollNo).once('value', function(snap){
                      oldScore = parseInt(snap.val());
                      // firebase.database().ref().update({[session+'/' + rollNo+'/score']=snap.val().score+score;});
                      firebase.database().ref('leaderboard/'+session+'/'+rollNo).set(oldScore+score);
                    });
                    firebase.database().ref('users/' + rollNo).once('value', function(snap){
                      oldScore = parseInt(snap.val().total_score);
                      // firebase.database().ref().update({['users/' + rollNo+'/total_score']=snap.val().score+score});
                      firebase.database().ref('users/'+rollNo+'/total_score').set(oldScore+score);
                    });
                    alert("Achievement Added.")
                  }
                });
              });
          });
      });
      
    }
    else if(isTeamAchievement===true){
      var users={};
      let team_size = document.getElementById("teamSize").value;
      for(var i =0;i<team_size;i++){
        users[i]={rollNo:document.getElementById("t_"+i).value.toUpperCase(), name:document.getElementById("name_"+i).innerHTML};
      }
      firebase.storage().ref().child("images/team.jpg").getDownloadURL().then(function(url) {
       var formData = {
          teamEvent: true,
          teamMembers:users,
          photo: url,
          category:category.value,
          semester:semester.value,
          year:year.value,
          month:month.value,
          desc:desc,
          positionHolder:positionHolder.value,
          eventLevel:eventLevel.value,
          eventPosition:eventPosition.value,
          eventType:eventType.value,
          session: session,
          score: score,
          teamSize: team_size
        };
        let currRollNo = "";
        let currName = "";
        firebase.database().ref('achievements/' + year.value+"_"+month.value).push(formData).then(function(Response){
          firebase.database().ref('achievements'+'/' + year.value+"_"+month.value+'/'+Response.key+'/teamMembers').once('value', function(snap){
            // var team_members = snap.val().teamMembers;
            for(i=0;i<team_size;i++){
              // currRollNo=snap.val()[i].rollNo;
              // currName=snap.val()[i].name;
              submitData(snap.val()[i].rollNo,snap.val()[i].name,session,desc,score,Response,category,year,month);
              }
          });  
        });
      });
    }
  }

}

function submitData(currRollNo,currName,session,desc,score,Response,category,year,month){
  // firebase.storage().ref().child("images/"+currRollNo+".jpg").getDownloadURL().then(function(url) {
  firebase.database().ref('users/'+currRollNo+'/photo').once('value',function(urlSnapshot){}).then(function(urlSnapshot){
                firebase.database().ref('user_achievements/' + currRollNo+'/'+Response.key).set({desc: desc, score:score, category:category.value, month:month.value, year:year.value, teamEvent:true}).then(function(){
                  firebase.database().ref('leaderboard/'+session+'/' + currRollNo).once('value', function(snap){
                    if(snap.val()===null){
                      firebase.database().ref('leaderboard/'+session+'/'+currRollNo).set(score).then(function(){
                        firebase.database().ref('users/' + currRollNo).once('value', function(snap){
                          oldScore = parseInt(snap.val().total_score);
                          // firebase.database().ref().update({['users/' + rollNo+'/total_score']=snap.val().score+score;});
                          firebase.database().ref('users/'+currRollNo+'/total_score').set(oldScore+score).then(function(){
                            alert("Achievement Added for the student."+currRollNo);
                            });
                        });
                      });

                    }
                    else{
                      firebase.database().ref('leaderboard/'+session+'/' + currRollNo).once('value', function(snap){
                        oldScore = parseInt(snap.val());
                        // firebase.database().ref().update({[session+'/' + rollNo+'/score']=snap.val().score+score;});
                        firebase.database().ref('leaderboard/'+session+'/'+currRollNo).set(oldScore+score);
                      });
                      firebase.database().ref('users/' + currRollNo).once('value', function(snap){
                        oldScore = parseInt(snap.val().total_score);
                        // firebase.database().ref().update({['users/' + rollNo+'/total_score']=snap.val().score+score});
                        firebase.database().ref('users/'+currRollNo+'/total_score').set(oldScore+score).then(function(){
                          alert("Achievement Added for the student."+currRollNo);
                        });
                      });
                    }
                  });
                });
                });
}


function fetchName(){
  let rollNo = document.getElementById("roll_no").value;
  rollNo=rollNo.toUpperCase();
  if(rollNo === ""){
    alert("Roll No field can't be empty in order to get name");
  }
  else {
    var userRef = firebase.database().ref('users/' + rollNo).once('value', function(snap){
      if(snap.val()===null){
        alert("Record for roll number "+rollNo+" is not present.\nPlease enter details for this student prior to his/her achievement");
        // window.location="add_achiever.html?return=add_achievement.html"
      }
      else
        document.getElementById("name").innerHTML = snap.val().name;
    });
  }
}

function fetchMemberName(i){
  let rollId = "t_"+i;
  let nameId = "name_"+i;
  let rollNo = document.getElementById(rollId).value;
  rollNo=rollNo.toUpperCase();
  if(rollNo === "") {
    alert("Roll No for member "+(i+1)+" can't be empty in order to get name");
  }
  else {
    var userRef = firebase.database().ref('users/' + rollNo).once('value', function(snap){
      if(snap.val()===null){
        alert("Record for roll number "+rollNo+" is not present.\nPlease enter details for this student prior to his/her achievement");
      }
      else
        document.getElementById(nameId).innerHTML = snap.val().name;
    });
  }

}