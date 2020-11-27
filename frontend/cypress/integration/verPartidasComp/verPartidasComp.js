import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('a competicao esta em andamento', ()=> { 
    cy.get().type()
});

When('o usuario entrar na tela da competicao (viewCompetition)', () => {
    cy.visit('http://localhost:3000/viewCompetition').check()
});

Then('o sistema ira mostrar o chaveamento com todas as partidas do torneio', () => {});

Given('a competicao esta em andamento', ()=> { 
    cy.get().type()
});

When('o usuario entrar na tela da competicao (viewCompetition)', () => {
    cy.visit('http://localhost:3000/viewCompetition').check()
});

And('clicar no botao da equipe na competicao(competition_team_numero)', () => {
    cy.click('#competition_team_numero').check()
});

Then('o sistema ira abrir a tela da partida(viewMatch)', () => {
    cy.visit('http://localhost:3000/viewMatch').check()
});