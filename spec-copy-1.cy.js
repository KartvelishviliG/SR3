describe('Favorite Books Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('button.btn-warning').click(); // Нажатие на кнопку логина
    cy.get('input[type=email]').type('bropet@mail.ru');
    cy.get('input[type=password]').type('123');
    cy.get('button[type=submit]').click();
  });

  it('should add a book to favorites', () => {
    cy.get('button.btn-warning').click();
    cy.get('input[name=title]').type('Test Book');
    cy.get('button[type=submit]').click();
    cy.get('.book-item').contains('Test Book').within(() => {
      cy.get('button.btn-success').click();
    });
    cy.get('.favorites').should('contain', 'Test Book');
  });

  it('should remove a book from favorites', () => {
    cy.get('.book-item').contains('Test Book').within(() => {
      cy.get('button.btn-secondary').click(); // Сначала добавим в избранное
    });
    cy.get('.favorites').contains('Test Book').within(() => {
      cy.get('.remove-favorite-button').click(); // Потом удалим из избранного
    });
    cy.get('.favorites').should('not.contain', 'Test Book');
  });

  it('should display favorite books', () => {
    cy.get('.book-item').contains('Test Book').within(() => {
      cy.get('.favorite-button').click(); // Добавление в избранное
    });
    cy.get('.favorites').should('contain', 'Test Book');
  });
});