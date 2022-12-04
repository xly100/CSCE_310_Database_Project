function getUserInfo(){ //Needs to obtain data from user table to display on u_profile and u_profile_edit
	
}

function saveProfileDetails(){ //Sends new profile details to database, then goes from u_profile_edit to u_profile. Called by "save button"
	
}

function getUserType(){ //Obtains usertype of whoever is logged in
	
}

window.onload = function displayExtras(){ //Displays extra info depending on usertype
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
/*window.addEventListener('DOMContentLoaded', (event) => {
    displayExtras();
});*/