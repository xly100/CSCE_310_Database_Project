//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
	let Usertype = getUserType();

	if(Usertype === "p"){
		queryPatient();
	}
	
	defaultUserInfo();
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

//Obtains data from user table to display on userprofileedit
function defaultUserInfo(){ 
	//All of these statements call a function from common.js to obtain the current user table values and set them to variables that can be used by the html pages
	let UID = getUserId();
	document.getElementById("UID_Box").value = UID;
	
	let FName = getUserFName();
	document.getElementById("FName_Box").value = FName;
	
	let LName = getUserLName();
	document.getElementById("LName_Box").value = LName;
	
	let PhoneNum = getUserPhone();
	document.getElementById("PhoneNum_Box").value = PhoneNum;
	
	let Username = getUsername();
	document.getElementById("Username_Box").value = Username;
	
	let Pwd = getPassword();
	document.getElementById("Pwd_Box").value = Pwd;
	
	let Usertype = getUserType();
	document.getElementById("Usertype_Box").value = Usertype;
}

function saveProfileDetails(){ //Called by "save button", stores text field values as variables and then sends to database
	let FName = document.getElementById("FName_Box").value;
	let LName = document.getElementById("LName_Box").value;
	let PhoneNum = document.getElementById("PhoneNum_Box").value;
	let Username = document.getElementById("Username_Box").value;
	let Pwd = document.getElementById("Pwd_Box").value;

	
	let Usertype = getUserType();
	if(Usertype === "p"){
		let Street = document.getElementById("Street_Box").value;
		let City = document.getElementById("City_Box").value;
		let State = document.getElementById("State_Box").value;
	}

	//Insert code to update database with above values

	window.location.replace("userprofile.html"); //Redirect to user profile page
}

function displayExtras(){ //Displays extra info depending on usertype
	
	let Usertype = getUserType(); //Obtain usertype value here
	
	document.getElementById("tableP_Edit").style.display = "none";
	
	if(Usertype == "p"){
		document.getElementById("tableP_Edit").style.display = "block";
	}
}