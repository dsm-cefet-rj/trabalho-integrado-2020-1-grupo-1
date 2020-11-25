import React from 'react';
import api from '../../services/api';

import { Screen, ForgetArea } from './styles';

export default function ForgetPassword() {
  document.title = 'Battleside - Esqueci minha senha';

  function sendEmail() {
    api.get('/forgetpassword')
    .then(() => alert('E-mail com instruções para alteração enviado com sucesso!'))
    .catch(() => alert('Ocorreu um erro na aplicação!'))
  }

  return (
    <Screen>
      <ForgetArea>
        <h1 id="logo">Battleside</h1>

        <h3>Esqueci minha senha</h3>
        <form onSubmit={sendEmail}>
          <label htmlFor="recover_email">E-mail cadastrado *</label>
          <input 
            type="email" 
            className="form-control w-100"
            required
            id="recover_email"
          />

          <div id="area-link-btn">
            <br />
            <button type="submit" id="btn_recover_send">Enviar</button>
          </div>
        </form>
      </ForgetArea>
    </Screen>
  );
}
