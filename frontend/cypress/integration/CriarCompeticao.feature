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
Feature: Criar Competicao
 Cadastra uma nova competicao

  @tag1
  Scenario: Criar competicao
    Given que o login foi feito por uma conta cadastrada como administrador
    When estiver na tela de Nova Competi��o(newCompetition)
    And preenche os campos obrigat�rios para cadastrar a nova competi��o:
              	 | nome                                  | dominio |                                           restricoes                                                           |
				 | competition_name                      | String  |                                                                                                                |
				 | competition_initials                  | String  |                                                                                                                |
				 | competition_level                     | String  | Um dentre os seguintes valores: Livre, Bronze, Prata, Ouro, Platina, Diamante, Mestre, Gr�o-Mestre, Desafiante |
                 | competition_initial_date              | Date    | Formato dd/mm/aaaa                                                                                             |
				 | competition_final_date                | Date    | Formato dd/mm/aaaa                                                                                             |
				 | competition_initial_subscription_date | Date    | Formato dd/mm/aaaa                                                                                             |
				 | competition_final_subscription_date   | Date    | Formato dd/mm/aaaa                                                                                             |
                 | competition_rewards                   | String  |                                                                                                                |
                 | competition_rules                     | String  |                                                                                                                |
    And clica em Enviar(btn_create_competition)
    Then a competi��o � criada
    And a tela � redirecionada para a tela da Sua Competi��o(myCompetition)
    
