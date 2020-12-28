import React, { useState } from 'react';
import styled from 'styled-components';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

export const Screen = styled.div`
  width: 100%;
  height: 100vh;
  background: #393939;
  padding: 40px;
`

export const SignupArea = styled.section`
  height: 700px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`

/**
* @module pages/signup 
*/

/**
 * Componente funcional responsável por renderizar a tela de Signup.
 * 
*/
function Signup(){
  document.title = "Battleside - Cadastre-se agora mesmo!";
  const accessToken = getAccessToken();

  const [preferredRole, setPreferredRole] = useState('Fill');

  /**
   * Responsável por realizar a requisição que envia ao backend os dados informados.
   * @param {Object} e - Parâmetro que guarda o event da chamada da função.
   */
  async function sendData(e) {
    e.preventDefault();

    const password = document.getElementById('signup_password').value;
    const confirm_password = document.getElementById('signup_confirm_password').value;

    if(password.length < 8) 
      return error('Não foi possível realizar o cadastro!', 'A senha deve ter no mínimo 8 caracteres!');
    
    if(password !== confirm_password)
      return error('Não foi possível realizar o cadastro!', 'As senhas são diferentes! Por favor, verifique-as e tente novamente!');
    
    try {
      await api.post('/api/users', {
        name: document.getElementById('signup_name').value,
        email: document.getElementById('signup_email').value,
        password,
        birthdate: document.getElementById('signup_birthdate').value,
        profilePictureURL: "",
        leagueOfLegendsUsername: document.getElementById('signup_username').value,
        preferredRole,
        computerSettings: {
          processor: "",
          videoCard: "",
          keyboard: "",
          mouse: "",
          headset: ""
        },
        socialMedia: {
          instagram: "",
          facebook: "",
          twitter: "",
          other: ""
        },
        team: null,
        favoriteChampions: {
          champion1: null,
          champion2: null,
          champion3: null
        }
      }, { headers: { Authorization: accessToken }})

      success('Cadastro realizado com sucesso!', 'Você será redirecionado a tela de login depois de fechar esse alerta!');
      window.location.href='/';

    } catch(err) {
      if(err.response.status === 422) {
        error('Ocorreu um erro inesperado!', err.response.data?.errors[0]);
      } else {
        error('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde!');
      }
    }
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

          <label htmlFor="signup_email">E-mail *</label>
          <input 
            type="email"
            className="form-control"
            id="signup_email"
            required
          />

          <label htmlFor="signup_birthdate">Data de nascimento *</label>
          <input 
            type="date"
            className="form-control"
            id="signup_birthdate"
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

          <label htmlFor="signup_preferred_role">Rota preferida *</label>
          <select id="signup_preferred_role" className="form-control" value={preferredRole} onChange={e => setPreferredRole(e.target.value)}>
            <option value="Fill">Fill</option>
            <option value="Top">Top</option>
            <option value="Jungler">Jungler</option>
            <option value="Mid">Mid</option>
            <option value="AD Carry">Ad Carry</option>
            <option value="Support">Support</option>
          </select>

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

export default Signup;
