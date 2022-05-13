  xdescribe('Test home page', () => {
    it('Visits the home page', () => {
      cy.visit('/')
      cy.contains('Share your opinion!')
      cy.contains('Foros Recientes')
    })
  })
  
  