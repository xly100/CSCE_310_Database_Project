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
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value; 

    

    console.log(firstName+lastName)
    console.log(phone)
    console.log(usertype)
    console.log(email)
    console.log(password)

    window.location.href = "userManage.html";
}