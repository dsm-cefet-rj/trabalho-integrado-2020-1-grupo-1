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
Feature: Enviar Mensagem
 Envia mensagem no chat da partida para todos os integrantes das equipes

  @tag1
  Scenario: Envia mensagem
    Given que o login foi feito por uma conta cadastrada como administrador
    And estiver na tela de Nova Competicao(newCompetition)
    When seleciona uma partida
    And clica no botao de Enviar mensagem(my_comp_send_message) localizado em Acoes do administrador
    Then abre o chat para enviar mensagens que podem ser lidas por todos os integrantes das equipes.
