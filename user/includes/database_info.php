<?php
/*** *** *** *** *** ***
* @package   Quadodo Login Script
* @file      database_info.php
* @author    Douglas Rennehan
* @generated November 12th, 2013
* @link      http://www.quadodo.com
*** *** *** *** *** ***
* Comments are always before the code they are commenting
*** *** *** *** *** ***/
if (!defined('QUADODO_IN_SYSTEM')) {
exit;
}

define('SYSTEM_INSTALLED', true);
$database_prefix = 'qls3_';
$database_type = 'MySQL';
// $database_server_name = 'aabapi2.db.11845101.hostedresource.com';
// $database_username = 'aabapi2';
// $database_password = 'Ba1l3y12#';
// $database_name = 'aabapi2';
// $database_port = false;


// $database_server_name = 'aabapi.db.9934665.hostedresource.com';
// $database_username = 'aabapi';
// $database_password = 'Ba1l3y12#';
// $database_name = 'aabapi';
// $database_port = false;

$database_server_name = 'localhost';
$database_username = 'root';
$database_password = 'root';
$database_name = 'aabapi';
$database_port = '8889';

/**
 * Use persistent connections?
 * Change to true if you have a high load
 * on your server, but it's not really needed.
 */
$database_persistent = false;
?>