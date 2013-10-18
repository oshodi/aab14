<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.signout.php
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
	else
	{
		$callback = $input->get['callback'];
	}

	// Unset all of the session variables.
	$_SESSION = array();

	// destroy the session.
	session_destroy();

	header("Location: $callback"); die();

?>