<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$CID = $_REQUEST["creatorid"];
$TS = $_REQUEST["timestamp"];
$DESC = $_REQUEST["description"];
$DID = $_REQUEST["doctorid"];
$PID = $_REQUEST["patientid"];
$TRE = $_REQUEST["treatment"];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO appointment (creatorid, timestamp, description, doctorid, patientid, treatment_note) values('{$CID}', '{$TS}', '{$DESC}', '{$DID}', '{$PID}', '{$TRE}');";

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