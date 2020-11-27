import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que o usuario esta cadastrado no sistema', ()=> { 
    cy.get('/api/users?email=${login}').should('not.be.empty')
});

When('informa seu email(lgn_email) para retificacao de senha', () => {
    cy.get('#lgn_email').should('not.be.empty')
});

Then('sera encaminhado um link para a tela de alteracao de senha(recover2)', () => 
    cy.visit('http://localhost:3000/recover2').check(),
);

Given('que o usuario esta cadastrado no sistema', () => { 
    cy.get('/api/users?email=${login}').should('not.be.empty')
});

And('esta na tela de alteracao de senha(recover2)', () => {
    cy.visit('http://localhost:3000/recover2').check()
})

When('o usuario informa sua senha(recover_password) e confirma a senha (recover_confirm_password)', () => {
    cy.get('#recover_password').check()
    cy.get('#recover_confirm_password').check()
});

And('clica em "Salvar" (btn_recover_save)', () => 
    cy.get('#btn_recover_save').click()
);

Then('o sistema altera a senha do usuario', () => {
    cy.find('#signup_password').should('not.be.empty')
});
