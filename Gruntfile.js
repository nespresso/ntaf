'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: ['test/unit/test-common'],
        },
        src: ['test/unit/**/*.test.js'],
      },
    },

    mocha_istanbul: {
      coverage: {
        src: ['test/unit/**/*.test.js'],
        options: {
          coverageFolder: 'output/coverage',
          reportFormats: ['html', 'lcovonly'],
          root: './lib',
          require: ['test/unit/test-common'],
        },
      },
    },

    shell: {
      e2eTest: {
        command: './test/e2e/run-e2e-test-local.sh',
      },
      e2eTestDocker: {
        command: proxyPort => './test/e2e/docker-compose-e2e-test.sh ' + proxyPort,
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

  grunt.registerTask('e2e-test-docker', 'Run end-to-end tests in Docker containers', function () {
    let command = 'shell:e2eTestDocker';

    const proxyPort = grunt.option('proxyPort');
    if (proxyPort) {
      command += ':' + proxyPort;
    }

    grunt.task.run([command]);
  });

};
