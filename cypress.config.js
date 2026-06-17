const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: false,
    json: true
  },

  e2e: {
    baseUrl: 'https://serverest.dev',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
