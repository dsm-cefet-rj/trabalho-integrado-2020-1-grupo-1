@tag
Feature: Inscrever Equipe
 Permite ao Jogador Líder inscrever sua equipe em um campeonato
 
 @tag1
  Scenario: Inscrever equipe em campeonato
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And a equipe possui no mínimo 5 jogadores
    And estiver na tela de competições (competition)
    And selecionar uma competição em fase de inscrição (btn_id_competição)
    When clicar em "Se inscrever (btn_subscription)   
    Then o sistema mostrará a tela de seleção de membros da equipe
 
 @tag1 
  Scenario: Inscrever equipe em campeonato (2)
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And a equipe possui no mínimo 5 jogadores
    And estiver na tela de inscrição em competição (competitionDetails)
    When selecionar os jogadores que irão participar da competição clicando nos respectivos checkbox (cb_player_username)
    And clicar no botão de finalizar inscrição (btn_finish)
    Then o sistema mostrará a tela de competições (competition)
    And a equipe estará inscrita no campeonato que foi selecionado
    
  
