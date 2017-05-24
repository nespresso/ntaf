'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    clean: ['output', 'log'],

    mkdir: {
      prepare: {
        options: {
          create: ['log', 'output', 'output/errorShots'],
        },
      },
    },

    copy: {
      generateLocalConf: {
        expand: true,
        flatten: true,
        src: 'node_modules/ntaf/template/wdio.*.conf.js',
        dest: '.',
      },
    },

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
          root: './src',
          require: ['test/test-common'],
        },
      },
    },

    webdriver: {
      test: {
        configFile: 'wdio.conf.js',
      },
      debug: {
        configFile: 'wdio.debug.conf.js',
      },
      local: {
        configFile: 'wdio.local.conf.js',
      },
    },
  });

  /**
   * @desc Returns config passed in command line parameters for webdriverio
   * @returns {Object}
   */
  function getTestConfig() {
    // Get parameters for test-functional-*
    const baseUrl = grunt.option('baseUrl');
    const tags = grunt.option('tags');
    const timeout = grunt.option('timeout');
    let config = { webdriver: { options: { cucumberOpts: {} } } };

    if (baseUrl) {
      config.webdriver.options.baseUrl = baseUrl;
    }

    if (tags) {
      config.webdriver.options.cucumberOpts.tags = tags.split(',');
    }

    if (timeout) {
      config.webdriver.options.cucumberOpts.timeout = timeout;
    }

    return config;
  }

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-webdriver');

  grunt.registerTask('prepare', 'Clean up and prepare', ['clean', 'mkdir:prepare']);

  grunt.registerTask('test-functional', 'Run functional tests', function () {
    grunt.config.merge(getTestConfig());
    grunt.task.run(['prepare', 'webdriver:test']);
  });

  grunt.registerTask('test-functional-local', 'Run functional tests locally', function () {
    grunt.config.merge(getTestConfig());
    grunt.task.run(['prepare', 'webdriver:local']);
  });

  grunt.registerTask('test-functional-debug', 'Run functional tests in debug mode', function () {
    grunt.config.merge(getTestConfig());
    grunt.task.run(['prepare', 'webdriver:debug']);
  });

  grunt.registerTask('test-unit', 'Run unit tests', ['prepare', 'mochaTest']);
  grunt.registerTask('test-unit-with-coverage', 'Run unit tests with code coverage computation', ['prepare', 'mocha_istanbul']);

};
