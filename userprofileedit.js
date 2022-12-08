//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
	let Usertype = getUserType();

	if(Usertype === "p"){
		queryPatient();
	}

    if(Usertype === "d"){
		queryDoctor();
	}

	displayExtras();
});


//Following set of functions queries patient_view to pull all info for a patient
function queryPatient(){ //Function queries whole row from patient table for target userid
	let UID = getUserId(); 
	runPHP("selectfrompatient.php", {"userid":UID}, retrievePatientInfo, alert);
}

function retrievePatientInfo(patientInfo){
	parsed = JSON.parse(patientInfo)[0];

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

	let Usertype = "p";
	document.getElementById("Usertype_Box").value = Usertype;
    
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


//Following set of functions queries doctor_view to pull all info for a doctor
function queryDoctor(){ //Function queries whole row from doctor table for target userid
	let UID = getUserId(); 
	runPHP("selectfromdoctor.php", {"userid":UID}, retrieveDoctorInfo, alert);
}

function retrieveDoctorInfo(doctorInfo){
	parsed = JSON.parse(doctorInfo)[0];

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

	let Usertype = "d";
	document.getElementById("Usertype_Box").value = Usertype;
}

function saveProfileDetails(){ //Called by "save button", stores text field values as variables and then sends to database
	let UID = document.getElementById("UID_Box").value;
    let FName = document.getElementById("FName_Box").value;
    //alert(FName);
	let LName = document.getElementById("LName_Box").value;
	let PhoneNum = document.getElementById("PhoneNum_Box").value;
	let Username = document.getElementById("Username_Box").value;
	let Pwd = document.getElementById("Pwd_Box").value;

    runPHP("updateuserprofile.php", {"UID":UID, "FName":FName, "LName":LName, "PhoneNum":PhoneNum, "Username":Username, "Pwd":Pwd}, console.log(), alert);

	
	let Usertype = getUserType();
	if(Usertype === "p"){
		let Street = document.getElementById("Street_Box").value;
		let City = document.getElementById("City_Box").value;
		let State = document.getElementById("State_Box").value;

        runPHP("updatepatientprofile.php", {"UID":UID, "Street":Street, "City":City, "State":State}, console.log(), alert);
	}

    setTimeout(function () {}, 1000);
	window.location.replace("userprofile.html"); //Redirect to user profile page
}

function displayExtras(){ //Displays extra info depending on usertype
	
	let Usertype = getUserType(); //Obtain usertype value here
	
	document.getElementById("tableP_Edit").style.display = "none";
	
	if(Usertype == "p"){
		document.getElementById("tableP_Edit").style.display = "block";
	}
}