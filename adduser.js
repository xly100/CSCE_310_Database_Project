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
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result = this.responseText;
		if (result === "NO_RESULTS"){
			alert("Invalid username or password");
			return;
		} else{
            console.log(result);
            addUserPatientDoctor(result,usertype);
		}
      }
    };
    xmlhttp.open("GET", "https://csce310database.000webhostapp.com/adduser.php?firstname=" + encodeURIComponent(firstName) + "&lastname=" + encodeURIComponent(lastName)
    +"&phone="+encodeURIComponent(phone)+"&username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password)+"&usertype="+encodeURIComponent(usertype), true);
    xmlhttp.send();
    
    //end php

    console.log(firstName+lastName)
    console.log(phone)
    console.log(usertype)
    console.log(username)
    console.log(password)

    setTimeout(function () {
        window.location.href = ADMIN_PAGE; //will redirect to your blog page (an ex: blog.html)
     }, 2000);
    
}

function addUserPatientDoctor(userid,usertype){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        result = this.responseText;
        //alert(result);
      }
    };

    if(usertype=="p"){
        xmlhttp.open("GET", "https://csce310database.000webhostapp.com/addpatient.php?userid=" + encodeURIComponent(userid), true);
        xmlhttp.send();
    }
    
    else if(usertype=="d"){
        xmlhttp.open("GET", "https://csce310database.000webhostapp.com/adddoctor.php?userid=" + encodeURIComponent(userid), true);
        xmlhttp.send();
    }
    
}