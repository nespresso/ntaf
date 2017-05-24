'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: ['test/test-common'],
        },
        src: ['test/**/*.test.js'],
      },
    },

    mocha_istanbul: {
      coverage: {
        src: ['test/**/*.js'],
        options: {
          coverageFolder: 'output/coverage',
          reportFormats: ['html', 'lcovonly'],
          root: './lib',
          require: ['test/test-common'],
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('test', 'Run unit tests', 'mochaTest');
  grunt.registerTask('test-with-coverage', 'Run unit tests with code coverage computation', 'mocha_istanbul');

};
