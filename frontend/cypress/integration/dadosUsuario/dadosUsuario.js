import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('existe um usuario nao cadastrado no sistema', () => cy.visit('http://localhost:3000'));

When('estiver na tela de cadastro(signup), preenche:', () =>

    cy.get('form').find('[name ="signup_name"]').check(),
    cy.get('form').find('[username ="lgn_username"]').check(), 
    cy.get('form').find('[profile_picture ="btn_select_image"]').check(), 
    cy.get('form').find('[email ="signup_email"]').check(),
    cy.get('form').find('[password ="signup_password"]').check()
);

And('Clica em confirmacao de cadastro', () =>{ 
    cy.get('form').find('[name="cb_policies"]').click()
});

Then('o sistema cadastra o usuario e redireciona para a tela de login', ()=> cy.visit("index"));