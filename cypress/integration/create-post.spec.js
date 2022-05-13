describe('Test post', () => {
    it('create post sin usuario', () => {
      cy.visit('/new-post');
      cy.contains('Share your opinion!');
    });

    it('create post con usuario', () => {
        cy.visit('/login');
        cy.contains("Don't have an account?");
        cy.get('input[name="email"]').type('Qkeys@a.com');
        cy.get('input[name="password"]').type('Vacalola');
        cy.get('button').first().click();
        cy.contains('Share your opinion!');
        cy.get('button').first().click();
        cy.get('.forum').get('button').last().click();
        cy.get('button[name="crear"]').click();
        cy.contains('publicar');
      });
});