import React from 'react';
import api from '../../services/api';

export default function ForgetPassword() {
  function sendEmail() {
    api.get('/forgetpassword')
    .then(() => alert('E-mail com instruções para alteração enviado com sucesso!'))
    .catch(() => alert('Ocorreu um erro na aplicação!'))
  }

  return (
    <div className="container">
      <input 
        type="email" 
        placeholder="E-mail cadastrado *" 
        required={true} 
        id="recover_email"
      />

      <button type="button" id="btn_recover_send" onClick={sendEmail}>Enviar</button>
    </div>
  );
}
