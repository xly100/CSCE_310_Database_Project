//This JS file covers functions for both userprofile.html and userprofileedit.html

//Function for calling all functions that are needed to display information once the page loads
window.onload = function loadStuff(){
	displayUserInfo();
	displayExtras();
}

//Functions involved with both pages

function displayUserInfo(){ //Needs to obtain data from user table to display on u_profile and u_profile_edit
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

	//Sets the default text box values for userprofileedit based on the current values
	document.getElementById("UID Box").innerhtml = UID;
	document.getElementById("FName Box").value = FName;
	document.getElementById("LName Box").value = LName;
	document.getElementById("PhoneNum Box").value = PhoneNum;
	document.getElementById("Username Box").value = Username;
	document.getElementById("Pwd Box").value = Pwd;
	document.getElementById("Usertype Box").value = Usertype;
	
	//If the user is a patient, call functions to obtain the current values from the patient table
	if(Usertype = "p"){
		let Street = "Gotham Dr.";
		document.getElementById("Street").innerHTML = Street;
		
		let City = "Houston";
		document.getElementById("City").innerHTML = City;
		
		let State = "Texas";
		document.getElementById("State").innerHTML = State;
		
		let Age = "23";
		document.getElementById("Age").innerHTML = Age;
		
		let Sex = "M";
		document.getElementById("Sex").innerHTML = Sex;

		//Sets the default text box values for userprofileedit based on the current values
		document.getElementById("Street Box").value = Street;
		document.getElementById("City Box").value = City;
		document.getElementById("State Box").value = State;
		document.getElementById("Age Box").value = Age;
		document.getElementById("Sex Box").value = Sex;
	}

	//If the user is a doctor, call functions to obtain the current values from the doctor table
	if(Usertype = "d"){
		let Specialty = "Donk";
		document.getElementById("Specialty").innerHTML = Specialty;
		
		let RoomNum = "Bonk";
		document.getElementById("RoomNum").innerHTML = RoomNum;

		//Doctors do not have an extra table with information they can edit
	}

	
}

//Functions involved only in userprofileedit.html

function saveProfileDetails(){ //Called by "save button", stores text field values as variables and then sends to database
	let FName = document.getElementById("FName Box").value;
	let LName = document.getElementById("LName Box").value;
	let PhoneNum = document.getElementById("PhoneNum Box").value;
	let Username = document.getElementById("Username Box").value;
	let Pwd = document.getElementById("Pwd Box").value;

	
	let Usertype = getUserType();
	if(Usertype = "p"){
		let Street = document.getElementById("Street Box").value;
		let City = document.getElementById("City Box").value;
		let State = document.getElementById("State Box").value;
	}

	//Insert code to update database with above values

	window.location.replace("userprofile.html"); //Redirect to user profile page
}

//Functions involved only in userprofile.html

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