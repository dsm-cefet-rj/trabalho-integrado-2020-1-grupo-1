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
Feature: Pausar Competicao
 Pausa a competicao para averiguar denuncias de hacker em alguma partida

  @tag1
  Scenario: Recebe a denuncia
    Given que o login foi feito por uma conta cadastrada como administrador
    And estiver na tela de Nova Competicao(newCompetition)
    When recebe denuncias de hackers na partida
    And clica no botão de Pausar competicao(my_comp_pause) localizado em Acoes do administrador
    Then a competição deve ser pausada para averiguar as denuncias.
