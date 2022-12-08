function showPassChars() {
    var x = document.getElementById("login_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function onSuccessLogin(result){
	localStorage.setItem("csce310userinfo",  result);
	window.location.replace(PORTAL_PAGE);
}

function attemptLogin(){ //tries to log in using provided credentials
	
	user = document.getElementById("login_username").value;
	pass = document.getElementById("login_password").value;
	runPHP("login.php", {"username":user, "passphrase": pass}, onSuccessLogin, alert);
	
}


function registerUser(){
	
	

	user = document.getElementById("username_reg_field").value;
	pass = document.getElementById("password_reg_field").value;
	fname = document.getElementById("firstname_reg_field").value;
	lname = document.getElementById("lastname_reg_field").value;
	phone = document.getElementById("phone").value;
	runPHP("register.php", {"firstname": fname, "lastname":lname, "username":user, "passphrase":pass, "usertype":"p", "phone": phone}, login, duplicateUsername);

}

function duplicateUsername(message){
	if(message.includes("Duplicate entry")){
		alert("The Username Already Exists! Please choose another one.");
	}
	else{
		alert(message);
	}
}
function login(parameter){
	user = document.getElementById("username_reg_field").value;
	pass = document.getElementById("password_reg_field").value;
	runPHP("login.php", {"username":user, "passphrase": pass}, onSuccessLogin, alert);
}

	