controllers.sessionsController = function($scope,$modal, $http, Service) {
    $scope.sessionYear = "";
    $scope.showArchive = false;
    $scope.activeSession = {};
    $scope.showListView = false;
    $scope.showGridView = true;

    $scope.toggleList = function(type) {
        if(type == 'list') {
            $scope.showListView = true;
            $scope.showGridView = false;
        } else {
            $scope.showListView = false;
            $scope.showGridView = true;
        }
    }


    $scope.getArchivedSessions = function($event) {
        if($event) {
            if($event.target.innerText && $event.target.innerText !== "") {
                $scope.sessionYear = $event.target.innerText;
            }
        }

//        Service.getAllSessions($scope.sessionYear).success(function(results) {
//            $scope.sessionData = results;
//        });

    };
    $scope.currentSchedule = null;

    Service.getAcceptedSessions(app.conferenceYear).success(function(data,status) {
       $scope.currentSchedule = data;
    });

    //$scope.getArchivedSessions();


    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (index) {
        if(modalInstance) {
            modalInstance.close();
        }
        var modalInstance;
        Service.getSessionDetails($.param({sessionId: index})).success(function(data) {
            modalInstance = $modal.open({
                templateUrl: 'partials/sessionView.html',
                controller: controllers.ModalInstanceCtrl,
                resolve: {
                    items: function () {
                        return $scope.items;
                    },
                    speaker: function() {
                            return data;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });

        });


    };
};