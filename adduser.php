<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$FNAME = $_REQUEST["firstname"];
$LNAME = $_REQUEST["lastname"];
$PHONE = $_REQUEST["phone"];
$USERNAME = $_REQUEST["username"];
$PASSWORD = $_REQUEST["password"];
$USERTYPE = $_REQUEST["usertype"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO user (firstname, lastname, phone, username, passphrase, usertype) VALUES ('{$FNAME}', '{$LNAME}', '{$PHONE}', '{$USERNAME}', '{$PASSWORD}', '{$USERTYPE}');";

if ($conn->query($sql) === TRUE) {
  //do nothing
}else {
    
  if(strlen($conn->error) < 1){
      echo "[]";
  } else{
       echo "__PHP_ERROR__ [" . $conn->error . "]" . ", __QUERY__ = [" . $sql . "]";
  }
}
$conn->close();

?>