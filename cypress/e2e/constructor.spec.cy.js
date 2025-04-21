describe('Конструктор бургера', () => {
  it('Открытие модального окна с деталями ингредиента', () => {
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
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should('be.visible');

    // Проверяем, что в модельном окне есть детали данные об ингредиенте.
    cy.get('[data-testid="ingredient-details-body"]').should('be.visible');

    // Нажимаем на закрытие модалки
    cy.get('[data-testid="close-modal"]').click();

    // Проверяем, что модалка закрылась
    cy.get('[data-testid="modal"]').should('not.exist');

  });

});

describe('Перетаскивание', () => {
  it('Перетаскивание ингредиента', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getIngredients');
    
    cy.visit('/');
    
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Перетаскиваем ингредиент
    cy.get('[data-testid="ingredient-card"]').eq(3)
      .trigger('dragstart');
    
    cy.get('[data-testid="constructor-area"]').first()
      .trigger('dragover')
      .trigger('drop');
    
    cy.get('[data-testid="ingredient-card"]').eq(3)
      .trigger('dragend');
    
    // Проверяем наличие элемента с правильным data-testid
    cy.get('[data-testid="filligs-element"]') // Обратите внимание на написание
      .should('exist')
      .and('be.visible');
    
    // Дополнительная проверка по тексту
    cy.contains('[data-testid="filligs-element"]', 'Соус фирменный Space Sauce')
      .should('exist');

    cy.wait(2000)
  });


});

describe('Создание заказа', () => {
  beforeEach(() => {
    // Выполняем вход перед каждым тестом
    cy.visit('/login');
    cy.get('input[name=login]').type('vaskaop@mail.ru');
    cy.get('input[name=password]').type('Qq123123!');
    cy.get('button[type=submit]').click();
    cy.wait(2000)
    cy.url().should('include', '/'); // Проверяем что перешли на главную
    
  });
  it('Создание заказа', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients').as('getIngredients');
    
    cy.visit('/');
    
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Перетаскиваем ингредиент
    cy.get('[data-testid="ingredient-card"]').eq(3)
      .trigger('dragstart');
    
    cy.get('[data-testid="constructor-area"]').first()
      .trigger('dragover')
      .trigger('drop');
    
    cy.get('[data-testid="ingredient-card"]').eq(3)
      .trigger('dragend');
    
    // Проверяем наличие элемента с правильным data-testid

    cy.get('button[test-id=order-button]').click();
    cy.wait(20000)
    cy.get('[test-id="order_modal"]').should('be.visible');
  });
});
