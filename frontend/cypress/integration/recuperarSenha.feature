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
Feature: Recuperar Senha
 Recupera a senha de um usuario que deseja tal mudanca 
	
	  
    Data Table
    | nome                     | Dominio |              restricao                |
    | recover_email            | String  | precisa ter formato e dominio validos |
    | recover_password         | String  | tamanho minimo: 8 caracteres          |
    | recover_confirm_password | String  | tamanho minimo: 8 caracteres          |
  
  Scenario: Recuperar Senha
    Given que o usuario esta cadastrado no sistema
    When informa seu email(lgn_email) para retificacao de senha
    Then sera encaminhado um link para a tela de alteracao de senha(recover2)
    
	 Scenario: Alterar Senha
   	Given que o usuario esta cadastrado no sistema
   	And esta na tela de alteracao de senha(recover2)
    When o usuario informa sua senha(recover_password) 
    e confirma a senha (recover_confirm_password)
    And clica em "Salvar" (btn_recover_save)
    Then o sistema altera a senha do usuario
  
      
