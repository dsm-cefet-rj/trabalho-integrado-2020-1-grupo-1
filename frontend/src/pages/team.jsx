import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import * as teamActions from '../store/actions/team';

export const TeamName = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
  color: #FFF;
`

export const Since = styled.h6`
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
  color: #E5E5E5;
  margin-bottom: 60px;
`

export const ModalScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0,0,0,.5);
  border: 1px solid red;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalDiv = styled.div`
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: red;

  h4 {
    text-align: center;
  }
`

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

/**
 * @module pages/team 
 */

/**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 */

 /**
 * @typedef Team
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} image - URL da imagem da equipe 
 * @property {String} name - Nome da equipe 
 * @property {String} initials - Iniciais da equipe 
 */

 /**
 * @typedef Invite
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome da equipe 
 * @property {String} initials - Iniciais da equipe 
 */

/**
 * Componente responsável por renderizar a tela de detalhes da competição.
 * @param {Object} team - Objeto que possui os dados de Team presentes na store do redux.
 * @param {Object} user - Objeto que possui os dados de User presentes na store do redux.
 * @param {function} deleteTeamAtStore - função que realiza a exclusão da equipe na store do redux.
 * @param {function} setTeamAtStore - função que realiza a edição da equipe na store do redux.
 */
const Team = ({ team, user, deleteTeamAtStore, setTeamAtStore }) => {  
  document.title = 'Battleside - Equipe';
  const accessToken = getAccessToken();

  const [invites, setInvites] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    api.get(`/api/invites?receiver=${user.id}`, { headers: { Authorization: accessToken }})
    .then(response => setInvites(response.data))
  }, [])

  /**
   * Função responsável por setar o modal para aberto.
   *
   */
  const handleOpen = () => {
    setOpen(true);
  };

  /**
   * Função responsável por setar o modal para fechado.
   *
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Função responsável por enviar ao backend a solicitação de saída da equipe.
   *
   */
  async function exitTeam() {
    try {
      await api.put(`/api/users/${user.id}`, {
        team: null
      }, { headers: { Authorization: accessToken }})

      deleteTeamAtStore(null, null, null, null);
      success('Saída de equipe realizada com sucesso!', 'Você será redirecionado para a Home após este alerta ser fechado!');
      window.location.href='/home';

    } catch(err) {
      error('Não foi possivel sair da equipe!', 'Tente novamente mais tarde!');
    }
  }

  /**
   * Função responsável por enviar ao backend a solicitação de aceitação do convite.
   *
   */
  async function acceptInvite(invite) {
    try {
      await api.put(`/api/invites/${invite.id}/accept`, {})
      setTeamAtStore(
        invite.name,
        invite.initials,
        "urlLogoEquipe",
        invite.id
      );

      success('Convite aceitado com sucesso!', '');
      window.location.href = '/team';

    } catch(err) {
      error('Ocorreu um erro na solicitação!', 'Tente novamente mais tarde!');
    }
  }

  /**
   * Função responsável por enviar ao backend a solicitação de rejeição do convite.
   *
   */
  async function rejectInvite(id) {
    try {
      await api.delete(`/api/invites/${id}`)
      success('Convite deletado com sucesso!', '');
      window.location.href = '/team';

    } catch(err) {
      error('Ocorreu um erro na solicitação!', 'Tente novamente mais tarde!');
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose('delete')}
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

      <div className="container">
        <Menu />
        <Header />
        <Title content="Equipe" />
        
        {(team.id) ? 
          <div className="center">
            <div className="image2">
              <h1>{(team.name).split('')[0]}</h1>
            </div>
            <TeamName>{team.name}</TeamName>
            <Since>{team.initials}</Since>
            
            <div className="row">
              <Link to={`/viewteam`} id="btn_viewTeam" className="default-button">Visualizar equipe</Link>
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
                      <h2>{invite.name}</h2>
                      <span>{invite.initial}</span>
                      <div className="invite-buttons">
                        <button type="button" id="btn_accept" className="button-yes-no btn-primary" onClick={() => acceptInvite(invite)}>Aceitar</button>
                        <button type="button" id="btn_reject" className="button-yes-no btn-primary" onClick={() => rejectInvite(invite.id)}>Rejeitar</button>
                      </div>
                    </div>
                  </div> 
                ))              
              : ''}          
            </div>
            <Link to="/newteam" id="btn_create_team">Criar nova equipe</Link>
          </div>  
        }
      </div>
      <br /><br />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

const mapDispatchToProps = dispatch => ({
  deleteTeamAtStore: (name, initials, logoPictureURL, id) => dispatch(teamActions.logoutTeam(name, initials, logoPictureURL, id)),
  setTeamAtStore: (name, initials, logoPictureURL, id) => dispatch(teamActions.signinTeam(name, initials, logoPictureURL, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team)
