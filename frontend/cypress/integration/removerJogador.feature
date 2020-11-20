@tag
Feature: Remover Jogador
 Permite ao Jogador Líder remover outros jogadores da sua equipe
  @tag1
  Scenario: Remover jogador da equipe
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And a equipe possui um jogador além do líder
    When estiver na tela de equipe (team)
    And selecionar o jogador membro da equipe (btn_username_usuario)
    And selecionar a opção de remover o jogador selecionado da equipe		   
    Then o jogador será removido da equipe
    And o jogador será removido da lista de membros da equipe
