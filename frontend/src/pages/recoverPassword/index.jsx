import React from 'react';

import api from '../../services/api';

export default function RecoverPassword() {
  function setPassword() {
    api.get('/recoverpassword')
    .then(() => alert('Senha alterada com sucesso!'))
    .catch(() => alert('Ocorreu um erro na recuperação!'))
  }

  return (
    <div className="container">
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

      <button type="button" id="btn_recover_save">Alterar</button>
      </form>
    </div>
  );
}
