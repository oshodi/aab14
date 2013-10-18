<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.signin.php
*
*  @version 1.0
*  @author Tim Forsythe <http://timforsythe.com>
*  @copyright 2012 by Tim Forsythe
*  @link: http://timforsythe.com/demos/hybridauth/demo.index.php
*  @ref:  http://hybridauth.sourceforge.net
***********************************************************/

  require_once( dirname(__FILE__)."/demo.config.php" );

	$self = $_SERVER['PHP_SELF'];

  $input = new input();

  if (!isset($input->get['callback']))
	{
		echo "callback not set"; die();
	}
	else if (!isset($input->get['provider']))
	{
		echo "provider not set"; die();
	}
	else
	{
		$callback = $input->get['callback'];
		$provider = $input->get['provider'];

		$hybridauth = new Hybrid_Auth( $HybridAuthConfigPath );

		if (!$hybridauth)
		{
			echo "unable to create authenticator"; die();
		}
		else
		{
			$adapter = $hybridauth->authenticate( $provider );

			if (!$adapter)
			{
				echo "unable to authenticate"; die();
			}
			else
			{
				$user_profile = $adapter->getUserProfile();

				if (!$user_profile)
				{
					echo "unable to retrieve user profile"; die();
				}
				else
				{
					$provider_uid  = $user_profile->identifier;
					$email         = $user_profile->email;
					$first_name    = $user_profile->firstName;
					$last_name     = $user_profile->lastName;
					$display_name  = $user_profile->displayName;
					$profile_url   = $user_profile->profileURL;
					$photo_url     = $user_profile->photoURL;

					if( $email )
					{
						$user_data = Users::Find_user_by_email( $email );
					}
					else if ($provider_uid)
					{
						$user_data = Users::Find_user_by_provider_uid( $provider, $provider_uid );
					}

					if( $user_data )
					{
 						$userId = $user_data["id"];

						Users::Update_user( $userId, $provider, $provider_uid, $display_name, $first_name, $last_name, $profile_url, $photo_url );
					}
					else
					{
						$userId = Users::Create_user( $provider, $provider_uid, $email, $display_name, $first_name, $last_name, $profile_url, $photo_url );
					}

					$_SESSION["user"] = $userId;
					session_write_close();

					header("Location: $callback"); die();
				}
			}
		}
	}
?>

