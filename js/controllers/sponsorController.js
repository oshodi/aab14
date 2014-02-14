controllers.sponsorController = function($scope, Service) {
    $scope.buyNow = function(event) {
        window.open("http://aab14sponsors.eventbrite.com/");
    };

    $scope.sponsorData = {};

    Service.getSponsors().success(function(data, status, headers, config){
        $scope.sponsorData = data;
        console.log(data);
    });
};