<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";


$USERID = $_REQUEST["UID"];
$SPEC = $_REQUEST["specialty"];
$RN = $_REQUEST["roomnum"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE doctor SET specialty = '{$SPEC}', roomnum = '{$RN}' WHERE userid = '{$USERID}'";

if ($conn->query($sql) === TRUE) {
  //do nothing
}else {
    
  if(strlen($conn->error) < 1){
      echo "[]";
  } else{
       echo "__PHP_ERROR__ [" . $conn->error . "]" . ", __QUERY__ = [" . $sql . "]";
  }
}

?>