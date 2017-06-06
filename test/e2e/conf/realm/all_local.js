module.exports = {
  baseUrl: 'http://localhost:8080',
  specs: [
    './src/features/**/*.feature',
  ],
  reporterOptions: {
    json: {
      outputDir: 'output-all_local/json/',
      filename: 'report',
      combined: 'true',
    },
  },
};
