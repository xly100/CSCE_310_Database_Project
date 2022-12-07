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
	
    runPHP("adduser.php", {"firstname": firstName, "lastname":lastName, "phone": phone,"username":username, "password":password, "usertype":usertype}, console.log, alert);
    
    //end php

    console.log(firstName+lastName)
    console.log(phone)
    console.log(usertype)
    console.log(username)
    console.log(password)

    setTimeout(function () {
        window.location.href = ADMIN_PAGE; //will redirect to your blog page (an ex: blog.html)
     }, 1000);
    
}
