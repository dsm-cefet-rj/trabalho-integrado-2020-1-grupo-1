import React from 'react';

import api from '../../services/api';

import {
  Screen,
  SignupArea
} from './styles';

export default function Signup(){
  document.title = "Battleside - Signup";

  function sendData() {
    const name = document.getElementById('signup_name').value;
    const username = document.getElementById('signup_username').value;
    const profile_picture = document.getElementById('btn_select_image').value;
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;

    api.post('/user', {
      name,
      username,
      profile_picture,
      email,
      password
    })
    .then(() => alert('Cadastro realizado com sucesso!'))
    .catch(() => alert('Não foi possível realizar o cadastro!'))
  }

  return (
    <Screen>
      <SignupArea>
        <h1>Cadastre-se</h1>
        <p>Campos com * são obrigatórios</p>
        <br /><br />

        <form onSubmit={sendData}>
          <input 
            type="text" 
            placeholder="Nome" 
            required
            id="signup_name"
          />

          <input 
            type="text" 
            placeholder="Username" 
            required
            id="signup_username"
          />

          <label htmlFor="url-img">Foto de perfil</label>
                      <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                      <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                      <button className="btn_load_image" id="btn-load-image" onClick={() => {
                        // setStateOfButton()
                        // convertToBase64()
                        console.log('carregar')
                      }}>
                        Carregar
                      </button>
        <button type="button" id="btn_select_image" onClick={() => console.log('enviar')}>Enviar</button>

          <input 
            type="email" 
            placeholder="E-mail" 
            required
            id="signup_email"
          />

          <input 
            type="password" 
            placeholder="Senha" 
            required
            id="signup_password"
          />

          <input 
            type="password" 
            placeholder="Confirmar senha" 
            required
            id="signup_confirm_password"
          />

          <span>
            <input 
              type="checkbox" 
              id="cb_policies"
            />
            Declaro que li e aceito os Termos de uso e as políticas de privacidade.
          </span>

          <button type="submit">Cadastrar</button>
        </form>
      </SignupArea>
    </Screen>
  )
}
