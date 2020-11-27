import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from '../../services/api';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import * as teamActions from '../../store/actions/team';

import {
  TeamName, 
  Since
} from './styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '300px',
    borderRadius: '10px',
    textAlign: 'center'
  },
  btn: {
    width: '80px',
    background: '#AA0000',
    color: '#FFF',
    borderRadius: '10px',
    margin: '10px 5px 0px 5px'
  }
}));

const Team = ({ team, user, teamData }) => {  
  const [invites, setInvites] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    api.get(`/api/invites?user_convidado=${user.username}`)
    .then(response => setInvites(response.data))
    .catch(err => console.log(err.response))
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function exitTeam() {
    api.delete(`/api/userteam/${user.username}`)
    .then(() => {
      teamData(null, null, null)
      alert('Saída de equipe realizada com sucesso!')
      window.location.href='/home'
    })
    .catch(error => console.log(error))
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
    <div>
    <div className="container">
      <Menu />
      <Header />
      <Title content="Equipe" />{console.log(open)}
      
      {(team.name) ? 
        <div className="center">
          <img className="image2" src={team.image}></img>
          <TeamName>{team.name}</TeamName>
          <Since>Desde {team.entryYear}</Since>
          
          <div className="row">
            <Link to={`/viewteam`} id="btn_viewTeam" className="default-button">Visualizar equipe</Link>{console.log(team)}
            <button type="button" id="btn_leave" className="default-button" onClick={handleOpen}>Sair da equipe</button>
          </div>
        </div> 
      : 
        <div className="list-invites">
          <div className="list">
            <h3>Seus convites</h3>
            {(invites) ? 
              invites.map(invite => (
                <div className="center">
                  <div className="invite">
                    <h2>{invite.nome_equipe}</h2>
                    <span>{invite.sigla_equipe}</span>
                    <div className="invite-buttons">
                      <button type="button" id="btn_accept" className="button-yes-no btn-primary" onClick={() => acceptInvite(invite)}>Yes</button>
                      <button type="button" id="btn_reject" className="button-yes-no btn-primary" onClick={() => rejectInvite(invite)}>No</button>
                    </div>
                  </div>
                  <Link to="/newteam" id="btn_create_team">Criar nova equipe</Link>
                </div> 
              ))              
            : ''}          
          </div>
        </div>  
      }
    </div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <h4>Deseja realmente sair?</h4>
        <button id="btn_confirm_leave" className={classes.btn} onClick={() => exitTeam()}>Sim</button>
        <button id="btn_cancel_leave" className={classes.btn} onClick={() => handleClose()}>Não</button>
      </div>
    </Modal>
  </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

const mapDispatchToProps = dispatch => ({
  teamData: (name, initials, entryYear) => dispatch(teamActions.teamData(name, initials, entryYear))
});

export default connect(mapStateToProps, mapDispatchToProps)(Team)
