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

    exec: {
      run_tests_in_docker: {
        cmd(proxyPort) {
          let command = './test/e2e/init-test-project.sh && cd ./e2e-test && npx ntaf run-in-docker run-e2e-test-docker.sh';
          if (proxyPort) {
            command += ' --proxyPort=' + proxyPort;
          }

          return command;
        },
      },
      run_tests: {
        cmd() {
          return './test/e2e/init-test-project.sh && cd ./e2e-test && ./local/run-e2e-test-local.sh';
        },
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
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('test', 'Run unit tests', 'mochaTest');
  grunt.registerTask('test-with-coverage', 'Run unit tests with code coverage computation', 'mocha_istanbul');
  grunt.registerTask('doc', 'Generate JSDoc', 'jsdoc');
  grunt.registerTask('e2e-test', 'Run end-to-end tests', 'exec:run_tests');

  grunt.registerTask('e2e-test-docker', 'Run end-to-end tests in Docker containers', function () {
    let command = 'exec:run_tests_in_docker';

    const proxyPort = grunt.option('proxyPort');
    if (proxyPort) {
      command += ':' + proxyPort;
    }

    grunt.task.run([command]);
  });

};
