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
    <link href="js/thirdparty/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="js/thirdparty/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="js/thirdparty/toastr/toastr.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />

    <script src="js/thirdparty/respond.min.js"></script>
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="img/ico/apple-touch-icon-57-precomposed.png">
    <link rel="shortcut icon" href="favicon.ico">
    <!--[if lte IE 8]>
    <script src="js/thirdparty/json2.js"></script>
    <![endif]-->

    <script type="text/javascript">
    var AAB_USER_ID = '<?php echo $qls->user_info['id']; ?>';
    </script>

</head>

<body id="aab" class="" data-ng-controller="mainController">
<div class="navbar navbar-fixed-top" >
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
            <ul class="nav navbar-nav pull-right">
                <li data-ng-repeat="page in pages" data-ng-click="setActive(page)" data-ng-class="itemClass(page)"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/{{ page.page }}">{{ page.page }}</a></li>
                <li><a class="btn btn-primary btn-sm register" href="http://aab2014-es2.eventbrite.com/">Register</a></li>
                <li class="divider"></li>
                

                <?php
                    // Look in the USERGUIDE.html for more info
                    if ($qls->user_info['username'] == '') {
                ?>
                <li class="dropdown user-login">
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
                <li class="dropdown user-login">
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

<div class="" data-ng-view=""></div> <!-- /container -->

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/thirdparty/jquery/jquery.min.js"></script>
<script src="js/thirdparty/angular/angular.min.js"></script>
<script src="js/thirdparty/angular-route/angular-route.min.js"></script>
<script src="js/thirdparty/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="js/thirdparty/toastr/toastr.min.js"></script>
<script type="text/javascript" src="js/app.js"></script>
<script type="text/javascript" src="js/controllers/controllers.js"></script>
</body>
</html>
