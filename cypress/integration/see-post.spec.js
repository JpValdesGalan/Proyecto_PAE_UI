describe('ver post', () => {
    it('Ver post con sesión', () => {
        cy.visit('/login');
        cy.contains("Don't have an account?");
        cy.get('input[name="email"]').type('Qkeys@a.com');
        cy.get('input[name="password"]').type('Vacalola');
        cy.get('button').first().click();
        cy.contains('Share your opinion!');
        cy.get('button').first().click();
        cy.get('.forum').get('button').last().click();
        cy.get('button').last().click();
        cy.contains('Posted by:');
      });

      it('Ver post sin sesión', () => {
        cy.visit('/');
        cy.contains('Share your opinion!');
        cy.get('button').first().click();
        cy.get('.forum').get('button').last().click();
        cy.get('button').last().click();
        cy.contains('Posted by:');
      });
});