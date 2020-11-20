@tag
Feature: Listar Campeonatos
 Permite ao Jogador Líder filtrar as competições conforme seus critérios de busca
 
 @tag1
  Scenario: Filtrar campeonatos por nível
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And estiver na tela de competições (competition)    
    When selecionar um dos níveis de competição no botão nível (btn_filter_level)
    Then o sistema mostrará a lista de competições com o nível selecionado
  
 @tag1
  Scenario: Filtrar campeonatos por Premiação
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And estiver na tela de competições (competition)    
    When selecionar uma das premiações de competição no botão Premiação (btn_filter_awards)
    Then o sistema mostrará a lista de competições com o prêmio selecionado
    
 @tag1
  Scenario: Filtrar campeonatos por Máximo de Equipes
    Given usuário cadastrado no sistema
    And usuário é líder de uma equipe
    And estiver na tela de competições (competition)    
    When digitar uma quantidade máxima de equipes na competição no botão (btn_filter_max_teams)
    Then o sistema mostrará a lista de competições com o a quantidade máxima de equipes conforme o filtro
