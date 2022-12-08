window.addEventListener('DOMContentLoaded', (event) => {
    runPHP("getallusers.php",{},populateUsers, alert);
});

function populateUsers(users){
    userList = JSON.parse(users);
    console.log(userList)
    //todo: add php logic to database
    for(let i = 0; i < userList.length;i++){
        var temp = userList[i];
        var id = temp['userid'];
        var firstName = temp['firstname'];
        var lastName = temp['lastname'];
        var name = firstName+' '+lastName;
        var userName = temp['username'];
        var phone = temp['phone'];
        var role = "";
        if(temp['usertype']==='p'){
            role = "Patient"
        }
        else if(temp['usertype']==='d'){
            role = "Doctor"
        }
        else if(temp['usertype']==='a'){
            role = "Admin"
        }
        
        var row = document.createElement('tr');
        row.setAttribute("id", id)

        row.innerHTML = "<td>" + id + "<\/td><td>" + name + "<\/td><td>"+ userName +"<\/td><td>"+ phone + "<\/td><td>" + role + "<\/td><td>" 
        + "<a href='#' class='settings' title='Settings' data-toggle='tooltip' onclick='editUserProfile(this)'><i class='material-icons'>&#xE8B8;<\/i><\/a><a href='#' class='delete' title='Delete' data-toggle='tooltip' onclick='deleteUsers(this)'><i class='material-icons'>&#xE5C9;<\/i><\/a><\/td>";

        const table = document.getElementById('userTable');
        table.appendChild(row);
    }
}

function deleteUsers(btn){
    var row = btn.parentNode.parentNode;
    removedId = row.id; // this is the id for the removed user
    console.log(removedId);
    row.parentNode.removeChild(row)
    //todo: add php logic to database
    runPHP("deleteuser.php", {"userid":removedId}, console.log, alert);
    alert("You have removed user ID: " + removedId);
}


function editUserProfile(btn){
    var row = btn.parentNode.parentNode;
    editId = row.id; // this is the id to edit
    
    console.log(editId);
    //go to page for editing user profile
    
}