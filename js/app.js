var app = angular.module('AgileAndBeyondApp',['ngRoute','ui.bootstrap']);
var controllers = {};
toastr.options = {"positionClass": "toast-bottom-full-width"}
app.conferenceYear = '2014';

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
            templateUrl: 'partials/sessionView.html',
            controller: 'sessionsViewController'
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
        }).when('/SpeakerAcceptance/:sessionId',{
            templateUrl: 'partials/acceptSession.html',
            controller: 'sessionAcceptanceController'
        }).otherwise({redirectTo: '/Home'});
}]);

app.directive('eatClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    };
});


app.factory('Service', function($http) {
    return {
        getAllSessions: function(year, filter) {
            return $http.get('rest/getSchedule?year=' + year + '&filter=' + filter);
        },
        getAcceptedSessions: function(year) {
            return $http.get('rest/getSessions?year=' + year);
        },
        logout: function() {
            return $http.get('rest/logout');
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
            });
        },
        getSessionsById: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/getSessionsById',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        getSessionVoteById: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/getSessionVoteById',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        updateSession: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/editSession',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        getSessionData: function() {
            return $http.get('rest/getSessionData');
        },
        getUserSessionId: function() {
            return $http.get('rest/getSessionId');
        },
        getUserData: function(id) {
            return $http.get('rest/user?id=' + id);
        },
        castVote: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/castVote',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        getLeaderboard: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/getOverallLeaderboard',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });

        },
        getSessionDetails: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/getSessionDetails',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        setSessionStatus: function(inputs) {
            return $http({
                method: 'POST',
                url: 'rest/setSessionStatus',
                data: inputs,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });
        },
        getSpeakers: function() {
            return $http.get('rest/getSpeakers');
        },
        getSponsors: function() {
            return $http.get('rest/getSponsors');
        }
    };
});

app.directive('reviewWidget', function() {
    return {
        templateUrl:'partials/reviewWidget.html'
    };
});

app.run(function($rootScope, $location) {
    $rootScope.location = $location;
});