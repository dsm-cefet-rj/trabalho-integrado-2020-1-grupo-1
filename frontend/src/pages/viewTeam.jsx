import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../services/api';

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

const ViewTeam = ({ user, team, deleteTeamAtStore }) => {
  document.title = 'Battleside - Ver equipe';

  const [members, setMembers] = useState({});
  const [titles, setTitles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [userList, setUserList] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [listInviteMember, setListInviteMember] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    api.get('/api/users')
    .then(response => setUserList(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/users?team=${team.id}`)
    .then(response => setMembers(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/competitions?winnerTeam=${team.id}`)
    .then(response => setTitles(response.data))
  }, [])

  const handleOpen = type => {
    if(type === 'delete') {
      setOpenDelete(true);
    } else {
      setOpenAdd(true)
    }
  };

  const handleClose = type => {
    if(type === 'delete') {
      setOpenDelete(false);
    } else {
      setOpenAdd(false)
    }
  };

  function getListOfMembersToInvite(searchedMember) {
    setListInviteMember(userList.filter(value => {
      const originalValue = (value.leagueOfLegendsUsername).toLowerCase();
      const searchedValue = searchedMember.toLowerCase();

      return originalValue.startsWith(searchedValue);
    }));
  }

  async function invitePlayer(e) {
    e.preventDefault();

    if(!receiver.id) {
      alert('Selecione um usuário!');
      return undefined
    }

    try {
      await api.post('/api/invites', {
        sender: user.id,
        receiver: receiver.id,
        team: user.team
      })
      alert('Usuário convidado com sucesso!')

    } catch(err) {
      alert('Não foi possível convidar o usuário!')
    }
  }

  async function deleteTeam() {
    try {
      await api.delete(`/api/teams/${team.id}`)
      deleteTeamAtStore(null,null,null,null);
      alert('Equipe deletada com sucesso!');
      window.location.href = '/home';

    } catch(err) {
      alert('Não foi possível deletar a equipe!');
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content={'Equipe ' + team.name} />

      <div className="area-logo center">
        <div className="logo-team">

        </div>
        <div className="list-buttons">
          <button type="button" id="btn_add_member" className="button-add-delete" title="Adicionar membro" onClick={() => handleOpen('add')}>+</button>
          <button type="button" id="btn_delete_team" className="button-add-delete" title="Deletar equipe" onClick={() => handleOpen('delete')}>x</button>
        </div>
      </div>

      <h4 className="center">Membros</h4>
      <div className="list-members">
        {members.map(member => (
          <div className="member-icon" key={member.id} title={member.leagueOfLegendsUsername + ' - ' + member.preferredRole} />
        ))}
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

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

const mapDispatchToProps = dispatch => ({
  deleteTeamAtStore: (name, initials, entryYear, image) => dispatch(teamActions.logoutTeam(name, initials, entryYear, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewTeam);
