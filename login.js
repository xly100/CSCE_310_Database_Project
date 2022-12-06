function showPassChars() {
    var x = document.getElementById("login_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function attemptLogin(){ //tries to log in using provided credentials
	
	user = document.getElementById("login_username").value;
	pass = document.getElementById("login_password").value;
	 var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result = this.responseText;
		if (result === "NO_RESULTS"){
			alert("Invalid username or password");
			return;
		} else{
			localStorage.setItem("csce310userinfo",  result);
			window.location.replace(PORTAL_PAGE);
		}
      }
    };
    xmlhttp.open("GET", "https://csce310database.000webhostapp.com/login.php?username=" + encodeURIComponent(user) + "&password=" + encodeURIComponent(pass), true);
    xmlhttp.send();
	
}


function registerUser(){
	
	user = document.getElementById("username_reg_field").value;
	pass = document.getElementById("password_reg_field").value;
	fname = document.getElementById("firstname_reg_field").value;
	lname = document.getElementById("lastname_reg_field").value;
	
	
}

	