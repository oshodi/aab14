'use strict';
describe('Testing Agile and beyond page', function() {
    var $rootScope;
    var $compile;
    beforeEach(module('AgileAndBeyondApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        //declare the controller and inject our empty scope
        //$controller('MainCtrl', {$scope: scope});
    }));




    describe('mainController', function() {
        it('should exist', inject(function($controller, $rootScope) {
            var ctrl = $controller('mainController', {
                $scope: $rootScope
            });

            expect($rootScope.data).toBe(something);

        }));
    });
});