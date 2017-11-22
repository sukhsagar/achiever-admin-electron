const todayDate = new Date();
const thisYear = todayDate.getFullYear();
var toReturn=0,returnTo;
//following is to be changed when running on your platform
const backend = "http://172.17.0.111:3000/"
//year in footer
document.getElementById("thisYear").innerHTML= thisYear;
//fill values in batch drop down list
var batchDropDown = document.getElementById("batch");
var index=0;
for (var yy=thisYear+5;yy>thisYear-6;yy--){
  var thisYearOption = document.createElement('option');
  thisYearOption.innerHTML = yy;
  thisYearOption.value = yy;
  batchDropDown.append(thisYearOption);
}


//function to validate
function validate(){
	var rollNo = document.getElementById("roll_no").value;
	rollNo=rollNo.toUpperCase();
	var firstName = document.getElementById("first_name").value;
	var lastName = document.getElementById("last_name").value;
	var gender = document.getElementById("gender"); //.selectedIndex must not be 0
	var mobileNo = document.getElementById("mobile_no").value;
	var batchLastYear = document.getElementById("batch");
	var degreeClass = document.getElementById("class");
	var file = document.getElementById("displayPicture").files[0];
  var isError = 0;
  $(".error").addClass("no-error");
  if(rollNo===""){
    $("#errorRollNo").removeClass("no-error");
    console.log("roll");
    isError=1;
  }
  if(firstName===""){
    $("#errorFirstName").removeClass("no-error");
    isError=1;
  }
  if(gender.selectedIndex==0){
    $("#errorGender").removeClass("no-error");
    isError=1;
  }
  if(mobileNo==="" || mobileNo.length !=10){
    $("#errorMobileNo").removeClass("no-error");
    isError=1;
  }
  if(batchLastYear.selectedIndex==0){
    $("#errorBatch").removeClass("no-error");
    isError=1;
  }
  if(degreeClass.selectedIndex==0){
    $("#errorClass").removeClass("no-error");
    isError=1;
  }

  var formData={};
  if(!isError){
  	if(file===undefined){
		if(gender.value=="Male"){
			formData =  {
		              "name": firstName + " " + lastName,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "batch":batchLastYear.value,
		              "class": degreeClass.value,
		              "photo": "https://firebasestorage.googleapis.com/v0/b/achiversadminpanel.appspot.com/o/images%2Fmale.jpg?alt=media&token=0ebec19e-3696-4bfe-90f6-dac9ec5b407c",
		              "total_score" : 0
		            };
			firebase.database().ref('users/' + rollNo).set(formData).then(function(){
				alert("User Saved.");
			});
		}
		else if (gender.value=="Female"){
			formData =  {
		              "name": firstName + " " + lastName,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "batch":batchLastYear.value,
		              "class": degreeClass.value,
		              "photo": "https://firebasestorage.googleapis.com/v0/b/achiversadminpanel.appspot.com/o/images%2Ffemale.jpg?alt=media&token=f71d10be-13dd-484e-8559-e57b62f1aa1a",
		              "total_score" : 0
		            };
			firebase.database().ref('users/' + rollNo).set(formData).then(function(){
				alert("User Saved.");
			});
		}
	}
	else{
		var storageRef = firebase.storage().ref();
		var uploadTask = storageRef.child("images/"+rollNo+".jpg").put(file);
		uploadTask.on('state_changed', function(snapshot){
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
	    	},  
	    	function(error) {
			  // Handle unsuccessful uploads
			}, function() {
			  // Handle successful uploads on complete
			  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
		  	var url = uploadTask.snapshot.downloadURL;
		  	formData =  {
		              "name": firstName + " " + lastName,
		              "gender": gender.value,
		              "mobile": mobileNo,
		              "batch":batchLastYear.value,
		              "class": degreeClass.value,
		              "photo": url,
		              "total_score" : 0
		            };
			firebase.database().ref('users/' + rollNo).set(formData).then(function(){
				alert("User Saved.");
			});
		});
	}
	

	//code to return to back page if it has come from one
	if(toReturn){
	  window.location = returnTo;
	}
  }
}

function checkForReturn() {
  var presentURL = window.location.href;
    if (presentURL.indexOf('?') != -1) {
      var queryStr = presentURL.substr(presentURL.indexOf('?'));
      returnTo = queryStr.split("=")[1];
      toReturn=1;
    }
}

function fetchName(){
  let rollNo = document.getElementById("roll_no").value;
  rollNo=rollNo.toUpperCase();
  if(rollNo!="")
	var userRef = firebase.database().ref('users/' + rollNo).once('value', function(snap){
	  if(snap.val()===null){
	    //
	  }
	  else
	    alert("This user has already been added. If you proceed, the score of the user will be set to zero.");
    });
}