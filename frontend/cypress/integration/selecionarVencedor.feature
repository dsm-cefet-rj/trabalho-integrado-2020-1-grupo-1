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
Feature: Selecionar Vencedor
 O administrador da competicao, apos o fim de uma partida, cadastra o vencedor daquele jogo

  @tag1
  Scenario: Vencedor Time 1
    Given que o login foi feito por uma conta cadastrada como administrador
    And esta na tela da Sua Competicao(myCompetition)
    And o print da partida finalizada esta disponivel no Ver print(btn_see_print)
    When clicado no botão do Time 1(btn_winner_1)
    Then o Time 1 é cadastrado como vencedor
    And avança de fase.
    
  Scenario: Vencedor Time 2
    Given que o login foi feito por uma conta cadastrada como administrador
    And esta na tela da Sua Competicao(myCompetition)
    And o print da partida finalizada estiver disponivel no Ver print(btn_see_print)
    When clicado no botão do Time 2(btn_winner_2)
    Then o Time 2 é cadastrado como vencedor
    And avança de fase.
