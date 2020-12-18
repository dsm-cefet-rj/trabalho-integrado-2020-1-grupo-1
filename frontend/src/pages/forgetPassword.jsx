import React from 'react';
import styled from 'styled-components';
import api from '../services/api';

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

export const ForgetArea = styled.div`
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

export default function ForgetPassword() {
  document.title = 'Battleside - Esqueci minha senha';

  async function sendEmail(e) {
    e.preventDefault();

    try {
      await api.get('/api/forgetpassword')
      alert('E-mail com instruções para alteração enviado com sucesso!');

    } catch(err) {
      alert('Ocorreu um erro na aplicação!')
    }
  }

  return (
    <Screen>
      <ForgetArea>
        <h1 id="logo">Battleside</h1>

        <h3>Esqueci minha senha</h3>
        <form onSubmit={e => sendEmail(e)}>
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