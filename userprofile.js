//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
	let Usertype = getUserType();

	if(Usertype === "p"){
		queryPatient();
	}

	if(Usertype === "d"){
		queryDoctor();
	}
	
	displayUserInfo();
	displayExtras();
});


//Following set of functions queries patient_view to pull all info for a patient
function queryPatient(){ //Function queries whole row from patient table for target userid
	let UID = getUserId(); 
	runPHP("selectfrompatient.php", {"userid":UID}, retrievePatientInfo, alert);
}

function retrievePatientInfo(patientInfo){
	parsed = JSON.parse(patientInfo)[0];

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

    let Specialty = parsed['specialty'];
    document.getElementById("Specialty").innerHTML = Specialty;
    
    let RoomNum = parsed['roomnum']
    document.getElementById("RoomNum").innerHTML = RoomNum;
}


//Obtains data from user table to display on userprofile
function displayUserInfo(){ 
	//All of these statements call a function from common.js to obtain the current user table values and set them to variables that can be used by the html pages
	let UID = getUserId();
	document.getElementById("UID").innerHTML = UID;
	
	let FName = getUserFName();
	document.getElementById("FName").innerHTML = FName;
	
	let LName = getUserLName();
	document.getElementById("LName").innerHTML = LName;
	
	let PhoneNum = getUserPhone();
	document.getElementById("PhoneNum").innerHTML = PhoneNum;
	
	let Username = getUsername();
	document.getElementById("Username").innerHTML = Username;
	
	let Pwd = getPassword();
	document.getElementById("Pwd").innerHTML = Pwd;
	
	let Usertype = getUserType();
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


