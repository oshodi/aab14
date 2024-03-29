<?php
    define('QUADODO_IN_SYSTEM', true);
    require_once('user/includes/header.php');
    


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
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="js/thirdparty/toastr/toastr.css" rel="stylesheet" />
    <link href="js/thirdparty/blueimp-file-upload/css/jquery.fileupload.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />

    <!--<script src="js/thirdparty/respond.min.js"></script>-->
    <style>

    </style>

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="img/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="favicon.ico">

    <!--[if lt IE 9]>
    <script src="js/thirdparty/json3.min.js"></script>
    <script src="js/thirdparty/respond.min.js"></script>
    <![endif]-->

    <script type="text/javascript">
    var AAB_USER_ID = '<?php echo $qls->user_info['id']; ?>';
    </script>

</head>

<body id="aab" class="" data-ng-controller="mainController">
<div class="navbar navbar-fixed-top" role="navigation">

    <div class="container-fluid">
        <div class="navbar-header">

            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#mainNav" data-ng-click="toggleNav()">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Agile &amp; Beyond 2014</a>
        </div>
        <div class="collapse navbar-collapse" id="mainNav" ng-show='!isCollapsed'>
            <ul class="nav navbar-nav pull-right">
                <li data-ng-click="setActive('Home')" data-ng-class="itemClass('Home')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Home">Home</a></li>
                <li data-ng-click="setActive('Location')" data-ng-class="itemClass('Location')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Location">Location</a></li>
                <li data-ng-click="setActive('Sessions')" data-ng-class="itemClass('Sessions')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Sessions">Sessions</a></li>
                <li data-ng-click="setActive('Presenters')" data-ng-class="itemClass('Presenters')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Presenters">Presenters</a></li>
                <li data-ng-click="setActive('Sponsors')" data-ng-class="itemClass('Sponsors')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Sponsors">Sponsors</a></li>
                <li data-ng-click="setActive('Team')" data-ng-class="itemClass('Team')"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/Team">Team</a></li>

                <li><a class="btn btn-primary btn-sm register" href="http://aab2014-es2.eventbrite.com/">Register</a></li>
                <li class="divider"></li>


                <?php
                    // Look in the USERGUIDE.html for more info
                    if ($qls->user_info['username'] == '') {
                ?>
                <li class="dropdown user-login hidden-sm hidden-xs hidden-tablet hidden-phone">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown" eat-click>Sign In <strong class="caret"></strong></a>
                    <div class="dropdown-menu">

                        <?php
                            include('user/login.php');
                        ?>

                    </div>
                </li>
                <?php
                }
                else {
                ?>
                <li class="dropdown user-login hidden-sm hidden-xs hidden-tablet hidden-phone">
                    <input type="hidden" id="authorized" value="true" />
                    <a class="dropdown-toggle" href="#" id="user" data-id="<?php echo $qls->user_info['id']; ?>" data-toggle="dropdown" eat-click>Welcome, <?php echo $qls->user_info['username']; ?> <strong class="caret"></strong></a>
                    <div class="dropdown-menu">

                            <ul>
                                <!--<li><?php echo $qls->user_info['email']; ?></li>-->
                                <li><a href="user/logout.php">Logout</a></li>
                            </ul>
                    </div>
                </li>

                <?php
                }
                ?>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div data-ng-view=""></div> <!-- /container -->

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/thirdparty/jquery.min.js"></script>
<script src="js/thirdparty/angular/angular.js"></script>
<script src="js/thirdparty/angular-route/angular-route.js"></script>
<script src="js/thirdparty/angular-bootstrap/ui-bootstrap.min.js"></script>
<script type="text/javascript" src="js/thirdparty/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
<script src="js/thirdparty/toastr/toastr.min.js"></script>
<script src="js/thirdparty/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="js/thirdparty/blueimp-file-upload/js/jquery.fileupload.js"></script>
<script src="js/thirdparty/blueimp-file-upload/js/jquery.fileupload-angular.js"></script>
<script type="text/javascript" src="js/app.js"></script>
<script type="text/javascript" src="js/controllers/homeController.js"></script>
<script type="text/javascript" src="js/controllers/itemController.js"></script>
<script type="text/javascript" src="js/controllers/mainController.js"></script>
<script type="text/javascript" src="js/controllers/ratingsWidget.js"></script>
<script type="text/javascript" src="js/controllers/ModalInstanceController.js"></script>
<script type="text/javascript" src="js/controllers/sessionAcceptanceController.js"></script>
<script type="text/javascript" src="js/controllers/sessionAdminController.js"></script>
<script type="text/javascript" src="js/controllers/sessionController.js"></script>
<script type="text/javascript" src="js/controllers/sessionController.js"></script>
<script type="text/javascript" src="js/controllers/sessionViewController.js"></script>
<script type="text/javascript" src="js/controllers/speakerSubmissionController.js"></script>
<script type="text/javascript" src="js/controllers/sponsorController.js"></script>
<script type="text/javascript" src="js/controllers/updateSessionController.js"></script>
<script type="text/javascript" src="js/controllers/userRegistrationController.js"></script>
<script type="text/javascript" src="js/controllers/controllers.js"></script>
</body>
</html>
