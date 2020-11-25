import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import * as teamActions from '../../store/actions/team';

const ViewTeam = ({ user, team, teamData }) => {
  const [teamDataState, setTeamDataState] = useState({});

  useEffect(() => {
    api.get(`/api/teams?name=${team.name}`)
    .then(response => setTeamDataState(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function invitePlayer(e) {
    e.preventDefault();

    const invitedUser = document.getElementById("input_username").value;
    api.post('/api/invites', {
      id: Math.random(),
      user_convidou: user.username,
      user_convidado: invitedUser,
      nome_equipe: teamDataState[0]?.name,
      image: teamDataState[0]?.image,
      sigla_equipe: teamDataState[0]?.initials,
      aceitado: false
    })
    .then(() => alert(invitedUser + ' convidado com sucesso!'))
    .catch(() => alert('Não foi possível convidar o usuário!'))
  }

  function deleteTeam() {
    api.delete(`/api/teams/${teamDataState[0]?.initials}`)
    .then(() => {
      teamData(null,null,null,null)
      deleteInUserTeamTable()
    })
    .catch(err => console.log(err.response))
  }

  function deleteInUserTeamTable() {
    api.delete(`/api/userteam/${user.username}`)
    .then(() => alert('Equipe excluida com sucesso!'))
    .catch(() => alert('Não foi possível excluir a equipe!'))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content={'Equipe ' + teamDataState[0]?.name} />

      <div className="area-logo center">
        <div className="logo-team">

        </div>
        <div className="list-buttons">
          <button type="button" id="btn_add_member" className="button-add-delete" title="Adicionar membro">+</button>
          <button type="button" id="btn_delete_team" className="button-add-delete" title="Deletar equipe" onClick={() => deleteTeam()}>x</button>
        </div>
      </div>

      <h4 className="center">Membros</h4>
      <div className="list-members">
        {(teamDataState[0]?.members) ? 
            (teamDataState[0]?.members).map(member => (
              <div className="member-icon" key={member.id} title={member.username + ' - ' + member.role}>
                
              </div>
            ))
        : ''}
      </div>

      <div className="box">
        <h4 className="bold">Histórico de competições</h4>
        <div className="list-competitions">
          {(teamDataState[0]?.competitions) ? 
            (teamDataState[0]?.competitions).map(competition => (
              <div className="competition" key={competition.id}>
                <h3>{competition.nome_competicao}</h3>
                <p>{competition.data_participacao}</p>
              </div>
            ))
          : ''}
        </div>
      </div>

      <div className="box">
        <h4 className="bold">Títulos</h4>
        <div className="list-titles">
          {(teamDataState[0]?.titles) ? 
            (teamDataState[0]?.titles).map(title => (
              <div className="title" key={title.id}>
                <h3>{title.nome_competicao}</h3>
                <p>{title.posicao}</p>
              </div>
            ))
          : ''}
        </div>
      </div>

      <div className="modal-box">
        <h4>Adicionar jogador</h4>
        <form onSubmit={e => invitePlayer(e)}>
          <input type="text" id="input_username" placeholder="Username" required />
          <button id="btn_invite" type="submit">Convidar</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

const mapDispatchToProps = dispatch => ({
  teamData: (name, initials, entryYear, image) => dispatch(teamActions.teamData(name, initials, entryYear, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewTeam);
