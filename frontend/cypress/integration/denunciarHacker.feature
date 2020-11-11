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
Feature: Denunciar Hacker
  Denuncia um comportamento estranho em uma partida para conseguir uma anulacao do resultado.

  @tag1
  Scenario: Denunciar Hacker em uma competicao 
    Given que uma partida terminou
    And essa partida faz parte de uma competicao
    When o usuario estiver na tela de partida e clicar no botao "Reportar"(btn_report)
    And descrever o comportamento estranho de um jogador, podendo adicionar 
    um print pelo botao(btn_occurrence_print)
    | nome  |  dominio   |
    | print | imagem png |
    
    Then o sistema notificara o administrador da competeicao
    And o administrador ira pausar a partida para verificar

 