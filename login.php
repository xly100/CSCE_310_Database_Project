<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "id19789922_user1";
$password = "310databaseDXSM$";
$dbname = "id19789922_maindatabase";

$USER = $_REQUEST["username"];
$PASS = $_REQUEST["passphrase"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM user USE INDEX (username_password_index) WHERE username = '" . $USER . "' AND passphrase = '" . $PASS . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    echo json_encode($row);
  }
}else {
    
  if(strlen($conn->error) < 1){
      echo "[]";
  } else{
       echo "__PHP_ERROR__ [" . $conn->error . "]" . ", __QUERY__ = [" . $sql . "]";
  }
}
$conn->close();
?>