<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.index.php
*
*  @version 1.0
*  @author Tim Forsythe <http://timforsythe.com>
*  @copyright 2012 by Tim Forsythe
*  @link: http://timforsythe.com/demos/hybridauth/demo.index.php
*  @ref:  http://hybridauth.sourceforge.net
***********************************************************/
  require_once( dirname(__FILE__)."/demo.config.php" );
	$self = $_SERVER['PHP_SELF'];
	$fn = $WebsiteUrl.$self;
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en">
<head>
<style>
*,html.body,div,ul,ol,li,pre,form,fieldset,input,p,blockquote,table,th,td {
	vertical-align: baseline;
	font-weight: inherit;
	font-family: inherit;
	font-style: inherit;
	font-size: 100%;
	border: 0 none;
	outline: 0;
	padding: 0;
	margin: 0;
}
html, body { width: 100%; height: 100%; }
body { background:#ffffff; font-family: Verdana,sans-serif; color: #555; font-size: 13px; margin: 0px auto; }
h1 { font-size: 18px; letter-spacing: -1px; font-weight: 400; color: black; padding-bottom: 10px; }
a { text-decoration: none; color: #CC3300; }
a:hover { text-decoration: none; }
#demo {padding: 10px;}
#profile {padding: 10px;}
.button {
  display: inline-block;
	appearance: button;
	-moz-appearance: button;
	-webkit-appearance: button;
	text-decoration: none;
	font: bold 11px Arial;
	background-color: #EEEEEE;
	color: #333333;
	padding: 2px 6px 2px 6px;
	border-top: 1px solid #CCCCCC;
	border-right: 1px solid #333333;
	border-bottom: 1px solid #333333;
	border-left: 1px solid #CCCCCC;
}
</style>
</head>
<body>

<div align="center">
<br/>
<h1 class="nowrap"><?php echo $WebsiteTitle; ?></h1>
<div id="demo">
<?php
	if( isset( $_SESSION["user"] ) )
	{
		$userId = $_SESSION["user"];
		session_write_close();

		$user_data = Users::Find_user_by_id( $userId );

		if ( $user_data )
		{
			echo 'Welcome: ';

			echo '<a href="'.$user_data["profile_url"].'" target="_blank">';

			if ( isset($user_data["display_name"]))
			{
				 echo $user_data["display_name"];
			}
			else
			{
				 echo $user_data["first_name"];
				 echo " ".$user_data["last_name"];
			}

			echo '</a><br/>';

			echo '<div id="profile">';

			if ($user_data["photo_url"])
			{
				echo '<a href="'.$user_data["photo_url"].'"><img src="'.$user_data["photo_url"].'" height="50" width="50"></a>';
			}

			echo '</div>';

		}
		else
		{
		  echo "Unable to find session user: ".$userId; die();
		}

		echo ' <div class="button"><a href="'.$SignOutUrl.'?callback='.$fn.'">Sign Out</a></div>';
	}
	else
	{
		echo 'Please Sign In ';
		echo ' <div class="button"><a href="'.$SignInUrl.'?callback='.$fn.'&provider=Google">Google</a></div>';
		echo ' <div class="button"><a href="'.$SignInUrl.'?callback='.$fn.'&provider=Facebook">Facebook</a></div>';
		echo ' <div class="button"><a href="'.$SignInUrl.'?callback='.$fn.'&provider=Twitter">Twitter</a></div>';
	}
?>

<br /><br />
Go to <a href="demo.index.page.2.php">Page 2</a>

</div>

</div>
</body>
</html>

