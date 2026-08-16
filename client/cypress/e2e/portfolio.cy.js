describe('Portfolio E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow admin to manage contacts', () => {

    cy.visit('/signin');
    cy.get('input[type="email"]').type('johnadmin22@gmail.com');  
    cy.get('input[type="password"]').type('admin123');         
    cy.contains('Submit').click();
    cy.url().should('not.include', '/signin');

    cy.visit('/contact');
    cy.contains('Contact List').should('be.visible');

    const firstName = 'Cypress';
    const lastName = 'Test';
    const email = `cypress-${Date.now()}@test.com`;

    cy.get('input[type="text"]').first().type(firstName);
    cy.get('input[type="text"]').eq(1).type(lastName);
    cy.get('input[type="email"]').type(email);
    cy.contains('Send').click();
    cy.contains('Contact created').should('be.visible');

    cy.reload();
    cy.contains('Contact List').should('be.visible'); 

    cy.contains(`${firstName} ${lastName}`).should('be.visible');

    cy.contains('Delete Contact').click();

    cy.contains(`${firstName} ${lastName}`).should('not.exist');
  });
});