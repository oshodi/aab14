module.exports = function(config) {
    config.set({
        files : [
            './js/thirdparty/jquery/jquery.min.js',
            './js/thirdparty/angular/angular.js',
            './js/thirdparty/angular-route/angular-route.js',
            './js/thirdparty/angular-mocks/angular-mocks.js',
            './spec-helpers/**/*.js',
            './js/thirdparty/toastr/toastr.min.js',
            './js/app.js',
            './js/controllers/controllers.js',
            './spec/*Spec.js'
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