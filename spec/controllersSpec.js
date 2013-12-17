'use strict';
describe('Testing Agile and beyond page', function() {
    var $compile,$rootScope, scope, ctrl, mockedService;

    beforeEach(module('AgileAndBeyondApp', function($provide) {
        mockedService = {
            getAllSessions: jasmine.createSpy().andReturn({
                success: function(data) {
                    return data;
                }
            }),
            getSessionDetails: jasmine.createSpy().andReturn({
                success: function(data){return data}
            }),
            getSessionsById: jasmine.createSpy().andReturn({
                success: function(data){return data}
            })
        };

        $provide.value('mockService', mockedService);

    }));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    describe('mainController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('mainController', {$scope: scope});
        }));


        it('should not be accepting proposals', function($controller, $rootScope) {
            expect(scope.acceptingProposals).toBe(false);
        });

        it('should have an empty sessionData set', function() {
            expect(scope.sessionData).toBeDefined();
        })

        it('should only accept proposals between dates listed in config', function() {
            var sampleConfig = {
                openDate: 'Mon Sep 30 2013',
                closeDate: 'Tue Nov 11 2013'
            }
            scope.acceptingProposalsCheck(sampleConfig);
            expect(scope.acceptingProposals).toBe(false);
        });

        it('should accept proposals if todays date is between the start and end date in the config', function() {
            var today = new Date();
            var sampleConfig = {
                openDate: today.setDate( today.getDate() - 20 ),
                closeDate: today.setDate( today.getDate() + 20 )
            };
            scope.acceptingProposalsCheck(sampleConfig);
            expect(scope.acceptingProposals).toBe(true);
        });
    });

    describe('sessionsController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('sessionsController', {$scope: scope, Service: mockedService});
        }));

        it('should set the the year when passed one', function() {
            var sampleEvent = {
                target: {
                    innerText: "2013"
                }
            };
            scope.getSessions(sampleEvent);
            expect(scope.sessionYear).toEqual("2013");
            expect(mockedService.getAllSessions).toHaveBeenCalledWith("2013");
        });

        it('should not set a year when not passed one', function() {
            var sampleEvent = {
                target: {
                    innerText: ""
                }
            };
            scope.getSessions(sampleEvent);
            expect(scope.sessionYear).toEqual("");
            expect(mockedService.getAllSessions).toHaveBeenCalledWith("");
        });
    });

    describe('sessionsViewController',function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('sessionsViewController', {$scope: scope, Service: mockedService});
        }));

        it('should call the getSessionDetails service', function() {

            expect(mockedService.getSessionDetails).toHaveBeenCalled();
            expect(mockedService.getSessionDetails).toHaveBeenCalledWith("");
            expect(scope.sessionData).toBe(null);
        });
    });

    describe('sessionAcceptanceController',function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('sessionAcceptanceController', {$scope: scope, Service: mockedService});
        }));

        it('session.accepted should be false by default', function() {
            expect(scope.session.accepted).toBe(false)
        });

        it('should call validation alert if checkbox not clicked', function() {
            spyOn(toastr, 'warning');
            scope.moveNext();

            expect(toastr.warning).toHaveBeenCalled();
        });

        it('should activate the next pane if session.accepted equals true and moveNext is fired', function() {

            var paneElement = angular.element('<div class="tab-pane active"/><div class="tab-pane"/><div class="tab-pane"/>');
            var liElement = angular.element('<ul class="nav-tabs"><li class="active" /><li /><li /></ul>')
            angular.element('body').append(paneElement);
            angular.element('body').append(liElement);
            scope.session.accepted = true;
            scope.moveNext();
            var secondPane = paneElement.get(1);
            var secondLi = angular.element('.nav-tabs li').get(1);

            expect(secondPane).toHaveClass('active');
            expect(secondLi).toHaveClass('active');
        });

        it('should load user data', function() {
            expect(scope.user).toBeDefined();
            expect(mockedService.getSessionsById).toHaveBeenCalled();
        })

        xdescribe('declineSession', function() {
            it('should call declineSession when clicked', function() {
                var element = $compile('<button class="triggerDecline btn btn-danger" data-ng-click="declineSession()">Decline Session</button>')($rootScope);
                $rootScope.$digest();
                angular.element('body').append(element);
                spyOn(scope, 'declineSession');
                angular.element('triggerDecline').trigger('click');
                expect(scope.declineSession).toHaveBeenCalled();
            })

        });

    });
});