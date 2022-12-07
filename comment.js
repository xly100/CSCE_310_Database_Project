window.addEventListener('DOMContentLoaded', (event) => {
    if(getUserType() !== 'a'){
        runPHP("getusercomments.php",{"userid":getUserId()},populateComments, alert);
    }
    else{
        runPHP("getadmincomments.php",{},populateComments, alert);
    }
    
});

function populateComments(comments){
    if(getUserType()!=='a'){
        document.getElementById("manage").style.display="none";
    }

    commentList = JSON.parse(comments);
    for(let i = 0; i < commentList.length; i++){
        temp = commentList[i];
        var id = temp['commentid'];
        var time = temp['timestamp'];
        var comment = temp['content'];
        var name = temp['firstname'] + ' ' + temp['lastname'];
        var type = ""
        if(temp['usertype']==='a'){
            type = "Admin"
        }else if(temp['usertype']==='p'){
            type = "Patient"
        }else if(temp['usertype']==='d'){
            type = "Doctor"
        }
        var appointment = temp['appointmentid'];

        var row = document.createElement('tr');

        row.innerHTML = "<th scope='row'>" + id + "<\/th><td>" + time + "<\/td><td>" + comment + "<\/td><td>" 
        + name + "<\/td><td>" + type + "<\/td><td>" + appointment + "<\/td>" + (getUserType() == 'a' ? "<td><button type='button' class='btn btn-danger' onclick='deleteComments(this)'>Remove</button></td>" : "");

        const table = document.getElementById('commentTable');
        table.appendChild(row);
    }

}




function addComment(){
    var comment = document.getElementById("inputComment").value;
    var appointmentid = document.getElementById("inputAppointmentID").value;
    runPHP("addcomment.php", {"content":comment, "userid":getUserId(), "appointmentid": appointmentid}, console.log, alert);
    window.location.reload();
    document.getElementById('inputComment').scrollIntoView();
}

function deleteComments(btn){
    var row = btn.parentNode.parentNode;
    removedId = row.id; // this is the id for the removed user
    console.log(removedId);
    row.parentNode.removeChild(row)
    //remove comment from database
    runPHP("deletecomment.php", {"commentid":removedId}, console.log, alert)
    alert("The comment ID "+ removedId + " has been removed.")
}