function userInfo(){
    var usertype = "p";
    if(document.getElementById("patient").checked){
        usertype = "p";;
    }
    else if(document.getElementById("doctor").checked){
        usertype = "d";;
    }
    else if(document.getElementById("admin").checked){
        usertype = "a";;
    }
    console.log(usertype);
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phone = document.getElementById("phone").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value; 

    //connect to php code
	
    runPHP("adduser.php", {"firstname": firstName, "lastname":lastName, "phone": phone,"username":username, "password":password, "usertype":usertype}, redirect, alert);
    
    //end php
    console.log(firstName+lastName)
    console.log(phone)
    console.log(usertype)
    console.log(username)
    console.log(password)
    
}

function redirect(parameter){
    window.location.href = ADMIN_PAGE;
}
