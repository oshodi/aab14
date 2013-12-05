'use strict';
describe('Testing Agile and beyond page', function() {
    var scope;
    beforeEach(angular.mock.module('AgileAndBeyondApp'));

    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        //$controller('MainCtrl', {$scope: scope});
    }));
});