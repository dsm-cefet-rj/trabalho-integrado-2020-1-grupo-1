@tag
Feature: Tratar solicitações
Permite ao Jogador Líder aceitar ou rejeitar as solicitações de outros jogadores para fazer parte de sua equipe
 
 @tag1
  Scenario: Lider aceita solicitação
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe   
    And estiver na tela de solicitações
    And selecionar um jogador solicitante
    When clicar em aceitar
    Then o sistema incluirá o jogador na equipe do líder
    And o sistema removerá a solicitação da lista de solicitações
    
 @tag1
  Scenario: Lider rejeita solicitação
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe   
    And estiver na tela de solicitações
    And selecionar um jogador solicitante
    When clicar em rejeitar
    Then o sistema removerá a solicitação da lista de solicitações
