import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Given('que o usuario esta cadastrado como administrador', () => cy.visit('http://localhost:3000'));
Given('que o usuario estiver na pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));

And('clicou no botao de "Excluir competicao"(btn_delete_comp)', () => cy.get('#btn_delete_comp').click());


//Confirma exclusao
When('clicar no botao "Sim"(btn_confirm_leave)', () => cy.get('#btn_confirm_leave').click());

Then('o sistema ira excluir a competitcao', () => cy.get('#alert_msg').contains('Competição deletada com sucesso!'));

And('redireciona o sistema para a pagina inicial(home)', () => cy.visit('http://localhost:3000/home'));


//Cancela exclusao
When('clicar no botao "Nao"(btn_cancel_leave)', () => cy.get('#btn_cancel_leave').click());

Then('volta para a pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));
