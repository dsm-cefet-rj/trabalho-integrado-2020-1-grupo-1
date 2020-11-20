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
Feature: Criar Equipe
 Cria uma equipe, fazendo com que o usuario criador seja alocado como lider e dá as
 funcionalidades que uma equipe pode garantir a usuarios, como entrar em torneios.

  @tag1
  Scenario: Criação da equipe para tornar o usuário administrador da equipe
    Given que o usuário está cadastrado 
    And não está em nenhuma equipe
    When estiver na página "Criar Equipe"(newTeam) e submeter ao sistema os seguintes dados:
   
    | nome             | dominio  |        restricoes          |
 		| team_name        | String   |							               |
		| team_initials    | String   |														 |
		| btn_select image | imagem   | formato deve ser png       |
		 
    And clicar no botão "Criar"(btn_create_team)
    Then o sistema irá registrar a equipe, dando ao usuário criador da equipe acesso 
    as funcionalidade de administrador da equipe
    And adicionará nome e sigla de equipe na tela principal de cada integrante
    And após a criação, o sistema redireciona o usuário para a tela da equipe(team)
    
  Scenario: Criação da equipe para disputar partidas
    Given que o usuário está cadastrado 
    And não está em nenhuma equipe
    When estiver na página "Criar Equipe"(newTeam) e submeter ao sistema os seguintes dados:
    | nome             | dominio  |        restricoes          |
 		| team_name        | String   |							               |
		| team_initials    | String   |														 |
		| btn_select image | imagem   | formato deve ser png       | 	
   	
    And clicar no botão "Criar"(btn_create_team)
    Then o sistema irá registrar a equipe no sistema
    And quando o usuário disputar as partidas, os outros jogadores poderão ver 
    o nome e sigla da equipe que o usuário está jogando
    
