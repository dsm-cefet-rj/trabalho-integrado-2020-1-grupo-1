import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que o usuario esta logado', ()=> cy.get('/api/userteam/${user?.username}').should('not.be.empty'));
And('o usuario esteja sem equipe', ()=> 
    cy.get('{team?.name}').should('be.empty'),
    cy.get('{team?.entryYear}').should('be.empty'));
When('recebe um link com convite para entrar em uma equipe', ()=> 
    cy.get('{invite.nome_equipe}'),
    cy.get('{invite.sigla_equipe}'));
And('clica no link, aceitando', ()=> cy.get('btn_accept').click());
Then('o sistema cadastra o usuario em uma equipe', ()=> {
    const user = cy.get("#invite.user_convidado")
    cy.get('member.username').contains(user)});
And('adiciona os dados da equipe e data de entrada na tela principal do usuario', ()=> 
    cy.get('{team?.name}'),
    cy.get('{team?.entryYear}')
);

Given('que o usuario esta logado', ()=> cy.get('/api/userteam/${user?.username}').should('not.be.empty'));
And('o usuario esteja sem equipe', ()=> 
    cy.get('{team?.name}').should('be.empty'),
    cy.get('{team?.entryYear}').should('be.empty'));
When('recebe um link com convite para entrar em uma equipe', ()=> 
    cy.get('{invite.nome_equipe}'),
    cy.get('{invite.sigla_equipe}'));
And('clica no link, rejeitando', ()=> cy.get('btn_reject').click());
Then('o sistema redireciona o jogador para a pagina das equipes(team)', ()=> cy.visit('http://localhost:3000/team'));

Given('que o usuario esta logado', ()=> cy.get('/api/userteam/${user?.username}').should('not.be.empty'));
And('esteja em uma equipe', ()=> cy.get('{team?.name}').should('not.be.empty'),
cy.get('{team?.entryYear}').should('not.be.empty'));
When('clica no botao "Sair da Equipe"(btn_leave)', ()=>
cy.get('#btn_leave').click());
And('Confirma a saida',()=> 
cy.get('btn_confirm_leave').click());
Then('o sistema remove o usuario da equipe, retirando os dados da equipe do index do usuario', ()=> 
cy.get('exitTeam()'));

Given('que o usuario esta logado', ()=> cy.get('/api/userteam/${user?.username}').should('not.be.empty'));
And('esteja em uma equipe', ()=> cy.get('{team?.name}').should('not.be.empty'),
cy.get('{team?.entryYear}').should('not.be.empty'));
When('clica no botao "Sair da Equipe"(btn_leave)', ()=>
cy.get('#btn_leave').click());
And('nao confirma a saida',()=> 
cy.get('btn_cancel_leave').click());
Then('o sistema redireciona o usuario para a tela da equipe(team)', ()=> 
cy.visit('http://localhost:3000/team'));

