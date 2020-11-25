import React from 'react';

import api from '../../services/api';

import { Screen, RecoverArea } from './styles'; 

export default function RecoverPassword() {
  function setPassword() {
    api.get('/recoverpassword')
    .then(() => alert('Senha alterada com sucesso!'))
    .catch(() => alert('Ocorreu um erro na recuperação!'))
  }

  return (
    <Screen>
      <RecoverArea>
        <h1 id="logo">Battleside</h1>

        <h3>Nova senha</h3><br />
        <form onSubmit={setPassword}>
          <input 
            type="password" 
            placeholder="Nova senha *" 
            required
            id="recover_password"
          />
          <input 
            type="password" 
            placeholder="Confirmar senha *" 
            required
            id="recover_confirm_password"
          />

          <br /><br />
          <div className="center">
            <button type="button" id="btn_recover_save">Alterar</button>
          </div>
        </form>
      </RecoverArea>
    </Screen>
  );
}
