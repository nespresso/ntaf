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
        src: ['test/**/*test.js'],
        options: {
          coverageFolder: 'output/coverage',
          reportFormats: ['html', 'lcovonly'],
          root: './lib',
          require: ['test/test-common'],
        },
      },
    },

    shell: {
      e2eTest: {
        command: [
          'echo "Creating test project directory..."',
          'rm -rf e2e-test',
          'mkdir e2e-test',
          'cd e2e-test',
          'echo "Test project directory created."',
          'cp ../test/e2e/e2e-test.sh .',
          './e2e-test.sh',
        ].join('&&'),
      },
    },

    jsdoc: {
      dist: {
        src: ['lib/browser-command/*.js', 'lib/helper/helper.js'],
        options: {
          destination: 'docs',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', 'Run unit tests', 'mochaTest');
  grunt.registerTask('test-with-coverage', 'Run unit tests with code coverage computation', 'mocha_istanbul');
  grunt.registerTask('doc', 'Generate JSDoc', 'jsdoc');
  grunt.registerTask('e2e-test', 'Run end-to-end tests', 'shell:e2eTest');
};
