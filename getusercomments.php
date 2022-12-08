<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$USERID = $_REQUEST["userid"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM user_comment_join WHERE appointmentid in (SELECT DISTINCT appointmentid FROM user_comment_join WHERE userid='{$USERID}');";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $major_string = "[";
  while($row = $result->fetch_assoc()) {
    $major_string .= json_encode($row);
    $major_string .= ",";
  }
      echo substr($major_string, 0, -1) . "]";
}else {
    
  if(strlen($conn->error) < 1){
      echo "[]";
  } else{
       echo "__PHP_ERROR__ [" . $conn->error . "]" . ", __QUERY__ = [" . $sql . "]";
  }
}
$conn->close();
?>