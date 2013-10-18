var app = angular.module('AgileAndBeyondApp',[]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Home',{
            templateUrl: 'partials/home.html',
            controller: 'homeController'
        }).when('/Presenters',{
            templateUrl: 'partials/speaker.html',
            controller: 'speakerSubmissionController'
        }).when('/Location',{
            templateUrl: 'partials/location.html',
            controller: 'speakerSubmissionController'
        }).when('/Sessions',{
            templateUrl: 'partials/sessions.html',
            controller: 'sessionsController'
        }).when('/Sessions/:sessionId',{
            templateUrl: 'partials/sessions.html',
            controller: 'sessionsController'
        }).when('/Admin',{
            templateUrl: 'partials/sessionsAdmin.html',
            controller: 'sessionsAdminController'
        }).when('/Sponsors',{
            templateUrl: 'partials/sponsors.html',
            controller: 'sponsorController'
        }).when('/AddUser',{
            templateUrl: 'partials/createAccount.html',
            controller: 'userRegistrationController'
        }).when('/Team',{
            templateUrl: 'partials/team.html',
            controller: 'userRegistrationController'
        }).otherwise({redirectTo: '/Home'});
}]);

app.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});


app.factory('Service', function($http) {
    return {
        getAllSessions: function(year) {
            return $http.get('rest/getSchedule?year=' + year);
        },
        logout: function() {
            return $http.get('rest/logout')
        },
        login: function(inputs) {
            return $http({method: 'POST',url: 'rest/login',data: inputs,headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }});
        },
        addUser: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/addUser',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        addSessions: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/addSession/',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
        },
        getSessionData: function() {
            return $http.get('rest/getSessionData');
        }
    }
});