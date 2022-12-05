window.addEventListener('DOMContentLoaded', (event) => {
    populateUsers();
});

function populateUsers(){

    //todo: add php logic to database
    var id = '3';
    var name = 'Jorge Bosh';
    var phone = '1236549870';
    var role = 'Doctor';
    
    var row = document.createElement('tr');
    row.setAttribute("id", id)

    row.innerHTML = "<td>" + id + "<\/td><td>" + name + "<\/td><td>" + phone + "<\/td><td>" + role + "<\/td><td>" 
    + "<a href='#' class='settings' title='Settings' data-toggle='tooltip' onclick='editUserProfile(this)'><i class='material-icons'>&#xE8B8;<\/i><\/a><a href='#' class='delete' title='Delete' data-toggle='tooltip' onclick='deleteUsers(this)'><i class='material-icons'>&#xE5C9;<\/i><\/a><\/td>";

    const table = document.getElementById('userTable');
    table.appendChild(row);
    

}

function deleteUsers(btn){
    var row = btn.parentNode.parentNode;
    removedId = row.id; // this is the id for the removed user
    console.log(removedId);
    row.parentNode.removeChild(row)
    //todo: add php logic to database

}

function editUserProfile(btn){
    var row = btn.parentNode.parentNode;
    editId = row.id; // this is the id to edit
    console.log(editId);
    //go to page for editing user profile
    
}