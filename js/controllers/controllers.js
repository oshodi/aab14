
var controllers = {};
toastr.options = {
    "positionClass": "toast-bottom-full-width"
}
controllers.homeController = function() {};

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

app.controller(controllers);


