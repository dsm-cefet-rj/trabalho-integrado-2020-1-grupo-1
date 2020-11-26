import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Given('que o usuario esta cadastrado como administrador', () => cy.visit('http://localhost:3000'));
Given('que o usuario estiver na pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));

And('clicou no botao de "Ver print"(btn_see_print)', () => cy.get('#btn_see_print').click());


//Time 1 venceu
When('clicar no botao "Vencedor"(btn_winner_1)', () => cy.get('#btn_winner_1').click());

Then('o sistema ira cadastrar o time 1 como vencedor', () => cy.get('#alert_msg').contains('Vencedor selecionado com sucesso!'));

And('recarrega a pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));


//Time 2 venceu
When('clicar no botao "Vencedor"(btn_winner_2)', () => cy.get('#btn_winner_2').click());

Then('o sistema ira cadastrar o time 2 como vencedor', () => cy.get('#alert_msg').contains('Vencedor selecionado com sucesso!'));

And('recarrega a pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));
