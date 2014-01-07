controllers.sessionsController = function($scope, $http, Service) {
    $scope.sessionYear = "";
    $scope.showArchive = false;
    $scope.activeSession = {};


    $scope.getArchivedSessions = function($event) {
        if($event) {
            if($event.target.innerText && $event.target.innerText !== "") {
                $scope.sessionYear = $event.target.innerText;
            }
        }

        Service.getAllSessions($scope.sessionYear).success(function(results) {
            $scope.sessionData = results;
        });

    };
    $scope.currentSchedule = null;

    Service.getAcceptedSessions(app.conferenceYear).success(function(data,status) {
       $scope.currentSchedule = data;
    });

    $scope.getArchivedSessions();
};