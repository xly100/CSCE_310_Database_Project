<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$FIRSTNAME = $_REQUEST["FName"];
$LASTNAME = $_REQUEST["LName"];
$PHONE = $_REQUEST["PhoneNum"];
$USERNAME = $_REQUEST["Username"];
$PASSPHRASE = $_REQUEST["Pwd"];
$USERID = $_REQUEST["UID"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE user SET firstname = '{$FIRSTNAME}', lastname = '{$LASTNAME}', phone = '{$PHONE}', username = '{$USERNAME}', passphrase = '{$PASSPHRASE}' WHERE userid = '{$USERID}'";

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