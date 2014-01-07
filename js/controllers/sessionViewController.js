controllers.sessionsViewController = function($scope, Service, $routeParams) {
    $scope.sessionData = null;

    Service.getSessionDetails($.param($routeParams)).success(function(data) {
        $scope.sessionData = data;
    });


};