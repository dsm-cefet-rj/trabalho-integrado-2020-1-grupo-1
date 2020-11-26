import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Given('que o usuario esta cadastrado como administrador', () => cy.visit('http://localhost:3000'));
Given('que o usuario estiver na pagina "Sua competicao"(myCompetition)', () => cy.visit('http://localhost:3000/myCompetition'));

When('clicar no botao de editar data e horario', () => cy.get('#btn_edit_datehour').click());

And('submeter ao sistema os seguintes dados: ', () => 
cy.get('#edit_date').check(),
cy.get('#edit_time').check(),
cy.get('#btn_save_edit').click()
);

Then('o sistema ira alterar a data/horario da competicao e retornar a pagina "Sua competicao"(myCompetition)', ()=>cy.visit('http://localhost:3000/myCompetition'));
