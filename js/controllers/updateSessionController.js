controllers.updateSession = function($scope,$location,Service) {
    $scope.updatedSessions = {};
    $scope.submitedLength = {};
    $scope.audienceOptions = ["Agile Engineering"];
    var sessionData = {
        id: AAB_ID
    };

    if(sessionData.id) {
        Service.getSessionsById($.param(sessionData)).success(function(data){
            $scope.updatedSessions = data;
        });
    }

    $scope.updateLengthOfSession = function() {

        $.each($scope.submitedLength, function(id, length) {
            var editdata = {
                length: length,
                sessionid: id
            };

            Service.updateSession($.param(editdata)).success(function(data) {
                toastr.info('Your session(s) have been updated');
            });
        });

    };

};