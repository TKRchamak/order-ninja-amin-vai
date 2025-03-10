describe('Login Form Submission', () => {
  // individual test
  it('should submit the login form with valid credentials', () => {
    cy.visit('http://localhost:5173/login');

    // login function call start
    cy.get('#normal_login_email').type('supplier@gmail.com');
    cy.get('#normal_login_password').type('12345678');
    cy.get('button[type="submit"]').click();
    // login function call end
    // cy.url().should('eq', 'http://localhost:5173/dashboard'); // Assuming successful login redirects to '/dashboard'

    cy.wait(3000);

    // Order page start
    cy.get('.ant-menu-item').contains('Order').click();
    cy.wait(3000);

    // product page start
    cy.get('.ant-menu-item').contains('Products').click();
    cy.wait(3000);

    // open product drawer
    cy.get('.ant-btn-primary').contains('Add New Product').click();

    // start fillUp form
    cy.get('#form_item_path_name').type('Banana');
    cy.get('.ant-select-selector').click();
    // cy.get('.ant-select-dropdown-menu-item').contains('Sauces & Pickles').click();
    cy.get('.ant-select-item-option-content').contains('Sauces & Pickles').click();
    cy.get('#generate').contains('Generate').click();
    cy.wait(5000);

    // cy.get('#form_item_path_description').type('this is Banana');
    cy.get('#form_item_path_unit_size').type('500');
    cy.get('#form_item_path_price').type('1500');
    cy.get('#form_item_path_weight').type(1500);
    cy.get('#form_item_path_stock').type('30');
    cy.get('input[placeholder="Select date"]').click();
    cy.get('.ant-picker-cell-inner').contains("22").click();
    cy.get('span').contains('Select File').selectFile('C:\/Users\/tkrch\/OneDrive\/Desktop\/fruites_img\/charlesdeluvio-0v_1TPz1uXw-unsplash.jpg', { action: 'drag-drop' });
    // end fillUp form.


    //submit product create form
    cy.get('span').contains('Submit').click();
    cy.wait(5000);
    // Order page start
    cy.get('.ant-menu-item').contains('Sales Report').click();
    cy.wait(3000);


    cy.url().should('eq', 'http://localhost:5173/report'); // Assuming successful login redirects to '/dashboard'
    // product page end

    cy.get('.ant-menu-title-content').contains('Logout').click();
  });
})

