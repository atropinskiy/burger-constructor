// Константы для селекторов
const INGREDIENT_CARD = '[data-testid="ingredient-card"]';
const MODAL = '[data-testid="modal"]';
const CLOSE_MODAL_BTN = '[data-testid="close-modal"]';
const INGREDIENT_DETAILS_BODY = '[data-testid="ingredient-details-body"]';
const CONSTRUCTOR_AREA = '[data-testid="constructor-area"]';
const FILLINGS_ELEMENT = '[data-testid="filligs-element"]';
const ORDER_BUTTON = 'button[test-id=order-button]';
const ORDER_MODAL = '[data-testid="order_modal"]';

// Кастомная команда для входа
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name=login]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
  cy.wait(2000);
  cy.url().should('include', '/'); // Проверяем, что перешли на главную
});

describe('Конструктор бургера', () => {
  it('Открытие модального окна с деталями ингредиента', () => {
    cy.intercept('GET', '/api/ingredients').as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients').then((interception) => {
      console.log('Intercepted request:', interception);
      expect(interception.response.statusCode).to.eq(200);
    });
    
    cy.get(INGREDIENT_CARD).first().click();
    cy.get(MODAL).should('be.visible');
    cy.get(INGREDIENT_DETAILS_BODY).should('be.visible');
    cy.get(CLOSE_MODAL_BTN).click();
    cy.get(MODAL).should('not.exist');
  });
});

describe('Перетаскивание', () => {
  it('Перетаскивание ингредиента', () => {
    cy.intercept('GET', '/api/ingredients').as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get(INGREDIENT_CARD).eq(3).trigger('dragstart');
    cy.get(CONSTRUCTOR_AREA).first()
      .trigger('dragover')
      .trigger('drop');
    cy.get(INGREDIENT_CARD).eq(3).trigger('dragend');
    
    cy.get(FILLINGS_ELEMENT).should('exist').and('be.visible');
    cy.contains(FILLINGS_ELEMENT, 'Соус фирменный Space Sauce').should('exist');
    cy.wait(2000);
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.login('vaskaop@mail.ru', 'Qq123123!');
  });
  
  it('Создание заказа', () => {
    cy.intercept('GET', '/api/ingredients').as('getIngredients');
    
    cy.visit('/');
    cy.wait('@getIngredients').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get(INGREDIENT_CARD).eq(3).trigger('dragstart');
    cy.get(CONSTRUCTOR_AREA).first()
      .trigger('dragover')
      .trigger('drop');
    cy.get(INGREDIENT_CARD).eq(3).trigger('dragend');
    
    cy.get(ORDER_BUTTON).click();
    cy.wait(20000);
    cy.get(ORDER_MODAL).should('be.visible');
  });
});
