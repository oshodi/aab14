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