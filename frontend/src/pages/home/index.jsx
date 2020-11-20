import React from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { 
  Screen,
  LoginArea 
} from './styles';

export default function Home() {
  document.title = "Battleside";

  function Login(e) {
    e.preventDefault();
    const login = document.getElementById('lgn_email').value;
    const password = document.getElementById('lgn_password').value;

    api.post('/login', { login, password })
    .then(() => window.location.href="/home")
    .catch(() => alert('Ocorreu um erro durante o login!'))
  }
  
  return (
    <Screen>
      <LoginArea>
        <h1 id="logo">LOGO</h1>

        <form onSubmit={e => Login(e)}>
          <input 
            type="email" 
            placeholder="E-mail" 
            required
            id="lgn_email"
          />

          <input 
            type="password" 
            placeholder="Senha" 
            required
            id="lgn_password"
          />

          <div id="area-link-btn">
            <Link to="/forget">Esqueci minha senha</Link>
            <button type="submit" disabled={false}>Entrar</button>
          </div>    
        </form>    

        <Link to="/signup" id="signup">Novo por aqui? Clique aqui e realize seu cadastro agora mesmo!</Link>
      </LoginArea>
      
      {/* <Link to="/policies">Políticas de privacidade</Link>
      |
      <Link to="/terms">Termos de uso</Link> */}
    </Screen>
  )
}
