
app.directive('ratingsWidget', function () {
    return {
        restrict: 'A',
        templateurl: "partials/ratingsWidget.html",
        scope: {

        },
        link: function(scope, element,attrs) {
                scope.review = {};
                scope.review.speakerRate = 0;
                scope.review.contentRate = 0;
                scope.review.applicabilityRate = 0;
                scope.max = 5;
                scope.isReadonly = false;
                var sessionVote = {};
        }
    }
})





//controllers.ratingsWidget = function($scope,Service) {
//    $scope.review.speakerRate = 0;
//    $scope.review.contentRate = 0;
//    $scope.review.applicabilityRate = 0;
//    $scope.max = 5;
//    $scope.isReadonly = false;
//    var sessionVote = {};
//
//
//    $scope.hoveringOver = function(value) {
//        $scope.overStar = value;
//        $scope.percent = 100 * (value / $scope.max);
//    };
//
//    $scope.saveRating = function(event) {
//        $scope.review.user = AAB_USER_ID;
//
//        if($scope.review.contentRate < 1 || $scope.review.applicabilityRate  < 1 || $scope.review.speakerRate < 1 ) {
//            toastr.error('Darn it!  You gotta give a rating for all THREE options.  Thanks for understanding');
//            return;
//        }
//
//        var sessionVote = {
//            userid: $scope.review.user,
//            session: $scope.review.data.id,
//            content: $scope.review.contentRate,
//            applicability: $scope.review.applicabilityRate,
//            speaker: $scope.review.speakerRate,
//            note: $scope.review.reviewComment,
//            audience: $scope.review.sessionAudience
//        };
//
//        Service.castVote($.param(sessionVote)).success(function(data, status, headers, config) {
//            toastr.success('Your vote has been cast');
//            $scope.review.showWidget = false;
//
//        }).error(function(error) {
//                toastr.warning("Oh Snap!  there was an error. Our Bad.  Please Try again.");
//            });
//
//    };
//
//    $scope.closeReview = function() {
//        $scope.review.showWidget = false;
//        $scope.review.positionReviewProp =  {
//            left: "auto",
//            top: "auto"
//        };
//    };
//};