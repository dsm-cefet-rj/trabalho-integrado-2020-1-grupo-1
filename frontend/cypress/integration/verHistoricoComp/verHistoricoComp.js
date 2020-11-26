import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('o usuario ja disputou alguma competicao', ()=> { 
    cy.get().type()
});

And('esta em uma equipe', () => {
    cy.get('#team_name').should('not.be.empty')
});

When('o usuario clica em "Visualizar"(btn_viewTeam), na tela de equipe', () => {
    cy.click('#btn_viewTeam').check()
});

Then('o sistema ira buscar nome e data das ultimas tres competicoes que a equipe do usuario tenha participado', () => {});

And('os dados ficar�o expostos na aba "Historico de Competicoes"', () => {});
