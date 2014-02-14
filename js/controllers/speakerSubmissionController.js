controllers.speakerSubmissionController = function($scope,$modal,$log,$rootScope,Service) {
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

    //display speakers.  Might want to move this to another controller in the future

    $scope.speakerData = [];

    Service.getSpeakers().success(function(data,status,headers,config) {
        $scope.speakerData = data;
    });


    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (index) {

        var modalInstance = $modal.open({
            templateUrl: 'partials/speakerView.html',
            controller: controllers.ModalInstanceCtrl,
            resolve: {
                items: function () {
                    return $scope.items;
                },
                speaker: function() {
                    //$scope.speakerData[index].bio = $scope.speakerData[index].bio.replace(/\n/g, '<br />');
                    return $scope.speakerData[index];

                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
};


