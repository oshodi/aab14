<?php
/*** *** *** *** *** ***
* @package Quadodo Login Script
* @file    login_process.php
* @start   November 29th, 2007
* @author  Douglas Rennehan
* @license http://www.opensource.org/licenses/gpl-license.php
* @version 1.0.0
* @link    http://www.quadodo.com
*** *** *** *** *** ***
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*** *** *** *** *** ***
* Comments are always before the code they are commenting.
*** *** *** *** *** ***/
session_start();
define('QUADODO_IN_SYSTEM', true);

// What language?
require_once('includes/Blank.lang.php');
require_once('includes/qls.class.php');

// Start the main class
$qls = new qls(SYS_CURRENT_LANG);

if (isset($_POST['process'])) {
	// Try to login the user
	if ($qls->User->login_user()) {
	$qls->redirect($qls->config['login_redirect']);
        //$qls->redirect($_SERVER['PHP_SELF']);
	}
	else {
	$qls->redirect('login.php');
	}
}
else {
$qls->redirect('login.php');
}
?>