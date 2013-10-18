<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.users.class.php
*
*  @version 1.0
*  @author Tim Forsythe <http://timforsythe.com>
*  @copyright 2012 by Tim Forsythe
*  @link: http://timforsythe.com/demos/hybridauth/demo.index.php
*  @ref:  http://hybridauth.sourceforge.net
***********************************************************/

class Users
{
	private function mysql_query_excute( $sql ){
		$result = mysql_query($sql);

		if (!$result) {
			$message  = 'Invalid query: ' . mysql_error() . "\n";
			$message .= 'Whole query: ' . $sql;
			die($message);
		}

		return $result;
	}

  public static function Find_user_by_provider_uid( $provider, $provider_uid ){
	  $sql = "SELECT * FROM users WHERE provider = '$provider' AND provider_uid = '$provider_uid' LIMIT 1";

	  $result = Users::mysql_query_excute($sql);

	  return mysql_fetch_assoc($result);
  }

  public static function Find_user_by_email( $email ){
	  $sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";

	  $result = Users::mysql_query_excute($sql);

	  return mysql_fetch_assoc($result);
  }

	public static function Find_user_by_id( $id ){
		$sql = "SELECT * FROM users WHERE id = '$id' LIMIT 1";

		$result = Users::mysql_query_excute($sql);

		return mysql_fetch_assoc($result);
	}

  public static function Create_user( $provider, $provider_uid, $email, $display_name, $first_name, $last_name, $profile_url, $photo_url ){
	  $sql = "INSERT INTO users ( provider, provider_uid, email, display_name, first_name, last_name, profile_url, photo_url, created ) VALUES ( '$provider', '$provider_uid', '$email', '$display_name', '$first_name', '$last_name', '$profile_url', '$photo_url', NOW() ) ";

	  Users::mysql_query_excute($sql);

	  return mysql_insert_id();
  }

  public static function Update_user( $userId, $provider, $provider_uid, $display_name, $first_name, $last_name, $profile_url, $photo_url ){
	  $sql = "UPDATE users SET provider='$provider',
	                           provider_uid = '$provider_uid',
	                           display_name = '$display_name',
	                           first_name = '$first_name',
	                           last_name = '$last_name',
	                           profile_url = '$profile_url',
	                           photo_url = '$photo_url'
	                       WHERE id = '$userId'
	         ";

	  Users::mysql_query_excute($sql);
  }
}

?>