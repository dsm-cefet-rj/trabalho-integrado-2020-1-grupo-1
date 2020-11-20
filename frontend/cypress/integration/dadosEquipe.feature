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
Feature: Dados Equipe
 Manipula as funcoes de um usuario comum em uma equipe

  @tag1
  Scenario: Atraves de link
    Given que o usuario esta logado 
    And o usuario esteja sem equipe
    When recebe um link com convite para entrar em uma equipe
    And clica no link
    Then o sistema cadastra o usuario em uma equipe
    And adiciona os dados da equipe e data de entrada na tela principal do usuario
    
  Scenario: Sair da equipe 1/2 
    Given que o usuario esta logado 
    And esteja em uma equipe
    When clica no botao "Sair da Equipe"(btn_leave)
    And Confirma a saida
    Then o sistema remove o usuario da equipe, retirando os dados da equipe do index do usuario
    
 Scenario: Sair da equipe 2/2 
    Given que o usuario esta logado 
    And esteja em uma equipe
    When clica no botao "Sair da Equipe"(btn_leave)
    And não confirma a saida
    Then o sistema redireciona o usuario para a tela da equipe(team)
    
    
    
