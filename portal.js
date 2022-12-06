/*Add a new comment to the database 
function addComment(content, authorid, apptid){


	var req = new XMLHttpRequest();
	
    req.open("POST", "https://csce310database.000webhostapp.com/test.php", true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() { 
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
       console.log('done');
    }
}

    req.send("https://csce310database.000webhostapp.com/test.php?content=" + encodeURIComponent(content) + "&userid="+authorid + "&apptid=" + apptid);



}*/