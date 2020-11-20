@tag
Feature: Enviar print da partida
 Permite ao Jogador Líder enviar um print do placar da partida ao término da mesma para o administrador do campeonato
 
 @tag1
  Scenario: Enviar print da partida
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And a equipe está participando de um campeonato
    And estiver na tela da partida (viewMatch)
    And clicar no botão de enviar print (btn_send_print)      
    Then o sistema mostrará a tela de submissão do print

 @tag1
  Scenario: Enviar print da partida (2)
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And a equipe está participando de um campeonato
    And estiver na tela de submissão de print
    And selecionar o print da partida
    And submeter o print da partida
    Then o sistema registrará a submissão do print 
    And o sistema mostrará a tela da partida (viewMatch)
