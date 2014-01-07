controllers.sessionsAdminController = function($scope,$http,Service) {
    $scope.acceptedSessions = 0;
    $scope.submittedSessions = 0;
    $scope.declinedSessions = 0;
    $scope.showSessions = true;
    $scope.showLeaders = false;
    $scope.allSessions = null;
    $scope.leaderData = null;
    $scope.sessionFilters = ['Beginner ','Agile Engineering','Team','Organization','Product Development','Personal Development','Other'];

    Service.getSessionData().success(function(data, status, headers, config) {
        $scope.submittedSessions = data.totalNumberOfSessionsSubmitted.number;
        $scope.allSessions = data.totalNumberOfSessionsSubmitted.sessions;
        $scope.acceptedSessions = data.totalNumberOfAcceptedSessions;
        $scope.declinedSessions = data.totalNumberOfDeclinedSessions;

    });

    $scope.getSessions = function(filterType) {
        $scope.filterBy = filterType;
        //$scope.showSessions = $scope.showSessions === false? true : false;
    };

    $scope.getSessionsAccepted = function($event) {
        $scope.showSessions = $scope.showSessions === false? true : false;
        $scope.searchFilter = {accepted: '1'}
        var apple = "McIntosh";
    };

    $scope.getLeaders = function($event,sessionFilter) {
        $scope.showSessions = false;
        var filter;
        $scope.leaderData = null;
        $scope.filterName = (sessionFilter === 'null'? 'Overall' : sessionFilter);
        if(!sessionFilter) {
            filter = {filter: null};

        } else {
            filter = {filter: sessionFilter};

        }
        //$scope.showLeaders = $scope.showLeaders === false ? true: false;

        Service.getLeaderboard($.param(filter)).success(function(data) {
            $scope.leaderData = data;
        });
    };

    $scope.setStatus = function(session, type) {
        var inputs = session;
        inputs.status = type;

        Service.setSessionStatus($.param(inputs)).success(function(data) {
            console.log(data);
            var alertText = (type == 1)? 'accepted' : 'rejected';
            toastr.success('You have ' + alertText + ' this session');
        });
    };
};