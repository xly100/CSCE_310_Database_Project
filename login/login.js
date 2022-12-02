// function loginSwitch(){
//     //$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//     document.getElementById("login-form").style.display = "none";
//     document.getElementById("register-form").style.display = "none";
// }

// $('.message a').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//  });

function myFunction() {
    var x = document.getElementById("pInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

