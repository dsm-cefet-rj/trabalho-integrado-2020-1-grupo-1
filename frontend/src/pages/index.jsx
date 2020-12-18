import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '../services/api';

import * as UserActions from '../store/actions/user';
import * as TeamActions from '../store/actions/team';

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

  #area-link-btn {
    margin-top: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    a {
      padding-bottom: 15px;
    }
  }

  #signup {
    margin-top: 70px;
  }
`

export const LoginArea = styled.section`
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

  a {
    font-size: 13px;
    color: #888;
  }

  a#signup {
    margin-top: 20px;
  }
`

const Index = ({ signinUser, signinTeam }) => {
  document.title = "Battleside";

  async function Login(e) {
    e.preventDefault();
    const email = document.getElementById('lgn_email').value;
    // const password = document.getElementById('lgn_password').value;

    try {
      const userResponse = await api.get(`/api/users?email=${email}`);
      const teamID = userResponse.data[0].team;

      signinUser(
        userResponse.data[0].name,
        userResponse.data[0].email,
        userResponse.data[0].birthdate,
        userResponse.data[0].profilePictureURL,
        userResponse.data[0].leagueOfLegendsUsername,
        userResponse.data[0].preferredRole,
        userResponse.data[0].computerSettings,
        userResponse.data[0].socialMedia,
        userResponse.data[0].team,
        userResponse.data[0].favoriteChampions,
        userResponse.data[0].id
      );

      if(teamID) {
        const teamResponse = await api.get(`/api/teams/${teamID}`);

        signinTeam(
          teamResponse.data.name,
          teamResponse.data.initials,
          teamResponse.data.logoPictureURL,
          teamResponse.data.id
        );
      }
    
      window.location.href='/home'

    } catch(err) {
      alert('Não foi possível realizar o login! Verifique os dados informados e tente novamente!')
    }
  }
  
  return (
    <Screen>
      <LoginArea>
        <h1 id="logo">Battleside</h1>

        <form onSubmit={e => Login(e)}>
          <input 
            type="email" 
            placeholder="E-mail" 
            name="lgn_email"
            id="lgn_email"
            required
          />

          <input 
            type="password" 
            placeholder="Senha" 
            name="lgn_password"
            id="lgn_password"
            required
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
  signinUser: (name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email) => dispatch(UserActions.signinUser(name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email)),
  signinTeam: (name, initials, logoPictureURL, id) => dispatch(TeamActions.signinTeam(name, initials, logoPictureURL, id))
});

export default connect(null, mapDispatchToProps)(Index);
