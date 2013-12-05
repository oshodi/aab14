
var controllers = {};

controllers.homeController = function() {};

controllers.mainController = function($scope,$rootScope) {
    $scope.sessionData = {};
    $rootScope.acceptingProposals = false;
    $scope.auth = {};
    //$scope.auth.isAuthenticated = false;
    $scope.review = {
        showWidget: false
    };

    if($('#authorized').length > 0) {
        $scope.auth.isAuthenticated = true;
    }


    $scope.aUrl = $rootScope.location.absUrl();


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
    };

    $scope.setActive($scope.pages[0]);


    $scope.itemClass = function(item) {
        return item === $scope.selected ? 'active' : undefined;
    };
};

controllers.sessionsController = function($scope, $http, Service) {
    $scope.sessionYear = "";
    $scope.getSessions = function($event) {

        if($event.target.innerText && $event.target.innerText !== "") {
            $scope.sessionYear = $event.target.innerText;
        }
        Service.getAllSessions($scope.sessionYear).success(function(results) {
            $scope.sessionData = results;
        });

    };
};

controllers.sessionsViewController = function($scope, Service, $routeParams) {
    $scope.sessionData = null;

    Service.getSessionDetails($.param($routeParams)).success(function(data) {
        $scope.sessionData = data;
        console.log($scope.sessionData);
    });


};

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
        session_length:"",
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
    };
};

controllers.sessionsAdminController = function($scope,$http,Service) {
    $scope.acceptedSessions = 0;
    $scope.submittedSessions = 0;
    $scope.showSessions = false;
    $scope.showLeaders = false;
    $scope.allSessions = null;
    $scope.leaderData = null;
    $scope.sessionFilters = ['Beginner ','Agile Engineering','Team','Organization','Product Development','Personal Development','Other'];

    Service.getSessionData().success(function(data, status, headers, config) {
        $scope.submittedSessions = data.totalNumberOfSessionsSubmitted.number;
        $scope.allSessions = data.totalNumberOfSessionsSubmitted.sessions;
        $scope.acceptedSessions = data.totalNumberOfAcceptedSessions;

    });

    $scope.getSessions = function($event) {
            $scope.showSessions = $scope.showSessions === false? false : true;
    };

    $scope.getLeaders = function($event,sessionFilter) {
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
};

controllers.itemController = function($scope,$attrs,Service) {
    $scope.showVotePanel = function(id,index,event) {
        $scope.review.speakerRate = 0;
        $scope.review.contentRate = 0;
        $scope.review.applicabilityRate = 0;
        $scope.review.reviewComment = "";
        $scope.review.sessionAudience = "Please choose one...";



        $scope.review.positionReviewProp =  {
            left: event.pageX - 320,
            top: event.pageY -20
        };
        $scope.review.showWidget = true;
       $scope.review.data = $scope.allSessions[index];

        var checkSession = {
            userid: AAB_USER_ID,
            sessionid: $scope.review.data.id
        };

        Service.getSessionVoteById($.param(checkSession)).success(function(data, status, headers, config) {

            if(status === 200) {
                $scope.review.speakerRate = data[0].speaker;
                $scope.review.contentRate = data[0].content;
                $scope.review.applicabilityRate = data[0].applicability;
                $scope.review.reviewComment = data[0].note;
                $scope.review.sessionAudience = data[0].audience;
            }


        });

    };
};

controllers.ratingsWidget = function($scope,Service) {
    $scope.review.speakerRate = 0;
    $scope.review.contentRate = 0;
    $scope.review.applicabilityRate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    var sessionVote = {};


    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.saveRating = function(event) {
        $scope.review.user = AAB_USER_ID;

        if($scope.review.contentRate < 1 || $scope.review.applicabilityRate  < 1 || $scope.review.speakerRate < 1 ) {
            toastr.error('Darn it!  You gotta give a rating for all THREE options.  Thanks for understanding');
            return;
        }

        var sessionVote = {
            userid: $scope.review.user,
            session: $scope.review.data.id,
            content: $scope.review.contentRate,
            applicability: $scope.review.applicabilityRate,
            speaker: $scope.review.speakerRate,
            note: $scope.review.reviewComment,
            audience: $scope.review.sessionAudience
        };

        Service.castVote($.param(sessionVote)).success(function(data, status, headers, config) {
            toastr.success('Your vote has been cast');
            $scope.review.showWidget = false;

        }).error(function(error) {
                toastr.warning("Oh Snap!  there was an error. Our Bad.  Please Try again.");
        });

    };

    $scope.closeReview = function() {
        $scope.review.showWidget = false;
        $scope.review.positionReviewProp =  {
            left: "auto",
            top: "auto"
        };
    };
};

controllers.sponsorController = function($scope) {
    $scope.buyNow = function(event) {
        window.open("http://aab14sponsors.eventbrite.com/");
    };
};

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
    };
};


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

app.controller(controllers);


