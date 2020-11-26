import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que uma partida terminou', ()=> cy.get('#btn_send_print').find('#btn-load-image'));

And ('essa partida faz parte de uma competicao', ()=> cy.find('#competition_name').should('not.be.empty'));

When('o usuario estiver na tela de partida e clicar no botao "Reportar"(btn_report)', ()=> {
    cy.get('#btn_report').Click();
});

And('descrever o comportamento estranho de um jogador', ()=> {
    cy.find('report').should('not.be.empty');
});

Then('o sistema notificara o administrador da competeicao', ()=> cy.visit('http://localhost:3000/viewMatch'));