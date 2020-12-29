import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import * as teamActions from '../store/actions/team';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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
 * @module pages/viewTeam 
 */

/**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} team - Identificador da equipe
 */

 /**
 * @typedef Team
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome da equipe
 */

/**
 * Componente responsável por renderizar a tela de detalhes da equipe.
 * @param {Object} user - Objeto que possui os dados de User presentes na store do redux.
 * @param {Object} team - Objeto que possui os dados de Team presentes na store do redux.
 * @param {function} deleteTeamAtStore - Função responsável por deletar os dados de Team presentes na store do redux.
 */
const ViewTeam = ({ user, team, deleteTeamAtStore }) => {
  document.title = 'Battleside - Ver equipe';
  const accessToken = getAccessToken();

  const [members, setMembers] = useState([]);
  const [titles, setTitles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [userList, setUserList] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [listInviteMember, setListInviteMember] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    api.get('/api/users', { headers: { Authorization: accessToken }})
    .then(response => setUserList(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/users?team=${team.id}`, { headers: { Authorization: accessToken }})
    .then(response => setMembers(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/competitions?winnerTeam=${team.id}`, { headers: { Authorization: accessToken }})
    .then(response => setTitles(response.data))
  }, [])

  /**
   * Função responsável por abrir o modal do tipo definido.
   * @param {string} type - String que possui o tipo do modal que deve ser aberto.
   * 
   */
  const handleOpen = type => {
    if(type === 'delete') {
      setOpenDelete(true);
    } else {
      setOpenAdd(true)
    }
  };

  /**
   * Função responsável por fechar o modal do tipo definido.
   * @param {string} type - String que possui o tipo do modal que deve ser fechado.
   * 
   */
  const handleClose = type => {
    if(type === 'delete') {
      setOpenDelete(false);
    } else {
      setOpenAdd(false)
    }
  };

  /**
   * Função responsável por fazer a busca filtrada a partir do username do usuario pesquisado.
   * @param {string} searchedMember - Username do membro digitado.
   * 
   */
  function getListOfMembersToInvite(searchedMember) {
    setListInviteMember(userList.filter(value => {
      const originalValue = (value.leagueOfLegendsUsername).toLowerCase();
      const searchedValue = searchedMember.toLowerCase();

      return originalValue.startsWith(searchedValue);
    }));
  }

  /**
   * Função responsável por enviar ao backend o convite do player.
   * @param {object} e - Objeto que possui os dados referentes ao event que foi gerado.
   * 
   */
  async function invitePlayer(e) {
    e.preventDefault();

    if(!receiver.id) {
      error('Selecione um usuário!', '');
      return undefined
    }

    try {
      await api.post('/api/invites', {
        sender: user.id,
        receiver: receiver.id,
        team: user.team
      }, { headers: { Authorization: accessToken }})
      handleClose('add');
      success('Usuário convidado com sucesso!', '');

    } catch(err) {
      handleClose('add');
      if(err.response.status === 422) {
        error('Ocorreu um erro inesperado!', 'Relogue na aplicação e tente novamente.');
      } else {
        error('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde!');
      }
    }
  }

  /**
   * Função responsável por enviar ao backend a solicitação de exclusão da equipe.
   * 
   */
  async function deleteTeam() {
    try {
      await api.delete(`/api/teams/${team.id}`, { headers: { Authorization: accessToken }})
      deleteTeamAtStore(null,null,null,null);
      success('Equipe deletada com sucesso!', '');
      window.location.href = '/home';

    } catch(err) {
      error('Não foi possível deletar a equipe!', 'Tente novamente mais tarde!');
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content={'Equipe ' + team.name} />

      <div className="area-logo center">
        <div className="logo-team">
          <h1>{(team.name).split('')[0]}</h1>
        </div>
        <div className="list-buttons">
          <button type="button" id="btn_add_member" className="button-add-delete" title="Adicionar membro" onClick={() => handleOpen('add')}>+</button>
          <button type="button" id="btn_delete_team" className="button-add-delete" title="Deletar equipe" onClick={() => handleOpen('delete')}>x</button>
        </div>
      </div>

      <h4 className="center">Membros</h4>
      <div className="list-members">
        {(members.length !== 0) ? members.map(member => (
          <div className="member-icon" key={member.id} title={member.leagueOfLegendsUsername + ' - ' + member.preferredRole}>
            {(member.leagueOfLegendsUsername).split('')[0]}
          </div>
        )) : ''}
      </div>

      <div className="box">
        <h4 className="bold">Títulos</h4>
        <div className="list-titles">
          {titles?.map(title => (
            <div className="title" key={title.id}>
              <h3>{title.name}</h3>
              <p>{title.initials}</p>
            </div>
          ))}
        </div>
      </div>

      <br /><br />

      <Modal
        open={openDelete}
        onClose={() => handleClose('delete')}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h4>Deseja realmente deletar a equipe?</h4>
          <button id="btn_confirm_leave" className={classes.btn} onClick={() => deleteTeam()}>Sim</button>
          <button id="btn_cancel_leave" className={classes.btn} onClick={() => handleClose('delete')}>Não</button>
        </div>
      </Modal>

      <Modal
        open={openAdd}
        onClose={() => handleClose('add')}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h4>Adicionar Membro</h4>
          <h6><strong>Selecionado:</strong><br />{receiver.leagueOfLegendsUsername}</h6>
          <form onSubmit={e => invitePlayer(e)}>
            <input 
              type="text" 
              id="input_username" 
              className="input_invite" 
              placeholder="Username" 
              onChange={e => getListOfMembersToInvite(e.target.value)}
            />
            <button id="btn_invite" type="submit">Convidar</button>
          </form>
          <div className="list-members-to-invite">
            {
              listInviteMember?.map(member => (
                <div key={member.id} onClick={() => setReceiver(member)} className="list-members-to-invite-item">
                  <h1>{member.leagueOfLegendsUsername}</h1>
                  {(member.name).split(' ')[0]}
                </div>
              ))
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

/**
* Função que pega os dados do usuário e equipe na Store.
* @param {Object} state - Objeto que contém o estado global da aplicação
*/
const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

/**
* Função que altera os dados da equipe na Store.
* @param {Function} dispatch - Função que realiza o disparo da action para alterar a Store.
*/
const mapDispatchToProps = dispatch => ({
  deleteTeamAtStore: (name, initials, logoPictureURL, id) => dispatch(teamActions.logoutTeam(name, initials, logoPictureURL, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewTeam);
