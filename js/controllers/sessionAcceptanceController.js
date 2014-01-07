controllers.sessionAcceptanceController = function($scope,Service,$routeParams) {
    $scope.sessionWorkflow = false;
    $scope.declinedSession = false;
    $scope.acceptedSession = false;
    $scope.sessionNotFound = false;
    $scope.user = {
        speakerImage: null
    };

    function listener(event){
        //        if ( event.origin !== "http://javascript.info" )
        //        return;
        $scope.user.speakerImage = event.data;

    }

    if (window.addEventListener){
        addEventListener("message", listener, false)
    } else {
        attachEvent("onmessage", listener)
    }



    $scope.session = {
        accepted: false
    };


    $scope.currentSession = {id: $routeParams.sessionId};

    Service.getSessionsById($.param($scope.currentSession)).success(function(data,status) {
        if(status == 200) {
            $scope.user = data.sessions[0];
            $scope.sessionWorkflow = true;
        }

        if(status == 204) {
            $scope.sessionWorkflow = false;
            $scope.sessionNotFound = true;
        }
    });



    $scope.moveNext = function() {
        if($scope.user.files) {
            Service.uploadSpeakerImages($.param({}))
        };
        if($scope.session.accepted === true) {
            angular.element('.tab-pane.active').removeClass('active').next().addClass('active');
            angular.element('ul.nav-tabs li.active').removeClass('active').next().addClass('active');
        } else {
            toastr.warning('You must accept the Code of Conduct');
        }

    }

    $scope.acceptSession = function() {
        Service.updateSession($.param($scope.user)).success(function(data,status) {
            toastr.success('Your Session has been updated');
            $scope.acceptedSession = true;
            $scope.sessionWorkflow = false;
        });
    }

    $scope.declineSession = function() {

        var decline = prompt("Please type DECLINE to decline your session","");

        if(decline === 'DECLINE') {
            var inputs = {
                status: 0,
                sessionid: $scope.user.id,
                title: $scope.user.sessionTitle
            }



            Service.setSessionStatus($.param(inputs)).success(function(data, status) {
                console.log(status);
                if(status == 200) {
                    toastr.error('Your session, ' + inputs.title + " has been declined");

                    $scope.sessionWorkflow = false;
                    $scope.declinedSession = true;

                }


            });
        }
    }
}