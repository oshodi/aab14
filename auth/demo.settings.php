<?php
/***********************************************************
*  Project: HybridAuth Demo
*  File: demo.settings.php
*
*  @version 1.0
*  @author Tim Forsythe <http://timforsythe.com>
*  @copyright 2012 by Tim Forsythe
*  @link: http://timforsythe.com/demos/hybridauth/demo.index.php
*  @ref:  http://hybridauth.sourceforge.net
***********************************************************/

// Configure Database Connection
$dbtype  = "mysql";
$db_host = "aabapi.db.9934665.hostedresource.com";
$db_user = "aabapi";
$db_pass = "Ba1l3y12#";
$db_name = "aabapi";

// Website variables
$WebsiteTitle  = "Agile and Beyond";  			// My Website
$WebsitePath   = "/Applications/MAMP/htdocs/aab14";   			// c:/apache/htdocs
$WebsiteUrl    = "http://localhost:8888"; 			// http://domain.com
$ProjectFolder = "auth";
$AuthFolder    = "hybridauth"; 	// subfolder/hybridhauth

// Project variables
$ProjectPath   = $WebsitePath."/".$ProjectFolder;
$ProjectUrl    = $WebsiteUrl."/aab14/".$ProjectFolder;

// HybridAuth variables
$AuthPath      = $WebsitePath."/".$AuthFolder;
$AuthUrl       = $WebsiteUrl."/aab14/".$AuthFolder ;

// Include paths
$HybridAuthConfigPath  = $AuthPath."/config.php";
$HybridAuthPath        = $AuthPath."/Hybrid/Auth.php";
$InputClassPath        = $ProjectPath."/demo.input.class.php";
$UsersClassPath        = $ProjectPath."/demo.users.class.php";

// Anchor URLs
$SignInUrl             = $ProjectUrl."/demo.signin.php";
$SignOutUrl            = $ProjectUrl."/demo.signout.php";

$Verbose = true;

?>