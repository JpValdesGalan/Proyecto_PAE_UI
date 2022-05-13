const { first } = require("rxjs");

describe('Test login page', () => {
    xit('Login in the app and see user', () => {
        cy.visit('/');
        cy.get('a[name="login"]').click();
        cy.contains("Don't have an account?");
        cy.get('input[name="email"]').type('Qkeys@a.com');
        cy.get('input[name="password"]').type('Vacalola');
        cy.get('button').first().click();
        cy.contains('Share your opinion!')
        cy.get('a[name="user"]').click();
        cy.contains("El usuario se creo el:");
      });
});
