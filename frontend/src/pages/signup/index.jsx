import React from 'react';

import api from '../../services/api';

import {
  Screen,
  SignupArea
} from './styles';

export default function Signup(){
  document.title = "Battleside - Signup";

  function sendData(e) {
    e.preventDefault();

    const name = document.getElementById('signup_name').value;
    const username = document.getElementById('signup_username').value;
    const profile_picture = "link";
    const email = document.getElementById('signup_email').value;

    const password = document.getElementById('signup_password').value;
    const confirm_password = document.getElementById('signup_confirm_password').value;

    if(password !== confirm_password) {
      return alert('As senhas são diferentes! Por favor, verifique-as e tente novamente!')
    }

    api.post('/api/users', {
      id:username,
      name,
      username,
      profile_picture,
      email,
      password,
      role: "",
      champion1:"",
      champion:"",
      champion3:"",
      facebook:"",
      instagram:"",
      twitter:"",
      other:"Nada"
    })
    .then(() => {
      alert('Cadastro realizado com sucesso!')
      window.location.href="/"
    })
    .catch(() => alert('Não foi possível realizar o cadastro!'))
  }

  return (
    <Screen>
      <SignupArea>
        <h1 className="title-signup">Cadastre-se</h1>
        <p className="tip-signup">Campos com * são obrigatórios</p>
        <br /><br />

        <form onSubmit={e => sendData(e)}>
          <label htmlFor="signup_name">Nome *</label>
          <input 
            type="text" 
            className="form-control"
            id="signup_name"
            required
          />

          <label htmlFor="signup_username">Username League of Legends *</label>
          <input 
            type="text"
            className="form-control"
            id="signup_username"
            required
          />

          <label htmlFor="url-img">Foto de perfil</label>
          <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />

          <label htmlFor="signup_email">E-mail *</label>
          <input 
            type="email"
            className="form-control"
            id="signup_email"
            required
          />

          <label htmlFor="signup_password">Senha *</label>
          <input 
            type="password"
            className="form-control" 
            id="signup_password"
            required
          />

          <label htmlFor="signup_confirm_password">Confirmar senha *</label>
          <input 
            type="password" 
            className="form-control"
            id="signup_confirm_password"
            required
          />

          <br/>
          <span className="text-checkbox">
            <input 
              type="checkbox" 
              id="cb_policies"
              required
            />
            Declaro que li e aceito os Termos de uso e as políticas de privacidade.
          </span>

          <br/><br/>
          <div className="center">
            <button type="submit" className="btn-primary default-primary">Cadastrar</button>
          </div>
        </form>
      </SignupArea>
    </Screen>
  )
}
