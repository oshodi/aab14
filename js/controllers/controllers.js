var controllers = {};

controllers.homeController = function() {};

controllers.mainController = function($scope,$rootScope,Service) {

    $rootScope.acceptingProposals = false;
    //$rootScope.isAuthenticated = false;
    $scope.auth = {};

    var startDate = new Date('Mon Sep 30 2013');
    var endDate = new Date('Thu Oct 31 2013');
    var today = new Date();

    if((today >= startDate) && (today <= endDate)) {
        $rootScope.acceptingProposals = true;
    }

    $scope.pages = [
        {'page': 'Home'},
        {'page': 'Location'},
        {'page': 'Sessions'},
        {'page': 'Presenters'},
        {'page': 'Sponsors'},
        {'page': 'Team'},
        {'page': 'Register','class':'true'}
    ];





    $scope.setActive = function(item) {
        $scope.selected = item;
    }

    $scope.setActive($scope.pages[0]);



    $scope.itemClass = function(item) {
        return item === $scope.selected ? 'active' : undefined;
    };

    $scope.userLogin = function() {
        Service.login($.param($scope.userModel)).success(function(data){
           $scope.auth.isAuthenticated = true;
           $scope.setUser(data);
        }).error(function(data) {
           console.log(data.status);
        });
    }

    $scope.setUser = function(data) {
        $rootScope.auth.user = data;
    }
}

controllers.sessionsController = function($scope, $http, Service) {
    $scope.sessionData = null;
    $scope.sessionYear = "";


    $scope.getSessions = function($event) {

        if($event.target.innerText && $event.target.innerText != "") {
            $scope.sessionYear = $event.target.innerText;
        }
        Service.getAllSessions($scope.sessionYear).success(function(results) {
            $scope.sessionData = results;
        });

    }






}

controllers.speakerSubmissionController = function($scope, $http,$rootScope,Service) {
    $scope.defaultForm = {
        firstName:"",
        middleName:"",
        lastName: "",
        email: "",
        twitter: "",
        personalSite:"",
        copresenter: "",
        copresenterEmail: "",
        sessionTitle:"",
        sessionAbstract:"",
        sessionLevel:"",
        sessionLength:"",
        sessionAudience:"",
        audienceOther: "",
        sessionPresented:"",
        sessionInformation:""
    };
    $scope.isSubmitDisabled = false;
    $scope.showAudienceOtherInput = false;
    $scope.user = {};
    $scope.resetForm = function() {
        //$scope.submitProposal.$setPristine();
        $scope.user = $scope.defaultForm;
    };
    var audience = $scope.user.sessionAudience;

    $scope.$watch('user.sessionAudience', function(audience) {
        if(typeof(audience) != 'undefined' && audience === "Other...") {

           $scope.showAudienceOtherInput = true;
        } else {
           $scope.showAudienceOtherInput = false;
        }
    });


    $scope.addSpeakerApplication = function() {

        if($scope.showAudienceOtherInput) {
            $scope.user.sessionAudience = $scope.user.audienceOther;
        }

        $scope.isSubmitDisabled = true;


        Service.addSessions($.param($scope.user)).success(function(data, status, headers, config) {
            $scope.isSubmitDisabled = false;
            $scope.resetForm();
            $('.modal').modal({show: true});

        });
    }



}

controllers.sessionsAdminController = function($scope,$http,Service) {
    $scope.acceptedSessions = 0;
    $scope.submittedSessions = 0;
    $scope.showSessions = false;
    $scope.allSessions = {};


    Service.getSessionData().success(function(data, status, headers, config) {
        $scope.submittedSessions = data.totalNumberOfSessionsSubmitted.number;
        $scope.allSessions = data.totalNumberOfSessionsSubmitted.sessions;
        $scope.acceptedSessions = data.totalNumberOfAcceptedSessions;

    });

    $scope.getSessions = function($event) {
            $scope.showSessions = true;
    };


}

controllers.itemController = function($scope,$http) {
    $scope.voteSession = function($event,session) {

        var vote_string = event.target.dataset.vote;
        var voteObject = $.param({
            session: session.id,
            vote: vote_string,
            userid: 89
        });


        $http({
            method: 'POST',
            url: 'rest/castVote',
            data: voteObject,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function() {
                if(vote_string == 1) {
                    session.selected = "liked";
                } else {
                    session.selected = "disliked";
                }
        });

        var leaderBoardSql = "SELECT sessionid,SUM(votetype) as votetally FROM votes GROUP BY sessionid ORDER BY votetally DESC";

    }
}

controllers.sponsorController = function($scope) {
    $scope.buyNow = function(event) {
        window.open("http://aab14sponsors.eventbrite.com/");
    }


}

controllers.userRegistrationController = function($scope,$http,Service,$rootScope) {

    $scope.addNewUser = function() {
        Service.addUser($.param($scope.newUser)).
            success(function(data) {
                var userLogin = {
                    email: data.email,
                    pwd: data.pwd
                };

                Service.login($.param(userLogin)).success(function(data){
                    $scope.auth.isAuthenticated = true;
                    $scope.auth.user = data;
                }).error(function(data) {
                    console.log(data.status);
                });
            }).
            error(function(data) {
                console.log(data);
            });
    }
}

app.controller(controllers);


