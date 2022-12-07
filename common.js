// PAGE NAMES
LOGIN_PAGE = "login.html";
PORTAL_PAGE = "portal.html";
PROFILE_PAGE = "userprofile.html";
ADMIN_PAGE = "usermanage.html";
USER_ADD = "adduser.html";
PROFILE_EDIT = "userprofile.html";
PAGE_VAR_NAMES = {"LOGIN_PAGE" : LOGIN_PAGE, "PORTAL_PAGE" : PORTAL_PAGE, "PROFILE_PAGE" : PROFILE_PAGE, "ADMIN_PAGE" : ADMIN_PAGE, "USER_ADD" : USER_ADD, "PROFILE_EDIT" : PROFILE_EDIT}

// PHP SCRIPT REFERENCES
BASE_URL = "https://csce310database.000webhostapp.com/";

function retrieveUserInfo() {
	//returns null if no local storage object is found
	//otherwise returns JSON dictionary of user's information
  if(!localStorage.csce310userinfo){
	  return null;
  }
  return JSON.parse(localStorage.getItem("csce310userinfo"));
}

function signOut(){
	//delete login cookie
	localStorage.removeItem("csce310userinfo");
}

function validateLogin() {
	//returns true iff login cookie is stored, false otherwise

  return retrieveUserInfo() != null;
}

window.addEventListener('DOMContentLoaded', (event) => {
	
	as =  document.body.getElementsByTagName("a");
for(let i = 0; i < as.length; i++){
	if(as[i].href.substring(as[i].href.lastIndexOf('/') + 1) in PAGE_VAR_NAMES){
		as[i].href = PAGE_VAR_NAMES[as[i].href.substring(as[i].href.lastIndexOf('/') + 1)]
	}
    
}
	
	
if(validateLogin()){
	//set up navbar "signed in as" feature
	if (document.getElementById("register-form") == null){ //only login page has register-form so this is not login page
		if(document.getElementById("signed-in-as") !== null){
		document.getElementById("signed-in-as").innerHTML = "Signed in as " + getUsername();
		}
	} else{ //this is login page, perform signout so user can log in as someone else
		signOut();
		return;
	}
} else{
	//only redirect to login.html if this page is not already login.html
	if (document.getElementById("register-form") == null){
		window.location.replace(LOGIN_PAGE);
	} 
}


});

function getUserType(){
	//returns "a", "d", or "p"
	return retrieveUserInfo()['usertype'];
}

function getUserId(){
	//returns user ID integer as a string, i.e. "5"
	return retrieveUserInfo()["userid"];
}

function getUserFName(){
	//returns user's first name, i.e. "John"
	return retrieveUserInfo()["firstname"];
}

function getUserLName(){
	//returns user's last name, i.e. "Smith"
	return retrieveUserInfo()["lastname"];
}

function getUserPhone(){
	//returns user's phone number as consecutive digits in a string, i.e. "1234567890"
	return retrieveUserInfo()["phone"];
}

function getUsername(){
	//returns user's username as a string, i.e. "xly100"
	return retrieveUserInfo()["username"];
}

function checkAndRedirectAdmin(){
	//check if user has admin privileges, then redirect to admin page if so
	if(getUserType() !== "a"){
		alert("Error: You are not an admin!");
		return;
	} else{
		window.location.href = ADMIN_PAGE;
	}
	
}



/*

Invokes a specific PHP file on the server tied to a SQL query

Description of parameters:

scriptname - a string containing the name of the PHP script to be invoked; for example, "login.php". Be sure to include the ".php" extension at the end

args_dict - a dictionary that maps argument names to their values. Keys are argument names and values are corresponding values. For example, {"username" : "Bob", "password" : "bob123"}

callback_success - the name of a function (in a separate JS file) that is to be called if the query ran successfully. This function should take in 1 parameter, the response text returned by the PHP script.
Remember to pass in only the NAME of the function, NOT a call to it. For example, if you have a function onSuccess(text) {console.log(text);}, you would pass in onSuccess to this parameter.
Note that the name of the function passed into this parameter is not a string, but the raw name, as if it were a variable.

callback_error - the name of a function (in a separate JS file) that is to be called if the query encountered an error while running. This function should take in 1 parameter, the error message.
Remember to pass in only the NAME of the function, NOT a call to it. For example, if you have a function onFail(text) {console.log(text);}, you would pass in onFail to this parameter. 
Note that the name of the function passed into this parameter is not a string, but the raw name, as if it were a variable.

*/
function runPHP(scriptname, args_dict, callback_success, callback_error){ 

fullURL = BASE_URL + scriptname;

if (Object.keys(args_dict).length > 0){
    fullURL += "?"
    for(let i = 0; i < Object.keys(args_dict).length; i++){
        fullURL += Object.keys(args_dict)[i] + "=";
        fullURL += args_dict[Object.keys(args_dict)[i]];
        if(i < Object.keys(args_dict).length - 1){
            fullURL += "&";
        }
    }
}
	 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result = this.responseText;
		if (result.includes("__PHP_ERROR__")) { //error function
			callback_error(result);
		} else { //success function
			callback_success(result);
		}
      }
    };
    xmlhttp.open("GET", fullURL, true);
    xmlhttp.send();
	
}
