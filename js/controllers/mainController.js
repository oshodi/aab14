controllers.mainController = function($scope,$rootScope) {
    $scope.sessionData = {};
    $rootScope.acceptingProposals = false;
    $scope.auth = {};
    $scope.review = {
        showWidget: false
    };

    if(angular.element('#authorized').length > 0) {
        $scope.auth.isAuthenticated = true;
    }

    $scope.toggleNav = function() {

        $('#mainNav').toggleClass('collapse');
    };


    $scope.aUrl = $rootScope.location.absUrl();

    var dateConfig = {
        openDate: 'Mon Sep 30 2013',
        closeDate: 'Tue Nov 11 2013'
    }

    $scope.acceptingProposalsCheck = function(config) {
        var startDate = new Date(config.openDate);
        var endDate = new Date(config.closeDate);
        var today = new Date();

        if((today >= startDate) && (today <= endDate)) {
            $rootScope.acceptingProposals = true;
        }
    };

    $scope.acceptingProposalsCheck(dateConfig);

    $scope.pages = [
        {'page': 'Home'},
        {'page': 'Location'},
        {'page': 'Sessions'},
        {'page': 'Presenters'},
        {'page': 'Sponsors'},
        {'page': 'Team'}
    ];

    $scope.setActive = function(item) {
        $scope.selected = item;
        if($('#mainNav').is(':visible')) {
            $('#mainNav').toggleClass('collapse');
        }
    };

    $scope.setActive($scope.pages[0]);


    $scope.itemClass = function(item) {
        return item === $scope.selected ? 'active' : undefined;
    };
};