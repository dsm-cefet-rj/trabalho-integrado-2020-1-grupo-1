import React, { useState, useEffect } from 'react';
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
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    api.get('/api/invites')
    .then(response => setInvites(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function exitTeam() {
    api.delete(`/api/users_teams?username=${user.username}`)
    .then(() => {
      alert('Saída de equipe realizada com sucesso!')
      window.location.href='/home'
    })
    .catch(error => console.log(error.response))
  }

  function acceptInvite(invite) {
    api.put(`/api/invites/${invite.id}`, {
      id: invite.id,
      user_convidou: invite.user_convidou,
      user_convidado: invite.user_convidado,
      nome_equipe: invite.nome_equipe,
      image: invite.image,
      sigla_equipe: invite.sigla_equipe,
      aceitado: true
    })
    .then(() => addDataUsersTeams(invite))
    .catch(() => alert('Ocorreu um erro na solicitação!'))
  }

  function addDataUsersTeams(invite) {
    const year = new Date().getFullYear();

    api.post('/api/users', {
      id: invite.sigla_equipe,
      name: invite.nome_equipe,
      entryYear: year,
      username: invite.user_convidado,
      image: invite.image
    })
    .then(() => alert('Convite aceitado com sucesso!'))
    .catch(() => alert('Ocorreu um erro na solicitação2!'))
  }

  function rejectInvite(invite) {
    api.delete(`/api/invites/${invite.id}`)
    .then(() => {
      alert('Convite rejeitado com sucesso!')
      window.location.href="/team"
    })
    .catch(() => alert('Ocorreu um erro na solicitação!'))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Equipe" />
      
      {(!team) ? 
        <div className="center">
          <div className="image2"></div>
          <TeamName>{team.name}</TeamName>
          <Since>Desde {team.entryYear}</Since>

          <Link to={`/viewteam/${team.name}`} id="btn_viewTeam">Visualizar equipe</Link>
          <button type="button" id="btn_leave" onClick={exitTeam}>Sair da equipe</button>
        </div> 
      : 
        <div className="list-invites">
          <div className="list">
            {(invites) ? 
              invites.map(invite => (
                <div className="center">
                  <div className="invite">
                    <h2>{invite.nome_equipe}</h2>
                    <span>{invite.sigla_equipe}</span>
                    <div className="invite-buttons">
                      <button type="button" id="btn_accept" onClick={() => acceptInvite(invite)}>Yes</button>
                      <button type="button" id="btn_reject" onClick={() => rejectInvite(invite)}>No</button>
                    </div>
                  </div>
                  <Link to="/newteam" id="btn_create_team">Criar nova equipe</Link>
                </div> 
              ))              
            : ''}          
          </div>
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
