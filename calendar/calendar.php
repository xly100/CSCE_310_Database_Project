<?php header("Access-Control-Allow-Origin: *");

Class SQLManager{
	
	public static $db_name = "id19789922_maindatabase"; //name of your database
	public static $user = "id19789922_user1"; //username for database authentication
	public static $pass = "310databaseDXSM$"; //password corresponding to above username
	
	// get all appointments for given day for given doctor
	// apppointment slot on calendar can either be available, your appointment, or unavailable
	static function getAppointments($date){
		
		$command = "SELECT * FROM `appointment` WHERE `timestamp` BETWEEN '{$date} 00:00:00' AND '{$date} 23:59:59' ";
		$con = new PDO("mysql:host=localhost;dbname=" . SQLManager::$db_name , SQLManager::$user, SQLManager::$pass, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC));
		$v = $con->query($command);

		$rows = $v->fetchAll(PDO::FETCH_NUM);

		return $rows;
		
	}
	
}

// alert('nope')

/** GET/POST REQUEST HANDLING **/

		if ( $_SERVER['REQUEST_METHOD'] == 'GET' ) {
        $username = $_REQUEST["username"];
		$usertype = $_REQUEST["usertype"];
		$date = $_REQUEST["date"];
		
		echo json_encode(SQLManager::getAppointments($date));
			
		}
		
		// post
		
		// if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
			
			
		// $username = $_POST['username'];
		// $desc = $_POST['desc'];
		// $date = $_POST['date'];
		// $day = $_POST['day'];
		// $time = $_POST['time'];
		// SQLManager::addDatedEvent($description);
			
		// }
		
?>

