import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';

import Header from '../components/Header';
import Menu from '../components/Menu';
import BoxTitle from '../components/BoxTitle';

import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import other from '../images/link.png';

export const Screen = styled.div`
  width: 60%;
  height: 100vh;
  background: red;
  margin-left: 20%;

  @media (max-width: 1000px) {
    width: 90%;
    margin-left: 5%;
  }
`

export const Roles = styled.div`
  width: 100%;
  height: 200px;
  padding: 0 40px;
  
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const RoleImage = styled.div`
  width: 100px;
  height: 100px;
  background: blue;
`

export const ChampionsList = styled.div`
  width: 100%;
  height: 120px;
  background: red;
`

export const Champion = styled.div`
  width: 100%;
  height: 120px;
  background: yellow;
  border: 1px solid pink;
`

export const BoxTeamName = styled.h3`
  font-size: 17px;
  font-weight: bold;
  margin-top: 20px;
`

export const BoxContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`

export const BoxSince = styled.h6`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
`

/**
 * @module pages/home 
 */

/**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome 
 * @property {String} leagueOfLegendsUsername - Username do League of Legends 
 * @property {String} email - E-mail
 * @property {String} preferredRole - Role preferida 
 * @property {array} favoriteChampions - Array de campeões preferidos 
 * @property {String} birthdate - Data de aniversário 
 * @property {Object} computerSetting - Configurações do computador 
 * @property {Object} socialMedia - Mídias sociais
 */

 /**
 * @typedef Team
 * @type {Object}
 * @property {String} name - Nome da equipe
 * @property {String} initials - Iniciais da equipe 
 */

/**
 * Componente responsável por renderizar a tela de Home.
 * @param {Object} user - Objeto da store do Redux que contém os dados de User presentes na store.
 * @param {Object} team - Objeto da store do Redux que contém os dados de Team presentes na store.
 */

const Home = ({ user, team }) => {
  document.title = 'Battleside';
  const accessToken = getAccessToken();

  const [champions, setChampions] = useState([]);

  useEffect(() => {
    api.get(`/api/champions`, { headers: { Authorization: accessToken }})
    .then(response => setChampions(response.data))
  }, [])

  function getChampionData(championID) {
    if(champions.length !== 0) {
      for(let i = 0; i <= champions.length; i++) {
        if(championID === champions[i].id) {
          return champions[i].imageURL
        }
      }
    }
  }
  
  return (
    <div className="container">     
      <Menu />
      <Header />

      <div className="row">
        <div className="col-md-7">
          <div className="box">
            <BoxTitle content="Sobre mim" />        
            <div className="about-me">
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Role: </strong> {(user.preferredRole)}</p> 
              
              {(user.socialMedia?.facebook) ?
                <a href={user.socialMedia?.facebook} target="_blank"><img src={facebook} className="icon-social-media" alt="facebook" /></a>                
              : undefined}     

              {(user.socialMedia?.instagram) ?
                <a href={user.socialMedia?.instagram} target="_blank"><img src={instagram} className="icon-social-media" alt="instagram" /></a>            
              : undefined}    

              {(user.socialMedia?.twitter) ?
                <a href={user.socialMedia?.twitter} target="_blank"><img src={twitter} className="icon-social-media" alt="twitter" /></a>                
              : undefined}    

              {(user.socialMedia?.other) ?
                <a href={user.socialMedia?.other} target="_blank"><img src={other} className="icon-social-media" alt="outro" /></a>      
              : undefined}

              <h5>Campeões favoritos</h5>
              <div className="row">
                <div className="col-md-4 champion-icon">
                  <img src={(user.favoriteChampions.champion1) ? getChampionData(user.favoriteChampions.champion1) : ''} />
                </div>
                <div className="col-md-4 champion-icon">
                  <img src={(user.favoriteChampions.champion2) ? getChampionData(user.favoriteChampions.champion2) : ''} />
                </div>
                <div className="col-md-4 champion-icon">
                  <img src={(user.favoriteChampions.champion3) ? getChampionData(user.favoriteChampions.champion3) : ''} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="box">
            <BoxTitle content="Sua equipe" />   
            <BoxContent>
              {/* <img className="image" src={team?.image} /> */}
              <BoxTeamName>{team?.name}</BoxTeamName>
              <BoxSince>{team?.initials}</BoxSince>
            </BoxContent>                      
          </div>
        </div>
      </div>
    </div>
  );
}

/**
* Função que pega os dados do usuário e equipe na Store.
* @param {Object} state - Objeto que contém o estado global da aplicação
*/
const mapStateToProps = state => ({
  team: state.team,
  user: state.user
});

export default connect(mapStateToProps)(Home);
