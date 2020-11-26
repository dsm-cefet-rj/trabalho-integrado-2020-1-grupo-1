import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Given('que o usuario esta cadastrado como administrador', () => cy.visit('http://localhost:3000'));
Given('que o usuario estiver na pagina "Nova competicao"(newCompetition)', () => cy.visit('http://localhost:3000/newCompetition'));

When('submeter ao sistema os seguintes dados: ', () => 
cy.get('#competition_name').check(),
cy.get('#competition_initials').check(),
cy.get('#competition_level').check(),
cy.get('#competition_initial_date').check(),
cy.get('#competition_initial_time').check(),
cy.get('#competition_final_date').check(),
cy.get('#competition_final_date').check(),
cy.get('#competition_initial_subscription_date').check(),
cy.get('#competition_final_subscription_date').check(),
cy.get('#competition_awards').check(),
cy.get('#competition_rules').check(),
cy.get('#competition_qty_teams').check(),
cy.get('#btn_create_competition').click()
);

Then('o sistema ira registrar a competicao, dando ao usuario criador da competicao acesso as funcionalidade de administrador da competicao', ()=>cy.visit('http://localhost:3000/myCompetition'));
