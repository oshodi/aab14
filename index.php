<!DOCTYPE html>
<html lang="en" xmlns:ng="http://angularjs.org" lang="en" id="ng-app" ng-app="AgileAndBeyondApp">
<head>
    <meta charset="utf-8">
    <title>Agile and Beyond</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <script src="js/respond.min.js"></script>
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
    <script src="js/json2.js"></script>
    <![endif]-->
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
            <ul class="nav navbar-nav">
                <li data-ng-repeat="page in pages" data-ng-click="setActive(page)" data-ng-class="itemClass(page)"><a data-ng-class="{'btn btn-primary btn-sm register': page.class}" href="#/{{ page.page }}">{{ page.page }}</a></li>
                <li><a class="btn btn-primary btn-sm register" href="http://aab2014-es2.eventbrite.com/">Register</a></li>
                <li class="divider"></li>
                <li class="dropdown user-login" data-ng-show="!auth.isAuthenticated && auth.on">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Sign In <strong class="caret"></strong></a>
                    <div class="dropdown-menu">
                        <form name="user_login">
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="text" class="form-control" data-ng-model="userModel.email" required="true"></input>
                            </div>
                            <div class="form-group">
                                <label>Password: </label>
                                <input type="password" class="form-control" data-ng-model="userModel.pwd" required="true"/>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" data-ng-click="userLogin()" >Login</button>
                                <a class="pull-right" href="#/AddUser">New? Create an Account</a>
                            </div>
                        </form>

                    </div>
                </li>
                <li class="dropdown user-login" data-ng-show="auth.isAuthenticated && auth.on">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Welcome, {{auth.user.first_name}} <strong class="caret"></strong></a>
                    <div class="dropdown-menu">
                            <ul>
                                <li>{{auth.user.email}}</li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                    </div>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>

<div class="container" data-ng-view=""></div> <!-- /container -->

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/jquery.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="js/angular-cookies.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/directives/ui-bootstrap-custom-0.6.0.min.js"></script>
<script src="js/directives/ui-bootstrap-custom-tpls-0.6.0.js"></script>
<script type="text/javascript" src="js/app.js"></script>
<script type="text/javascript" src="js/controllers/controllers.js"></script>
</body>
</html>
