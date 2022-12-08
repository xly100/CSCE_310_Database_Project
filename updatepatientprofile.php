<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$STREET = $_REQUEST["Street"];
$CITY = $_REQUEST["City"];
$STATE = $_REQUEST["State"];
$USERID = $_REQUEST["UID"];
$AGE = $_REQUEST["Age"];
$SEX = $_REQUEST["Sex"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE patient SET street = '{$STREET}', city = '{$CITY}', state = '{$STATE}', age = '{$AGE}', sex = '$SEX' WHERE userid = '{$USERID}'";

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