window.addEventListener('DOMContentLoaded', (event) => {
    populateComments();
});

function populateComments(){
    if(getUserType()!=='a'){
        document.getElementById("manage").style.display="none";
    }
    
    var id = '4';
    var time = '11/09/2022 9:23:12';
    var comment = 'No, U';
    var name = 'Joe Mama';
    var type = 'Doctor';
    var appointment = '1';

    var row = document.createElement('tr');

    row.innerHTML = "<th scope='row'>" + id + "<\/th><td>" + time + "<\/td><td>" + comment + "<\/td><td>" 
    + name + "<\/td><td>" + type + "<\/td><td>" + appointment + "<\/td>" + (getUserType() == 'a' ? "<td><button type='button' class='btn btn-danger' onclick='deleteComments(this)'>Remove</button></td>" : "");

    const table = document.getElementById('commentTable');
    table.appendChild(row);


}




function addComment(){
    var comment = document.getElementById("inputComment").value;
    var appointmentid = document.getElementById("inputAppointmentID").value;
    runPHP("addcomment.php", {"content":comment, "userid":getUserId(), "appointmentid": appointmentid}, console.log, alert);

}

function deleteComments(btn){
    var row = btn.parentNode.parentNode;
    removedId = row.id; // this is the id for the removed user
    console.log(removedId);
    row.parentNode.removeChild(row)

    //remove comment from database
}