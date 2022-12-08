//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    let UID = window.location.href.substring(window.location.href.lastIndexOf('#') + 1);
    //alert(UID);
    queryUser(UID);
    grabUserType(UID);
});

//Following set of functions queries user to pull all info for a user
function queryUser(UID){ //Function queries whole row from user table for target userid 
	runPHP("getuser.php", {"userid":UID}, grabUserInfo, alert);
}

function grabUserInfo(userInfo){
	parsed = JSON.parse(userInfo)[0];

    let UID = parsed["userid"];
	document.getElementById("UID_Box").value = UID;

	let FName = parsed["firstname"];
	document.getElementById("FName_Box").value = FName;

	let LName = parsed["lastname"];
	document.getElementById("LName_Box").value = LName;

	let PhoneNum = parsed["phone"];
	document.getElementById("PhoneNum_Box").value = PhoneNum;

	let Username = parsed["username"];
	document.getElementById("Username_Box").value = Username;

	let Pwd = parsed["passphrase"];
	document.getElementById("Pwd_Box").value = Pwd;

	let Usertype = parsed["usertype"];
	document.getElementById("Usertype_Box").value = Usertype;
    
    if(Usertype === "p"){
        extraPatientQuery(UID);
    }

    if(Usertype === "d"){
        extraDoctorQuery(UID);
    }

    if(Usertype === "a"){
        extraAdminQuery(UID);
    }
}


//Following set of functions queries the extra patient data
function extraPatientQuery(UID){
    runPHP("selectfrompatient.php", {"userid":UID}, patientAddOn, alert);
}

function patientAddOn(addOn){
    parsed = JSON.parse(addOn)[0];
    
    let Street = parsed['street'];
    document.getElementById("Street_Box").value = Street;
    
    let City = parsed['city']
    document.getElementById("City_Box").value = City;
    
    let State = parsed['state'];
    document.getElementById("State_Box").value = State;
    
    let Age = parsed['age'];
    document.getElementById("Age_Box").value = Age;
    
    let Sex = parsed['sex'];
    document.getElementById("Sex_Box").value = Sex;
}


//Following set of Functions queries the extra doctor data
function extraDoctorQuery(UID){
    runPHP("selectfromdoctor.php", {"userid":UID}, doctorAddOn, alert);
}

function doctorAddOn(addOn){
    parsed = JSON.parse(addOn)[0];
    
    let Specialty = parsed['specialty'];
    document.getElementById("Specialty_Box").value = Specialty;
    
    let RoomNum = parsed['roomnum']
    document.getElementById("RoomNum_Box").value = RoomNum;
}


//set of functions display extra info depending on usertype
function grabUserType(UID){
    runPHP("getuser.php", {"userid":UID}, displayExtrasEdit, alert);
}

function displayExtrasEdit(parameter){ 
	parsed = JSON.parse(parameter)[0];

	let Usertype = parsed["usertype"]; //Obtain usertype value here
	
	document.getElementById("tableP_Edit").style.display = "none";
	document.getElementById("tableD_Edit").style.display = "none";
	
	if(Usertype == "p"){
		document.getElementById("tableP_Edit").style.display = "block";
	} else if(Usertype == "d"){
		document.getElementById("tableD_Edit").style.display = "block";
	}
}


//Set of functions for saving updates to the database
function saveProfileEdits(){ //Called by "save button", stores text field values as variables and then sends to database
	let UID = document.getElementById("UID_Box").value;
    let FName = document.getElementById("FName_Box").value;
	let LName = document.getElementById("LName_Box").value;
	let PhoneNum = document.getElementById("PhoneNum_Box").value;
	let Username = document.getElementById("Username_Box").value;
	let Pwd = document.getElementById("Pwd_Box").value;

    let Usertype = document.getElementById("Usertype_Box").value;
    runPHP("updateuserprofile.php", {"UID":UID, "FName":FName, "LName":LName, "PhoneNum":PhoneNum, "Username":Username, "Pwd":Pwd}, Usertype==="p"?patientUpdateDone:(Usertype==="d"?doctorUpdateDone:otherUpdateDone), alert);
	
}

function patientUpdateDone(parameter){//If patient, update extra fields
   
    let UID = document.getElementById("UID_Box").value;
    let Street = document.getElementById("Street_Box").value;
    let City = document.getElementById("City_Box").value;
    let State = document.getElementById("State_Box").value;
    let Age = document.getElementById("Age_Box").value;
    let Sex = document.getElementById("Sex_Box").value;

    runPHP("updatepatientprofile.php", {"UID":UID, "Street":Street, "City":City, "State":State, "Age":Age, "Sex":Sex}, otherUpdateDone, alert);
    
}

function doctorUpdateDone(parameter){//If doctor, update extra fields
   
    let UID = document.getElementById("UID_Box").value;
    let Specialty = document.getElementById("Specialty_Box").value;
    let RoomNum = document.getElementById("RoomNum_Box").value;

    runPHP("updatedoctorprofile.php", {"UID":UID, "specialty":Specialty, "roomnum":RoomNum}, otherUpdateDone, alert);
    
}

function otherUpdateDone(parameter){//Go back to user profile page
    window.location.replace("usermanage.html"); //Redirect to user profile page
}
