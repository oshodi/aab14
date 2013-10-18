describe('Testing Agile and beyond page', function() {

    describe('App', function() {
        var $scope = null;
        var ctrl = null;

        //you need to indicate your module in a test
        beforeEach(module('AgileAndBeyondApp'));



       describe('Test speakerSubmissionController', function() {
           beforeEach(inject(function($rootScope, $controller) {
               $scope = $rootScope.$new();

               ctrl = $controller('speakerSubmissionController', {
                   $scope: $scope
               });
           }));

           it('should set submit button to false', function() {
               expect($scope.isSubmitDisabled).toBeFalsy();
           })


       });


       describe('mainController', function() {
           beforeEach(inject(function($rootScope,$controller) {
               $scope = $rootScope.$new();
               ctrl = $controller('mainController', {
                   $scope: $scope
               });
           }));

           it('should be true', function() {

           })
       });

    });



});