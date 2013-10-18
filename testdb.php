<?php
	const DB_SERVER = "aabapi.db.9934665.hostedresource.com";
	const DB_USER = "aabapi";
	const DB_PASSWORD = "Ba1l3y12#";
	const DB = "aabapi";
	
	$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB);

	if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
	}


	function loadFake($db) {
			$file = "data/2013/schedule.json";
			$string = file_get_contents($file);
			$array = json_decode($string, TRUE);
			$newArray = array();

			foreach ($array as $key => $value) {
				foreach ($value as $red => $stuff) {
					if($red == "sessions") {
						foreach ($stuff as $green => $things) {
							if($green != 0) {

								$result = array_unique($things);
								$lasttitle = "";
								foreach ($result as $purple => $sky) {
									
									$sessionTitle = addslashes($result["title"]);
									$firstName = $result["speaker"];
									$copresenter = $result['copresenter'];
									$sessionAbstract = addslashes($result["description"]);

									if($lasttitle != $sessionTitle) {
										$sql = "INSERT INTO session_table  (sessionTitle, sessionAbstract, copresenter, firstName) 
										VALUES ('$sessionTitle','$sessionAbstract','$copresenter','$firstName')";
										// print $sql."<br><br><br>";
										if ($result = $db->query($sql)) {
										    //printf("Select returned %d rows.\n", $result->num_rows);

										    /* free result set */
										    //$result->close();
										} else {
											printf("Error: %s\n", $db->error);
										}


										$lasttitle = $sessionTitle;
									}
									
								}
							}
						}
					}
					
				}
			}
	}

	//loadFake($mysqli);

	$email = "jdinkelmann@gmail.com";
	$password = "ba1l3y";

	$sql = "SELECT * FROM session_table";
	//printf("this is your query\n\r $sql");

	if ($result = $mysqli->query($sql)) {
    //printf("Select returned %d rows.\n", $result->num_rows);

    /* free result set */
    $result->close();
	} else {
		printf("Error: %s\n", $mysqli->error);
	}
?>