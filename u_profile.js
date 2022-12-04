window.onload = function loadStuff(){
	getUserInfo();
	displayExtras();
}

function getUserInfo(){ //Needs to obtain data from user table to display on u_profile and u_profile_edit
	let UID = "5"; //Change lines like this to obtain Database values
	document.getElementById("UID").innerHTML = UID;
	
	let FName = "Bruce";
	document.getElementById("FName").innerHTML = FName;
	
	let LName = "Kent";
	document.getElementById("LName").innerHTML = LName;
	
	let PhoneNum = "8329087914";
	document.getElementById("PhoneNum").innerHTML = PhoneNum;
	
	let Username = "bkent5";
	document.getElementById("Username").innerHTML = Username;
	
	let Pwd = "eonk";
	document.getElementById("Pwd").innerHTML = Pwd;
	
	let Usertype = "p";
	document.getElementById("Usertype").innerHTML = Usertype;
	
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
	}
	
	if(Usertype = "d"){
		let Specialty = "Donk";
		document.getElementById("Specialty").innerHTML = Specialty;
		
		let RoomNum = "Bonk";
		document.getElementById("RoomNum").innerHTML = RoomNum;
	}
}

function saveProfileDetails(){ //Sends new profile details to database, then goes from u_profile_edit to u_profile. Called by "save button"
	
}

function getUserType(){ //Obtains usertype of whoever is logged in
	
}

function displayExtras(){ //Displays extra info depending on usertype
	//Obtain usertype value here, set to var usertype
	var usertype = "p";
	
	document.getElementById("tableP").style.display = "none";
	document.getElementById("tableD").style.display = "none";
	
	if(usertype == "p"){
		document.getElementById("tableP").style.display = "block";
	} else if(usertype == "d"){
		document.getElementById("tableD").style.display = "block";
	}
}