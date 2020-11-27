@tag
Feature: Alterar Data/Hora da Competicao
Permite ao administrador alterar a data/hora da competicao
 
 @tag1
  Scenario: Administrador confirma alterar data/hora
    Given usuario logado no perfil de administrador
    And tem uma competicao cadastrada
    And estiver na pagina "Sua Competicao"(myCompetition)
    When clicar no botao de Editar data e horario(btn_edit_datehour)
    And preencher os campos obrigatórios para troca de data e hora:
         | nome            | dominio |          restricoes           |
         | edit_date       |  date   |    Data no formato dd/mm/aaaa |
         | edit_time       |  time   |     Hora no fomato hh:mm:ss   |
         | edit_date_final |  date   |    Data no formato dd/mm/aaaa |
         | edit_time_final |  time   |     Hora no fomato hh:mm:ss   |
    And clicar no botao Salvar(btn_save_edit)
    And confima a alteracao clicando em Sim(btn_save_edit)
    Then o sistema altera a data/hora da competicao
    And retorna a pagina "Sua Competicao"(myCompetition)

 @tag2
  Scenario: Administrador cancela alterar data/hora
    Given usuario logado no perfil de administrador
    And tem uma competicao cadastrada
    And estiver na pagina "Sua Competicao"(myCompetition)
    When clicar no botao de Editar data e horario(btn_edit_datehour)
    And preencher os campos obrigatórios para troca de data e hora:
         | nome            | dominio |          restricoes           |
         | edit_date       |  date   |    Data no formato dd/mm/aaaa |
         | edit_time       |  time   |     Hora no fomato hh:mm:ss   |
         | edit_date_final |  date   |    Data no formato dd/mm/aaaa |
         | edit_time_final |  time   |     Hora no fomato hh:mm:ss   |
    And clicar no botao Salvar(btn_save_edit)
    And cancela a alteracao clicando em Nao(btn_cancel_edit)
    Then retorna a pagina "Sua Competicao"(myCompetition)