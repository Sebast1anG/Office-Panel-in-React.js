describe('Login Form', () => {
    beforeEach(() => {
      cy.visit('http://192.168.0.131:3000/');
    });
  
    it('renders the login form', () => {
      cy.get('form').should('exist');
      cy.get('input[name="email"]').should('exist');
      cy.get('input[name="password"]').should('exist');
      cy.get('button[type="submit"]').should('contain', 'Login');
    });
  
    it('validates the form inputs', () => {
      cy.get('button[type="submit"]').click();
  
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
  
      cy.get('input[name="email"]').clear().type('test@example.com');
      cy.get('input[name="password"]').clear().type('short');
      cy.get('button[type="submit"]').click();
    });
  
    it('submits the form with valid data', () => {
      cy.get('input[name="email"]').clear().type('test@example.com');
      cy.get('input[name="password"]').clear().type('password123');
      cy.get('button[type="submit"]').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal(
          '{"email":"test@example.com","password":"password123"}'
        );
      });
    });
  });
  