module.exports = function(config) {
    config.set({
        files : [
            'aab14/js/thirdparty/jquery/jquery.min.js',
            'aab14/js/thirdparty/angular/angular.js',
            'aab14/js/thirdparty/angular-route/angular-route.js',
            'aab14/js/thirdparty/angular-mocks/angular-mocks.js',
            'aab14/spec-helpers/**/*.js',
            'aab14/js/thirdparty/toastr/toastr.min.js',
            'aab14/js/app.js',
            'aab14/js/controllers/*Controller.js',
            'aab14/js/controllers/controllers.js',
            'aab14/spec/*Spec.js'
        ],
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['coverage'],
        browsers: ['Chrome'],
        autoWatch: false,
        singleRun: true,
        colors: true
    });
};