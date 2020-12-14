import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';
import { connect } from 'react-redux';

import { CardMatch, AdminArea } from './styles';
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

const MyCompetition = ({ user, team }) =>{
  const [competition, setCompetition] = useState({});
  const [competitionPrints, setCompetitionPrints] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [teste, setTeste] = useState({});
  const [competitionPhases, setCompetitionPhases] = useState({});
  const classes = useStyles();

  const handleOpen = type => {
    if(type === 'edit') {
      setOpenEdit(true);
    } else {
      setOpenDelete(true);
    }
  };

  const handleClose = type => {
    if(type === 'edit') {
      setOpenEdit(false);
    } else {
      setOpenDelete(false);
    }
  };

  useEffect(() => {
    api.get(`/championships?competition_manager=${user.username}`)
    .then(response => setCompetition(response.data))
    .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    api.get(`/championships-prints?user_manage=${user.username}`)
    .then(response => setCompetitionPrints(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function deleteCompetition() {
    api.delete(`/api/championships/${competition[0].id}`)
    .then(() => {
      alert('Competição deletada com sucesso!')
      window.location.href='/home'
    })
    api.delete(`/api/championships-prints/${competition[0].id}`)
  }

  function generatePrintList(print) {
    if(!print.isViewed) {
      return <CardMatch key={print.id}>
      <div className="row">
        <div className="col-md-2 img-team">
          <div className="icon-team">
            <img src={print.image_team1} alt={print.team1} className="img-left"/>
          </div>
        </div>
        <div className="col-md-3 name-team">
          {print.team1}
        </div>
        
        <div className="col-md-2 versus">
          X
        </div>

        <div className="col-md-3 name-team">
          {print.team2}
        </div>
        <div className="col-md-2 img-team">
          <div className="icon-team">
            <img src={print.image_team2} alt={print.team2} className="img-right" />
          </div>
        </div>
      </div>
      <div className="row buttons-winner">
        <div className="col-md-6">
          <button type="button" id="" className="btn-primary" onClick={() => setWinner(print.id, print.team1)} disabled={!teste ? true : false}>Vencedor</button>
        </div>
        <div className="col-md-6">
          <button type="button" id="" className="btn-primary" onClick={() => setWinner(print.id, print.team2)} disabled={!teste ? true : false}>Vencedor</button>
        </div>
      </div>
      <div className="row btn-print">
        <button type="button" id="" className="btn-primary" onClick={() => window.location.href = print.url_print}>Ver print</button>
      </div>
    </CardMatch>
    }
    
  }
  return (
    <div className="container">
      <Menu />
      <Header />

      <Title content="Sua competição" />

      {(competition[0]) ? 
        <div>
          <h1>{competition[0].name}</h1>
          <div className="box-your-competition">
            <h4 className="box-your-competition-title">Prints recebidos</h4>
            <div className="list-matchs">
              {(competitionPrints[0]?.prints) ? (competitionPrints[0]?.prints).map(print => (
                generatePrintList(print)
              )) : ''}
            </div>
          </div>

          <AdminArea>
            <h4>Ações do administrador</h4>
            <button type="button" id="btn_edit_datehour" className="btn-primary" onClick={() => handleOpen('edit')}>Editar data e horário</button>
            <button type="button" id="btn_delete_comp" className="btn-primary" onClick={() => handleOpen('delete')}>Deletar competição</button>
          </AdminArea>

          

          <Modal
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
          >
            <div className={classes.paper}>
              <h4>Editar competição</h4>
              <div>
                <form onSubmit={e => setDatetime(e)}>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_date">Data inicial da competição *</label>
                    <input type="date" className="form-group" id="edit_date" defaultValue={competition[0].competition_initial_date?.date} required />
                  </div>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_time">Hora inicial da competição *</label>
                    <input type="time" className="form-group" id="edit_time" defaultValue={competition[0].competition_initial_date?.time} required />
                  </div>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_date_final">Data final da competição *</label>
                    <input type="date" className="form-group" id="edit_date_final" defaultValue={competition[0].competition_final_date?.date} required />
                  </div>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_time_final">Hora inicial da competição *</label>
                    <input type="time" className="form-group" id="edit_time_final" defaultValue={competition[0].competition_final_date?.time} required />
                  </div>
                  <div className="center-row">
                    <button type="submit" id="btn_save_edit" className="btn-primary">Salvar</button>
                    <button type="button" id="btn_cancel_edit" className="btn-primary" onClick={() => handleClose('edit')}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>

          <Modal
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
          >
            <div className={classes.paper}>
              <h4>Deseja realmente deletar a competição?</h4>
              <button id="btn_confirm_leave" className={classes.btn} onClick={() => deleteCompetition()}>Sim</button>
              <button id="btn_cancel_leave" className={classes.btn} onClick={() => handleClose()}>Não</button>
            </div>
          </Modal>
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  team: state.team
})

export default connect(mapStateToProps)(MyCompetition)
