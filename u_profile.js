function getUserInfo(){ //Needs to obtain data from user table to display on u_profile and u_profile_edit
	
}

function saveProfileDetails(){ //Sends new profile details to database, then goes from u_profile_edit to u_profile. Called by "save button"
	
}

function getUserType(){ //Obtains usertype of whoever is logged in
	
}

function displayExtras(){ //Displays extra info depending on usertype
	//Obtain usertype value here, set to var usertype
	document.getElementByID("tableP").style.display = "block";
	document.getElementByID("tableD").style.display = "block";
	
	if(usertype == "p"){
		document.getElementByID("tableP").style.display = "none";
	} else if(usertype == "d"){
		document.getElementByID("tableD").style.display = "none";
	}
}