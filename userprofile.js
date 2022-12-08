//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
	let Usertype = getUserType();

	if(Usertype === "p"){
		queryPatient();
	}

	if(Usertype === "d"){
		queryDoctor();
	}

	if(Usertype === "a"){
		queryAdmin();
	}

	displayExtras();
});


//Following set of functions queries patient_view to pull all info for a patient
function queryPatient(){ //Function queries whole row from patient table for target userid
	let UID = getUserId(); 
	runPHP("selectfrompatient.php", {"userid":UID}, retrievePatientInfo, alert);
}

function retrievePatientInfo(patientInfo){
	//All of these statements call a function from common.js to obtain the current user table values and set them to variables that can be used by the html pages
	parsed = JSON.parse(patientInfo)[0];
	
	let UID = parsed["userid"];
	document.getElementById("UID").innerHTML = UID;

	let FName = parsed["firstname"];
	document.getElementById("FName").innerHTML = FName;

	let LName = parsed["lastname"];
	document.getElementById("LName").innerHTML = LName;

	let PhoneNum = parsed["phone"];
	document.getElementById("PhoneNum").innerHTML = PhoneNum;

	let Username = parsed["username"];
	document.getElementById("Username").innerHTML = Username;

	let Pwd = parsed["passphrase"];
	document.getElementById("Pwd").innerHTML = Pwd;

	let Usertype = "p";
	document.getElementById("Usertype").innerHTML = Usertype;

    let Street = parsed['street'];
    document.getElementById("Street").innerHTML = Street;
    
    let City = parsed['city']
    document.getElementById("City").innerHTML = City;
    
    let State = parsed['state'];
    document.getElementById("State").innerHTML = State;
    
    let Age = parsed['age'];
    document.getElementById("Age").innerHTML = Age;
    
    let Sex = parsed['sex'];
    document.getElementById("Sex").innerHTML = Sex;
}


//Following set of functions queries doctor_view to pull all info for a doctor
function queryDoctor(){ //Function queries whole row from doctor table for target userid
	let UID = getUserId(); 
	runPHP("selectfromdoctor.php", {"userid":UID}, retrieveDoctorInfo, alert);
}

function retrieveDoctorInfo(doctorInfo){
	parsed = JSON.parse(doctorInfo)[0];

	let UID = parsed["userid"];
	document.getElementById("UID").innerHTML = UID;

	let FName = parsed["firstname"];
	document.getElementById("FName").innerHTML = FName;

	let LName = parsed["lastname"];
	document.getElementById("LName").innerHTML = LName;

	let PhoneNum = parsed["phone"];
	document.getElementById("PhoneNum").innerHTML = PhoneNum;

	let Username = parsed["username"];
	document.getElementById("Username").innerHTML = Username;

	let Pwd = parsed["passphrase"];
	document.getElementById("Pwd").innerHTML = Pwd;

	let Usertype = "d";
	document.getElementById("Usertype").innerHTML = Usertype;

    let Specialty = parsed['specialty'];
    document.getElementById("Specialty").innerHTML = Specialty;
    
    let RoomNum = parsed['roomnum']
    document.getElementById("RoomNum").innerHTML = RoomNum;
}


//Following set of functions queries user to pull all info for an admin
function queryAdmin(){ //Function queries whole row from user table for target userid
	let UID = getUserId(); 
	runPHP("adminedituser.php", {"userid":UID}, retrieveAdminInfo, alert);
}

function retrieveAdminInfo(adminInfo){
	parsed = JSON.parse(adminInfo)[0];

	let UID = parsed["userid"];
	document.getElementById("UID").innerHTML = UID;

	let FName = parsed["firstname"];
	document.getElementById("FName").innerHTML = FName;

	let LName = parsed["lastname"];
	document.getElementById("LName").innerHTML = LName;

	let PhoneNum = parsed["phone"];
	document.getElementById("PhoneNum").innerHTML = PhoneNum;

	let Username = parsed["username"];
	document.getElementById("Username").innerHTML = Username;

	let Pwd = parsed["passphrase"];
	document.getElementById("Pwd").innerHTML = Pwd;

	let Usertype = "a";
	document.getElementById("Usertype").innerHTML = Usertype;
}


function displayExtras(){ //Displays extra info depending on usertype
	
	let Usertype = getUserType(); //Obtain usertype value here
	
	document.getElementById("tableP").style.display = "none";
	document.getElementById("tableD").style.display = "none";
	
	if(Usertype == "p"){
		document.getElementById("tableP").style.display = "block";
	} else if(Usertype == "d"){
		document.getElementById("tableD").style.display = "block";
	}
}


