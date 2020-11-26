@tag
Feature: Deletar competicao
Permite ao administrador criador deletar a competicao que ele criou
 
 @tag1
  Scenario: Administrador confirma deletar competicao
    Given usuário cadastrado no sistema como administrador
    And possui competicao cadastrada
    When clicar no botão de Excluir competicao(btn_delete_comp)
    And confirmar a exclusao clicando Sim(btn_confirm_leave)
    Then o sistema exclui a competicao
    And retorna para a pagina inicial(home) do sistema

 @tag2
  Scenario: Administrador cancela deletar competicao
    Given usuário cadastrado no sistema como administrador
    And possui competicao cadastrada
    When clicar no botão de Excluir competicao(btn_delete_comp)
    And cancelar a exclusao clicando Nao(btn_cancel_leave)
    Then  retorna para a pagina Sua competicao(myCompetition)