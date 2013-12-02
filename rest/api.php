<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jdinkelm
 * Date: 9/10/13
 * Time: 11:28 AM
 * To change this template use File | Settings | File Templates.
 */
	require_once("Rest.inc.php");

	Class AAB extends REST {

		public $data = "";

		const DB_SERVER = "aabapi2.db.11845101.hostedresource.com";
		const DB_USER = "aabapi2";
		const DB_PASSWORD = "Ba1l3y12#";
		const DB = "aabapi2";

		
		// const DB_SERVER = "aabapi.db.9934665.hostedresource.com";
		// const DB_USER = "aabapi";
		// const DB_PASSWORD = "Ba1l3y12#";
		// const DB = "aabapi";

		// const DB_SERVER = "localhost:8889";
		// const DB_USER = "root";
		// const DB_PASSWORD = "root";
		// const DB = "aabapi";

// SELECT votes.sessionid,
// COUNT(votes.sessionid) votes_total, 
// session_table.sessionTitle, 
// AVG(votes.content) content, 
// AVG(votes.applicability) app, 
// AVG(votes.speaker) speaker,
// AVG(votes.content + votes.applicability + votes.speaker)/3.0 overall_avg
// FROM `votes`,`session_table` 
// WHERE votes.sessionid = session_table.id 
// GROUP BY votes.sessionid
// ORDER BY overall_avg DESC	


		private $db = NULL;

		public function __construct()
		{
		parent::__construct();// Init parent contructor
		$this->dbConnect();// Initiate Database connection
		}

		//Database connection
		private function dbConnect()
		{
		$this->db = mysql_connect(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD);
		if($this->db)
		mysql_select_db(self::DB,$this->db);
		}


		/*
		 * Public method for access api.
		 * This method dynmically call the method based on the query string
		 *
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);				// If the method not exist with in this class, response would be "Page not found".
		}

				/* 
		 *	Simple login API
		 *  Login must be POST method
		 *  email : <USER EMAIL>
		 *  pwd : <USER PASSWORD>
		 */
		
		private function login(){
			// Cross validation if the request method is POST else it will return "Not Acceptable" status
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			
			$email = $this->_request['email'];		
			$password = $this->_request['pwd'];
			
			// Input validations
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$sql = mysql_query("SELECT id, first_name,last_name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1", $this->db);
					if(mysql_num_rows($sql) > 0){
						session_start();
						$sessionid = session_id();

						$result = mysql_fetch_array($sql,MYSQL_ASSOC);
						$_SESSION['email'] = $result[0]['email'];
						setcookie("aabCookie", $result[0]['id'], time()+3600, "/", "example.com");
						$success = array('data' => $result, "session" => $sessionid);
						
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($success), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			// If invalid inputs "Bad Request" status message and reason
			$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}


		private function users(){	
			// Cross validation if the request method is GET else it will return "Not Acceptable" status
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$sql = mysql_query("SELECT id, provider, display_name, first_name, last_name, profile_url, photo_url FROM users", $this->db);
			if(mysql_num_rows($sql) > 0){
				$result = array();
				while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
					$result[] = $rlt;
				}
				// If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($result), 200);
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function user(){	
			// Cross validation if the request method is GET else it will return "Not Acceptable" status
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}

			$id = (int)$this->_request['id'];

			$sql = mysql_query("SELECT id, provider, display_name, first_name, last_name, profile_url, photo_url FROM users WHERE id = $id"  , $this->db);
			if(mysql_num_rows($sql) > 0){
				$result = array();
				while($rlt = mysql_fetch_array($sql,MYSQL_ASSOC)){
					$result[] = $rlt;
				}
				// If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($result), 200);
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function deleteUser(){
			// Cross validation if the request method is DELETE else it will return "Not Acceptable" status
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				mysql_query("DELETE FROM users WHERE user_id = $id");
				$success = array('status' => "Success", "msg" => "Successfully one record deleted.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		private function addUser() {
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}


			$user_first = $this->_request['user_first'];
			$user_last = $this->_request['user_last'];
			$user_password = md5($this->_request['user_password']);
			$user_email = $this->_request['user_email'];


			if(!empty($user_email)) {
				//$result = array();
				$sql = "INSERT INTO users (first_name, last_name, password, email) VALUES ('$user_first','$user_last','$user_password','$user_email')";
				if(mysql_query($sql, $this->db)) {
					$success = array('status' => "Success", 
						"msg" => "Successfully one record added",
						"id" => mysql_insert_id(),
						"email" => $user_email);
					$this->response($this->json($success),200);
				} else {
					$error = array('status' => "Failed", "msg" => mysql_error());
					$this->response($this->json($error), 400);
				}

				//$this->response($this->json($result), 200);
			}	else {
				$error = array('status' => "Failed", "msg" => "All Feilds are required");
				$this->response($this->json($error), 400);
			}	
			

		}

		private function addSession() {
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			
			$email = $this->_request['email'];
			$sessionTitle = addslashes($this->_request['sessionTitle']);
			$firstName = $this->_request['firstName'];
			$middleName = $this->_request['middleName'];
			$lastName = addslashes($this->_request['lastName']);
			$personalSite = $this->_request['personalSite'];
			$copresenter = $this->_request['copresenter'];
			$copresenterEmail = $this->_request['copresenterEmail'];
			$sessionAbstract = addslashes($this->_request['sessionAbstract']);
			$sessionAudience = $this->_request['sessionAudience'];
			$sessionInformation = addslashes($this->_request['sessionInformation']);
			$sessionLevel = $this->_request['sessionLevel'];
			$sessionPresented = $this->_request['sessionPresented'];
			$twitter = $this->_request['twitter'];
			$active = $this->_request['active'];
			$accepted = $this->_request['accepted'];

			if(!empty($email) && !empty($sessionTitle)  && !empty($firstName)) {
				$sql = "INSERT INTO 
				session_table (email, firstName, middleName, lastName,personalSite, sessionAbstract, sessionTitle, sessionAudience, sessionInformation, sessionLevel, sessionPresented, twitter,copresenter,copresenter_email) 
				VALUES ('$email', '$firstName', '$middleName', '$lastName','$personalSite', '$sessionAbstract', '$sessionTitle', '$sessionAudience', '$sessionInformation', '$sessionLevel', '$sessionPresented', '$twitter','$copresenter','$copresenterEmail')";

				if(mysql_query($sql, $this->db)) {
					$success = array('status' => "Success", "msg" => "Successfully saved a session");
					$this->response($this->json($success),200);
				} else {
					$error = array('status' => "Failed", "msg" => mysql_error());
					$this->response($this->json($error), 400);
				}


				$success = array('status' => "Success", "msg" => "You rock");
				$this->response($this->json($success), 200);
			} else {
				$error = array('status' => "Failed", "msg" => "The required information is not available, please complete the form and resubmit");
				$this->response($this->json($error), 400);
			}
		}

		private function editSession() {
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$sessionLength = $this->_request['length'];
			$sessionid = $this->_request['sessionid'];


			if(!empty($sessionLength)) {
				$sql = "UPDATE session_table SET session_length='$sessionLength' WHERE id='$sessionid'";
				if(mysql_query($sql, $this->db)) {
					$success = array('status' => "Success", "msg" => "Successfully updated your session(s)");
					$this->response($this->json($success),200);
				} else {
					$error = array('status' => "Failed", "msg" => mysql_error());
					$this->response($this->json($error), 400);
				}


			} else {
				$error = array('status' => "Failed", "msg" => "The required information is not available, please complete the form and resubmit");
				$this->response($this->json($error), 400);
			}
		}

		private function getSessionsById() {
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$code = $this->_request['id'];

			$sql = "SELECT * FROM session_table WHERE md5(email) = '$code'";
			$query = mysql_query($sql, $this->db);
			$number = mysql_num_rows($query);
			$rows = array();

			if($number > 0) {
				while ($arraySessions = mysql_fetch_array($query,MYSQL_ASSOC)) { 
        			$rows[] = $arraySessions; 
        		}
				$success = array("sessions" => $rows);
				$this->response($this->json($success),200);
			} else {
				$error = array('status' => "Failed", "msg" => 'No id found in database', "id" => $code);
				$this->response($this->json($error), 400);
			}

		}

		private function getSessionVoteById() {
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$sessionid = $this->_request['sessionid'];
			$userid = $this->_request['userid'];

			$sql = "SELECT * FROM votes WHERE userrid='$userid' AND sessionid='$sessionid'";
			$query = mysql_query($sql, $this->db);
			$number = mysql_num_rows($query);
			$rows = array();

			if($number > 0) {
				while ($arraySessions = mysql_fetch_array($query,MYSQL_ASSOC)) { 
        			$rows[] = $arraySessions; 
        		}
				$success = array("sessions" => $rows);
				$this->response($this->json($rows),200);
			} else {
				$error = array('status' => "Failed", "msg" => 'No id found in database', "id" => $userid);
				$this->response($this->json($error), 204);
			}

		}

		private function getSchedule() {
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}

			$year = (int)$this->_request['year'];

			if($year == "" || $year == 2014) {
				$result = $this->retrieveSessions();

				$this->response($this->json($result), 200);
				
			} else {
				$file = "../data/$year/schedule.json";
				$string = file_get_contents($file);
				if($string != "") {
					$this->response($string, 200);
				} else {
					$this->response('',204);
				}
				
			}
		}

		private function retrieveSessions() {
			$sql = "SELECT * FROM schedule_times ORDER BY id";
			$query = mysql_query($sql, $this->db);
			if($query) {
				$result = array();
				while($rlt = mysql_fetch_array($query,MYSQL_ASSOC)){
					$id = $rlt['id'];
					$result[$id] = $rlt;
					$result[$id]['sessions'] = array();

					$secAql = "SELECT * FROM session_table WHERE time=$id";
					$query2 = mysql_query($secAql, $this->db);
					while($rlt2 = mysql_fetch_array($query2,MYSQL_ASSOC)){
						array_push($result[$id]['sessions'], $rlt2);
					}
					
				}

				return $result; 
			} else {
				$error = array('status' => "Failed", "msg" => mysql_error());
				$this->response($this->json($error), 400);
			}
		}

		private function getSessions() {
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}

			$sql = "SELECT * FROM schedule_times ORDER BY id";
			$query = mysql_query($sql, $this->db);


			$this->response($this->json($array), 200);
		}

        private function getNumberOfSessions() {
            

            $sql = "SELECT * FROM session_table";
            $query = mysql_query($sql, $this->db);
            $rows = array();

            if($query) {
        		$totalNumberOfSessionsSubmitted = mysql_num_rows($query);
        		while ($arraySessions = mysql_fetch_array($query,MYSQL_ASSOC)) { 
        			$rows[] = $arraySessions; 
        		}

        		return array("number" => $totalNumberOfSessionsSubmitted, "sessions" => $rows);
        	}
        }

        private function castVote() {
        	if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$sessionid = (int)$this->_request['session'];
			$contentRating = (int)$this->_request['content'];
			$speakerRating = (int)$this->_request['speaker'];
			$audience = $this->_request['audience'];
			$appRating = (int)$this->_request['applicability'];
			$note = mysql_real_escape_string(trim($this->_request['note']));
			$timestamp = date("Y-m-d H:i:s"); 
			$userid = (int)$this->_request['userid'];

			$sql = "INSERT INTO votes (userrid, sessionid, content, applicability, speaker, note, time_stamp,audience) 
					VALUES ('$userid', '$sessionid','$contentRating','$appRating','$speakerRating', '$note', '$timestamp','$audience')
					ON DUPLICATE KEY UPDATE
 					content='$contentRating',applicability='$appRating',speaker='$speakerRating',note='$note',time_stamp='$timestamp',audience='$audience'";

 					

			$query = mysql_query($sql, $this->db);
			if($query) {
        		$this->response('',200);
        	} else {
        		$this->response(mysql_error(),406);
        	}

        }

        private function getOverallLeaderboard() {
        	if($this->get_request_method() != "GET"){
				$this->response('',406);
			}

        	$sql = "SELECT votes.sessionid,COUNT(votes.sessionid) votes_total, 
					session_table.sessionTitle,
					session_table.firstName,
					session_table.lastName, 
					AVG(votes.content) content, 
					AVG(votes.applicability) app, 
					AVG(votes.speaker) speaker,
					AVG(votes.content + votes.applicability + votes.speaker)/3.0 overall_avg
					FROM `votes`,`session_table` 
					WHERE votes.sessionid = session_table.id 
					GROUP BY votes.sessionid
					ORDER BY overall_avg DESC";

			$query = mysql_query($sql, $this->db);
            $rows = array();

            if($query) {
        		
        		while ($array = mysql_fetch_array($query,MYSQL_ASSOC)) { 
        			$rows[] = $array; 
        		}

        		//return array("number" => $totalNumberOfSessionsSubmitted, "sessions" => $rows);
        	}

			$this->response($this->json($rows), 200);
        }

        private function getNumberOfAcceptedSessions() {
        	$sql = "SELECT * FROM session_table WHERE accepted = 1";
            $query = mysql_query($sql, $this->db);
            if($query) {
        		$totalNumberOfAcceptedSessions = mysql_num_rows($query);
        	} else {
        		$totalNumberOfAcceptedSessions = mysql_error();
        	}

        	return $totalNumberOfAcceptedSessions;
        }

        private function getSessionId() {
        	session_start();
			$sessionid = array('current_session_id' => session_id());
			
			$this->response($this->json($sessionid), 200);
        }

        private function getSessionData() {
        	$submittedSessions = $this->getNumberOfSessions();
        	$acceptedSessions = $this->getNumberOfAcceptedSessions();
        	session_start();
			$sessionid = session_id();

        	$results = array('totalNumberOfSessionsSubmitted' => $submittedSessions, 
        		'totalNumberOfAcceptedSessions' => $acceptedSessions,
        		'current_session' => $sessionid
        		);
        	$this->response($this->json($results), 200);
        }


		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}		

	}

	// Initiiate Library
	
	$api = new AAB;
	$api->processApi();
?>