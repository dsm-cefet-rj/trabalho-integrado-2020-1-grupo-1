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
Feature: Ver partidas de uma competicao
 utilizada para mostrar ao usuario as partidas que sua equipe disputará 
 
  @tag1
  Scenario: Ver o chaveamento de partidas
    Given a competicao esta em andamento
    When o usuario entrar na tela da competicao (viewCompetition)
    Then o sistema ira mostrar o chaveamento com todas as partidas do torneio
	
  Scenario: Ver a tela da partida
    Given a competicao esta em andamento
    When o usuario entrar na tela da competicao (viewCompetition)
    And clicar no botao da equipe na competicao(competition_team_numero)
    Then o sistema ira abrir a tela da partida(viewMatch)
	
