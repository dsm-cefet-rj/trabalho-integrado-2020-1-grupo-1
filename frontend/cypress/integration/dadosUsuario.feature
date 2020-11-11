#Author: your.email@your.domain.com
#Keywords Summary :
#Feature: List of scenarios.
#Scenario: Business rule through list of steps with arguments.
#Given: Some precondition step
#When: Some key actions
#Then: To observe outcomes or validation
#And,But: To enumerate more Given,When,Then steps
#Scenario Outline: List of steps for data-driven as an Examples and <placeholder>
#Examples: Container for s table
#Background: List of steps run before each of the scenarios
#""" (Doc Strings)
#| (Data Tables)
#@ (Tags/Labels):To group Scenarios
#<> (placeholder)
#""
## (Comments)
#Sample Feature Definition Template
@tag
Feature: Dados do usuario
  Manipula os dados de usuario, podendo cadastrar e alterar esses dados.
  
  @tag1
  Scenario: Cadastro Usuario
    Given existe um usuario nao cadastrado no sistema
    When estiver na tela de cadastro(signup), preenche:
          	 | nome             | dominio  |                     restricoes														 |
				     | signup_name      | String   |  																												 |
				     | lgn_username     | String   | conter um valor nao presente em registros na base de dados|
				     | btn_select_image | Button   | imagem com formato jpg ou png														 |
				     | signup_email     | String   | conter formato e dominio validos													 |
				     | signup_password  | String   | conter tamanho minimo de 8 caracteres										 |
				     | confirm_password | String   | conter valor identico a signup_password									 |
				     | cb_policies      | Checkbox |																													 |
				    
    And clicar no botão "confirmacao de cadastro" (btn_signup)
    Then o sistema cadastra o usuário
    And redireciona o usuário para a tela de login

   Scenario: Editar Usuario
    Given que o usuario esta cadastrado no sistema 
    And deseja alterar seus dados
    When o usuario entra na tela de editar perfil(editProfile), 
    acessada atraves do menu principal
    And alterar os dados desejados e clicar em "Salvar"(btn_save)
    Then o sistema ira retificar as informacoes 
    And o usuario sera redirecionado para o Index
   