import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',   // <-- changed from 3000 to 5173
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
  },
  video: true,
  screenshotOnRunFailure: true,
});