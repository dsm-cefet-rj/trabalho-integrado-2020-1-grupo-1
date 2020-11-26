import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('usuario cadastrado no sistema', ()=> cy.get('/api/users?email=${login}').should('not.be.empty'));

When('estiver na tela de login(signin)', ()=> cy.visit('http://localhost:3000/signin').check());
And('digitar: ',()=> 
cy.get('#lgn_username').check().should('not.be.empty'),
cy.get('#lgn_password').check().should('not.be.empty'));
And('clicar em "Entrar" btn_login', ()=> cy.get('#btn_login').click() );
Then('o usuario sera redirecionado para o Index', ()=> cy.visit('http://localhost:3000/index'));

Given('usuario nao cadastrado no sistema', ()=> cy.get('/api/users?email=${login}').should('be.empty'));
When('estiver na tela de login(signin)', ()=> cy.visit('http://localhost:3000/signin').check());
And('clicar no link para o cadastro', ()=> cy.get('Link to="/signup" id="signup').click());
Then('o usuario sera redirecionado para a pagina de cadastro(signup)', ()=> cy.visit('http://localhost:3000/signup'));