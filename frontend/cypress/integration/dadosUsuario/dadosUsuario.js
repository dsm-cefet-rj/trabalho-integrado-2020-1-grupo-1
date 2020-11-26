import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('existe um usuario nao cadastrado no sistema', () => cy.get('/api/users?email=${login}').should('not.be.empty'));

When('estiver na tela de cadastro(signup), preenche:', () =>

    cy.get('form').find('[name ="signup_name"]').check(),
    cy.get('form').find('[username ="lgn_username"]').check(), 
    cy.get('form').find('[profile_picture ="btn_select_image"]').check(), 
    cy.get('form').find('[email ="signup_email"]').check(),
    cy.get('form').find('[password ="signup_password"]').check()
);

And('Clica em confirmacao de cadastro', () =>{ 
    cy.get('form').find('[name="cb_policies"]').click()
});

Then('o sistema cadastra o usuario e redireciona para a tela de login', ()=> cy.visit("index"));

Given('que o usuario esta cadastrado no sistema e deseja alterar seus dados', ()=> 
cy.get('/api/users?email=${login}').should('not.be.empty')
);
When('o usuario entra na tela de editar perfil(editProfile), acessada atraves do menu principal', ()=> 
cy.visit('http://localhost:3000/signin').check()
);

And('alterar os dados desejados e clicar em "Salvar"(btn_save)', ()=>
    
    cy.get('#edit_name').check(),
    cy.get('#edit_username').check(),
    cy.get('#edit_champion_1').check(),
    cy.get('#edit_champion_2').check(),
    cy.get('#edit_champion_3').check(),
    cy.get('#edit_facebook').check(),
    cy.get('#edit_twitter').check(),
    cy.get('#edit_instagram').check(),
    cy.get('#edit_others').check(),
    cy.get('#btn_save').click()
);
Then('o sistema ira retificar as informacoes e o usuario sera redirecionado para o Index', ()=> 
cy.visit('http://localhost:3000/index'));