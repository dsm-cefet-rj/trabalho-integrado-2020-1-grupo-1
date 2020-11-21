import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from '../../services/api';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import {
  TeamName, 
  Since
} from './styles';

const Team = ({ team, user }) => {  
  function exitTeam() {
    api.delete(`/api/users_teams?username=${user.username}`)
    .then(() => {
      alert('Saída de equipe realizada com sucesso!')
      window.location.href='/home'
    })
    .catch(error => console.log(error.response))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Equipe" />
      
      {(team) ? 
        <div className="center">
          <div className="image2"></div>
          <TeamName>{team.name}</TeamName>
          <Since>Desde {team.entryYear}</Since>

          <Link to={`/viewteam/${team.name}`} id="btn_viewTeam">Visualizar equipe</Link>
          <button type="button" id="btn_leave" onClick={exitTeam}>Sair da equipe</button>
        </div>    
      : 
        <div className="center">
          <div className="list-invites">
            <div className="list">
              <div className="invite">
                <h2>Nome equipe</h2>
                <span>Sigla equipe</span>
                <div className="invite-buttons">
                  <button type="button" id="btn_accept">Yes</button>
                  <button type="button" id="btn_reject">No</button>
                </div>
              </div>

            </div>
          </div>

          <Link to="/newteam" id="btn_create_team">Criar nova equipe</Link>
        </div> 
      }

      <div className="modal-box">
        <h4>Deseja realmente sair?</h4>
        <button id="btn_confirm_leave" onClick={() => console.log('sim')}>Sim</button>
        <button id="btn_cancel_leave" onClick={() => console.log('nao')}>Não</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

export default connect(mapStateToProps)(Team)
