module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      // Make sure code styles are up to par and there are no obvious mistakes
      jshint: {
          all: ['Gruntfile.js', 'js/controllers/*.js', 'js/app.js']
    },
    jasmine: {
        src: ['js/thirdparty/angular*.js','js/app.js', 'js/controllers/controllers.js'],
        options: {
            specs: 'spec/*Spec.js',
            host: 'http://127.0.0.1:8888/aab14/',
            template: require('grunt-template-jasmine-requirejs')
        }
    },
    less: {
          development: {
              options: {
                  paths: ["css/"]
              },
              files: {
                  "css/main.css": "css/main.less"
              }
          },
          production: {
              options: {
                  paths: ["css/"],
                  cleancss: true
              },
              files: {
                  "css/main.css": "css/main.less"
              }
          }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/controllers/controllers.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('css', ['less:development']);
  grunt.registerTask('test', ['less:development','jasmine']);
  grunt.registerTask('pretty', ['less:development','jshint']);

};
