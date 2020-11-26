import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que o usuario j� venceu competicoes', ()=> { 
    cy.get().type()
});

And('esta cadastrado no sistema', () => {
    cy.get('/api/users?email=${login}').should('not.be.empty')
});

When('estiver na tela p�s login(Index)', () => {
    cy.visit('http://localhost:3000/index').check()
});

And('clicar na aba "Titulos"', () => {

});

Then('o sistema recupera o nome do torneio data dos titulos obtidos, deixando-os a amostra na aba "Titulos"', () => {});

