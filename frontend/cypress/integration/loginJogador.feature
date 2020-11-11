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
Feature: Login
Realiza o login de um usuario no sistema

  @tag1
  Scenario: Usuário cadastrado quer logar no app
    Given usuário cadastrado no sistema
    When estiver na tela de login(signin)
    And digitar: | nome             | dominio  |        restricoes          |
 						     | lgn_username     | String   |							              |
						     | lgn_password     | String   |tamanho minimo 8 caracteres	|
		    
    And clicar em "Entrar" btn_login
    Then o usuário será redirecionado para o Index

	Scenario: Usuário não cadastrado quer logar no app
    Given usuário não cadastrado no sistema
    When estiver na tela de login(signin) 
    And clicar no link para o cadastro
    Then o usuário será redirecionado para a página de cadastro(signup)
 
