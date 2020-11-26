import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que a equipe do usuario esta inscrita em uma competicao', ()=> { 
    cy.get().type()
});

When('acessarem a tela de competicoes(competition), atraves do menu(btn_menu)', () => {
    cy.click('#btn_menu').check()
    cy.visit('http://localhost:3000/competition').check()
});

Then('o sistema apresentara as competicoes que a equipe esta inscrita', () => {});
