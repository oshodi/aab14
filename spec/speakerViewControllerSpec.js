'use strict';
describe('SpeakerViewController spec' , function() {
    var $compile,$rootScope, scope, ctrl, mockedService;

    beforeEach(module('AgileAndBeyondApp', function($provide) {}));
    beforeEach(inject(function(_$compile_, _$rootScope_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('speakerViewController', {$scope: scope});

    }));

    it('should intialize the speaker object', function() {
        expect(scope.speakerData.firstName).toBeNull();
    });



});