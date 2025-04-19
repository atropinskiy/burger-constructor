describe('Конструктор бургера', () => {
  it('Перетаскивание ингредиента в рабочую область', () => {
    // Перехватываем запрос к внешнему API и логируем его
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getIngredients');
    
    // Переходим на главную страницу
    cy.visit('/');
    
    // Ожидаем, пока запрос завершится и логируем ответ
    cy.wait('@getIngredients').then((interception) => {
      console.log('Intercepted request:', interception);
      expect(interception.response.statusCode).to.eq(200);
    });
    
    // Проверяем, что ингредиенты появились на странице
    cy.get('[data-testid="ingredient-1"]').should('exist');
    
    // Перетаскиваем ингредиент в рабочую область
    cy.get('[data-testid="ingredient-1"]').drag('[data-testid="burger-container"]');
    
    // Проверяем, что ингредиент был добавлен в рабочую область
    cy.get('[data-testid="burger-container"]').should('contain', 'Булка');
  });
});
