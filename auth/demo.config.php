<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.config.php
*
*  @version 1.0
*  @author Tim Forsythe <http://timforsythe.com>
*  @copyright 2012 by Tim Forsythe
*  @link: http://timforsythe.com/demos/hybridauth/demo.index.php
*  @ref:  http://hybridauth.sourceforge.net
***********************************************************/

require_once( dirname(__FILE__)."/demo.settings.php" );

error_reporting(E_ALL & ~E_STRICT & ~E_DEPRECATED);

if ($Verbose)
{
	ini_set( "display_errors", 1 );
}

// start the session if not already
if(!session_id())
{
	session_start();
}

// connect to database
$database_link = @ mysql_connect( $db_host, $db_user, $db_pass );

if ( ! $database_link ) {
	die( "Unable to access database. <hr><b>Mysql error</b>: " . mysql_error() );
}

$db_selected = mysql_select_db( $db_name );

if ( ! $db_selected ) {
	die( "Unable to access database. <hr><b>Mysql error</b>: " . mysql_error() );
}

require_once($HybridAuthPath);
require_once($UsersClassPath);
require_once($InputClassPath);

?>