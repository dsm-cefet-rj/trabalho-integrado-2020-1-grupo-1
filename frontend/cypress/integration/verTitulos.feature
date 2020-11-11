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
Feature: Ver titulos conquistados
utilizado para mostrar ao usuario seus titulos conquistados
  @tag1
  Scenario: Ver Titulos
    Given que o usuario já venceu competicoes
    And esta cadastrado no sistema
    When estiver na tela pós login(Index) 
    And clicar na aba "Titulos"
    Then o sistema recupera o nome do torneio data dos titulos obtidos, deixando-os a amostra
    na aba "Titulos"

