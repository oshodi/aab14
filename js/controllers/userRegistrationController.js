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
