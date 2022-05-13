describe('Test login page', () => {
    it('Login in the app', () => {
      cy.visit('/');
      cy.get('a[name="login"]').click();
      cy.contains("Don't have an account?");
      cy.get('input[name="email"]').type('Qkeys@a.com');
      cy.get('input[name="password"]').type('Vacalola');
      cy.get('button').first().click();
      cy.contains('Share your opinion!')
    });

    it('Login in the app with wrong credentials', () => {
        cy.visit('/login');
        cy.contains("Don't have an account?");
        cy.get('input[name="email"]').type("Qkeys@aa.com");
        cy.get('input[name="password"]').type("Vacalola");
        cy.get('button').first().click();
        cy.contains("Don't have an account?");
      });


  })
