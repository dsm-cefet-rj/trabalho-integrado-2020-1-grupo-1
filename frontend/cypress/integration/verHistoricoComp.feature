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
Feature: Historico de competicoes 
  Mostra o historico de competicoes disputadas por uma equipe

  @tag1
  Scenario: ver historico de competicoes
    Given o usuario ja disputou alguma competicao
    And esta em uma equipe
    When o usuario clica em "Visualizar"(btn_viewTeam), na tela de equipe
    Then o sistema ira buscar nome e data das ultimas tres competicoes que a equipe 
    do usuario tenha participado
    And os dados ficarão expostos na aba "Historico de Competicoes"
