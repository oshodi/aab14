<?php
/* DO NOT REMOVE */
if (!defined('QUADODO_IN_SYSTEM')) {
exit;
}
/*****************/
?>
<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" lang="en" id="ng-app" ng-app="AgileAndBeyondApp">
<head>
    <meta charset="utf-8">
    <title>Agile and Beyond</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="../css/main.css" rel="stylesheet">
    <script src="../js/respond.min.js"></script>
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../img/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../img/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../img/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../img/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="favicon.ico">
    <!--[if lte IE 8]>
    <script src="js/json2.js"></script>
    <![endif]-->
</head>

<body id="aab" class="" data-ng-controller="mainController">
<div class="navbar navbar-inverse in navbar-fixed-top" >
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Agile &amp; Beyond 2014</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li data-ng-repeat="page in pages" data-ng-click="setActive(page)" data-ng-class="itemClass(page)"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="../#/{{ page.page }}">{{ page.page }}</a></li>
                <li><a class="btn btn-primary btn-sm register" href="http://aab2014-es2.eventbrite.com/">Register</a></li>
                <li class="divider"></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>
<div class="container">


<div class="content register panel">
<div class="panel-body">
<h1><?php echo REGISTER_LABEL; ?></h1>
<?php
    if(isset($registered)) {
?>
      <p><?php echo $registered; ?></p>
<?php
        } elseif(isset($error)) {
?>
	<p><?php echo $error; ?></p>
<?php
	} else {
?>
<fieldset>
	<form action="register.php<?php if (isset($_GET['code'])) { ?>?code=<?php echo htmlentities($_GET['code']); } ?>" method="post">
		<input type="hidden" name="process" value="true" />
		<input type="hidden" name="random_id" value="<?php echo $random_id; ?>" />

        <div class="form-group">
            <label for="username"><?php echo USERNAME_LABEL; ?></label>
            <input type="text" class="form-control" name="username" maxlength="<?php echo $qls->config['max_username']; ?>" value="<?php if (isset($_SESSION[$qls->config['cookie_prefix'] . 'registration_username'])) { echo $_SESSION[$qls->config['cookie_prefix'] . 'registration_username']; } ?>" />
        </div>
        <div class="form-group">
            <label for="password"><?php echo PASSWORD_LABEL; ?></label>
            <input type="password" class="form-control" name="password" maxlength="<?php echo $qls->config['max_password']; ?>" />
        </div>
        <div class="form-group">
            <label for="password_c"><?php echo PASSWORD_CONFIRM_LABEL; ?></label>
            <input type="password"  class="form-control" name="password_c" maxlength="<?php echo $qls->config['max_password']; ?>" />
        </div>

        <div class="form-group">
            <label for="email"><?php echo EMAIL_LABEL; ?></label>
            <input type="text" class="form-control" name="email" maxlength="100" value="<?php if (isset($_SESSION[$qls->config['cookie_prefix'] . 'registration_email'])) { echo $_SESSION[$qls->config['cookie_prefix'] . 'registration_email']; } ?>" />
        </div>

        <div class="form-group">
            <label for="email_c"><?php echo EMAIL_CONFIRM_LABEL; ?></label>
            <input type="text" class="form-control" name="email_c" maxlength="100" value="<?php if (isset($_SESSION[$qls->config['cookie_prefix'] . 'registration_email_confirm'])) { echo $_SESSION[$qls->config['cookie_prefix'] . 'registration_email_confirm']; } ?>" />
        </div>

        <div class="form-group">
            <input class="btn btn-primary" type="submit" value="<?php echo REGISTER_SUBMIT_LABEL; ?>" />
        </div>
	</form>
</fieldset>
    <?php
            }
    ?>
</div>
</div>
</div>

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="../js/jquery.min.js"></script>
<script src="../js/angular.min.js"></script>
<script src="../js/angular-cookies.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/directives/ui-bootstrap-custom-0.6.0.min.js"></script>
<script src="../js/directives/ui-bootstrap-custom-tpls-0.6.0.js"></script>
<script type="text/javascript" src="../js/app.js"></script>
<script type="text/javascript" src="../js/controllers/controllers.js"></script>
</body>
</html>
