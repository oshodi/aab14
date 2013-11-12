
var controllers = {};

controllers.homeController = function() {};

controllers.mainController = function($scope,$rootScope,Service,$cookies) {
    $scope.sessionData = {};
    $rootScope.acceptingProposals = false;
    $scope.auth = {};
    $scope.review = {
        showWidget: false
    };

    Service.getUserSessionId().success(function(data){
        if(data.current_session_id === $cookies.userSession) {
            //get user data
            Service.getUserData($cookies.userId).success(function(data) {
                $scope.auth.isAuthenticated = true;
                data[0].session = $cookies.userSession;
                $scope.setUser(data);
            });
        }


    }).error(function(data) {
       console.log(data.status);
    });

    var startDate = new Date('Mon Sep 30 2013');
    var endDate = new Date('Tue Nov 11 2013');
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
        {'page': 'Team'}
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

            window.currentUser = data;
        }).error(function(data) {
           console.log(data.status);
        });
    }

    $scope.setUser = function(data) {
        $scope.auth.user = {
            first_name: data[0].first_name,
            id: data[0].id,
            session: data[0].session
        }
        $cookies.userSession = $scope.auth.user.session? $scope.auth.user.session : data[0].session;
        $cookies.userId = data[0].id;
    }
}

controllers.sessionsController = function($scope, $http, Service) {

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

controllers.itemController = function($scope,$attrs) {
    $scope.showVotePanel = function(id,index,event) {
        $scope.review.positionReviewProp =  {
            left: event.pageX - 220,
            top: event.pageY -20
        }
        $scope.review.showWidget = true;
       $scope.review.data = $scope.allSessions[index];

    }



}

controllers.ratingsWidget = function($scope) {
    $scope.review.speakerRate = 0;
    $scope.review.contentRate = 0;
    $scope.review.applicabilityRate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.saveRating = function(event) {
        $scope.review.user = $scope.auth.user;
        console.log($scope.review);
    }

    $scope.closeReview = function() {
        $scope.review.showWidget = false;
        $scope.review.positionReviewProp =  {
            left: "auto",
            top: "auto"
        }
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
                    pwd: $scope.newUser.user_password
                };

                Service.login($.param(userLogin)).success(function(data){
                    $scope.auth.isAuthenticated = true;
                    $scope.auth.user = data;

                    window.currentUser = data;


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


