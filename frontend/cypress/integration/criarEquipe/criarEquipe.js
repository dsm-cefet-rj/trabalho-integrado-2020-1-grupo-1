import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Given('que o usuario esta cadastrado ', () => cy.visit('http://localhost:3000'));
Given('que o usuario nao esta em nenhuma equipe', ()=> { 
    cy.get('#team_name').should('not.be.empty'),
    cy.get('#team_initials').should('not.be.empty')
});
When('estiver na pagina "Criar Equipe"(newTeam)', () => cy.visit('http://localhost:3000/newTeam'));
And('e submeter ao sistema os seguintes dados: ', () => 
    cy.get('#team_name').check(),
    cy.get('#team_initials').check(),
    cy.get('#btn_create_team').click()
);
And('clicar no botao "Criar"(btn_create_team)', () =>cy.get('#btn_create_team').click());
Then('o sistema ira registrar a equipe, dando ao usuario criador da equipe acesso as funcionalidade de administrador da equipe', ()=>cy.visit('http://localhost:3000/viewTeam'));
//And('And apos a criacao, o sistema redireciona o usuario para a tela da equipe(team)', ()=> cy.visit('http://localhost:3000/viewTeam'));


Given('que o usuario nao esta em nenhuma equipe', ()=> { 
    cy.get('#team_name').should('not.be.empty'),
    cy.get('#team_initials').should('not.be.empty')
});
When('estiver na pagina "Criar Equipe"(newTeam)', () => cy.visit('http://localhost:3000/newTeam'));
And('e submeter ao sistema os seguintes dados: ', () => 
    cy.get('#team_name').check(),
    cy.get('#team_initials').check(),
    cy.get('#btn_create_team').click()
);
And('clicar no botao "Criar"(btn_create_team)', () =>cy.get('#btn_create_team').click());
Then('o sistema ira registrar a equipe', ()=>cy.find('#team_name').should('not.be.empty'));
And('quando o usuario disputar as partidas, os outros jogadores poderao ver o nome e sigla da equipe que o usuario esta jogando', ()=> 
    cy.visit('http://localhost:3000/viewTeam'),
    cy.get(`/api/teams?name=${team.name}`)
);
