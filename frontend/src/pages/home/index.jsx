import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from '../../services/api';

import * as UserActions from '../../store/actions/user';

import { 
  Screen,
  LoginArea 
} from './styles';

const Home = ({ signinUser }) => {
  document.title = "Battleside";

  function Login(e) {
    e.preventDefault();
    const login = document.getElementById('lgn_email').value;
    // const password = document.getElementById('lgn_password').value;
    
    api.get(`/api/users?email=${login}`)
    .then(response => {
      signinUser(response.data[0].name,
        response.data[0].username,
        response.data[0].profile_picture,
        response.data[0].role,
        response.data[0].champion1,
        response.data[0].champion2,
        response.data[0].champion3,
        response.data[0].facebook,
        response.data[0].instagram,
        response.data[0].twitter,
        response.data[0].others,
        response.data[0].email)
      window.location.href='/home'
      })
    .catch(() => alert('Não foi possível realizar o login! Verifique os dados informados e tente novamente!'))
  }
  
  return (
    <Screen>
      <LoginArea>
        <h1 id="logo">Battleside</h1>

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
            <button type="submit" disabled={false} className="default-button">Entrar</button>
          </div>    
        </form>  

        <Link to="/signup" id="signup">Novo por aqui? Clique aqui e realize seu cadastro agora mesmo!</Link>
      </LoginArea>
    </Screen>
  )
}

const mapDispatchToProps = dispatch => ({
  signinUser: (name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email) => dispatch(UserActions.signinUser(name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email))
});

export default connect(null, mapDispatchToProps)(Home);
