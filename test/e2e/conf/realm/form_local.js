module.exports = {
  baseUrl: 'http://localhost:8080',
  specs: [
    './src/features/form-browser-commands.feature',
  ],
  reporterOptions: {
    json: {
      outputDir: 'output-form_local/json/',
      filename: 'report',
      combined: 'true',
    },
  },
};
