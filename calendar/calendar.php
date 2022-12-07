<?php header("Access-Control-Allow-Origin: *");

Class SQLManager{
	
	public static $db_name = "id19789922_maindatabase"; //name of your database
	public static $user = "id19789922_user1"; //username for database authentication
	public static $pass = "310databaseDXSM$"; //password corresponding to above username
	
	// get all appointments for given day for given doctor
	static function getAppointments($date, $doctorid, $usertype){
		$command = "SELECT * FROM `appointment` WHERE `doctorid` = '{$doctorid}' AND `timestamp` BETWEEN '{$date} 00:00:00' AND '{$date} 23:59:59'";
		$con = new PDO("mysql:host=localhost;dbname=" . SQLManager::$db_name , SQLManager::$user, SQLManager::$pass, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC));
		$v = $con->query($command);

		$rows = $v->fetchAll(PDO::FETCH_NUM);

		return $rows;
		
	}

	// get all appointments for given day for given doctor
	static function getDoctors(){
		
		$command = "SELECT `userid`,`firstname`,`lastname`,`specialty` FROM `doctor_view`"; // MATTHEW CHANG used view
		$con = new PDO("mysql:host=localhost;dbname=" . SQLManager::$db_name , SQLManager::$user, SQLManager::$pass, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC));
		$v = $con->query($command);

		$rows = $v->fetchAll(PDO::FETCH_NUM);

		return $rows;
		
	}
	
}

/** GET/POST REQUEST HANDLING **/

		if ( $_SERVER['REQUEST_METHOD'] == 'GET' ) {
        $userid = $_REQUEST["userid"];
		$usertype = $_REQUEST["usertype"];
		$date = $_REQUEST["date"];
		$command = $_REQUEST["command"];
		$doctorid = $_REQUEST["doctorid"];
		
		if ($command == "0"){
			echo json_encode(SQLManager::getAppointments($date, $doctorid, $usertype));
		} else if ($command == "1"){
			echo json_encode(SQLManager::getDoctors());
		}
			
		}
		
?>

