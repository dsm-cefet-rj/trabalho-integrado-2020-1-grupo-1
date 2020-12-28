import React from 'react';
import styled from 'styled-components';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

export const Screen = styled.div`
  width: 100%;
  height: 100vh;
  background: #393939;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #FFF;
    text-decoration: none;
    text-align: center;
  }

  #logo {
    margin-bottom: 30px;
    color: #FFF;
    font-weight: bold;
  }

  h3 {
    color: #E5E5E5;
    font-size: 20px;
  }

  #area-link-btn {
    margin-top: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

export const RecoverArea = styled.div`
  height: 400px;
  width: 400px;
  background: rgba(0,0,0,.2);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  padding: 50px;
  border-radius: 10px;

  input {
    padding: 7px;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    background: transparent;
    border: 2px solid #888;
  }

  label {
    font-size: 13px;
    color: #888;
  }

  button {
    width: 150px;
    background: #AA0000;
    padding: 7px;
    border-radius: 3px;
    color: #FFF;
    font-size: 13px;

    :hover {
      background: #FF0000;
      transition: .4s ease;
    }
  }
`

/**
 * @module pages/recoverPassword 
 */

/**
 * Componente responsável por renderizar a tela de Esqueci minha senha
 *
 */
function RecoverPassword() {
  document.title = 'Battleside - Recuperar senha';
  const accessToken = getAccessToken();

  /**
   * Função responsável por enviar a nova senha do usuário ao backend para a redefinição de senha
   * @param {Object} e - Objeto que contém os dados do event que lançou a função.
   * 
   */
  async function setPassword(e) {
    e.preventDefault();

    try {
      await api.put('/api/recoverpassword', {
        password: document.getElementById('recover_password').value
      }, { headers: { Authorization: accessToken }})
      success('Senha alterada com sucesso!', 'Você será redirecionado à tela de login após este alerta ser fechado!');
      window.location.href = '/';

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
      <RecoverArea>
        <h1 id="logo">Battleside</h1>

        <h3>Nova senha</h3><br />
        <form onSubmit={e => setPassword(e)}>
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

export default RecoverPassword;
