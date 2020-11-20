@tag
Feature: Convidar Jogador
Permite ao Jogador Líder convidar outros jogadores para fazerem parte de sua equipe
 
 @tag1
  Scenario: Lider envia convite 
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe   
    And estiver na tela de equipe (team)    
    When clicar no botão de convidar jogadores
    And buscar um jogador
    And clicar no botão convidar
    Then o sistema enviará um convite para o jogador selecionado
    And o sistema mostrará uma notificação de jogador convidado com sucesso
