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

  async function getData() {
    await api.get(`/api/championships-matchs/${competitionPrints[0]?.id_partida}`)
    .then(response => {
      setTeste(response.data)
      return
    })
    .catch(err => console.log(err.response))
  }

  async function getDataPhases() {
    api.get(`/api/championships-phases?competition_id=${competition[0].id}`)
    .then(response => {
      setCompetitionPhases(response.data)
      return
    })
    .catch(err => console.log(err.response))
  }

  function setWinner(id, winner) {
    let matchs = [];

    getData()

    if(teste.matchs !== undefined) {
      for(let i=0; i < (teste.matchs).length; i++) {
        if(teste.matchs[i].id === id) {
          matchs.push({
            id: teste.matchs[i].id,
            team1: teste.matchs[i].team1,
            team2: teste.matchs[i].team2,
            match_code: teste.matchs[i].match_code,
            winner: winner
          })
        } else {
          matchs.push(teste.matchs[i])
        }
      }

      api.put(`/api/championships-matchs/${competitionPrints[0]?.id_partida}`, {
        id: teste.id,
        competition_name: teste.name,
        matchs,
        winner
      })
      .then(() => setToViewed(id))      
    }
  }

  function setToViewed(id) {
    let prints = [];

    for(let i=0; i < (competitionPrints[0]?.prints).length; i++) {
      if(competitionPrints[0].prints[i].id === id) {
        prints.push({
          id: competitionPrints[0].prints[i].id,
          team1: competitionPrints[0].prints[i].team1,
          team2: competitionPrints[0].prints[i].team2,
          image_team1: competitionPrints[0].prints[i].image_team1,
          image_team2: competitionPrints[0].prints[i].image_team2,
          url_print: competitionPrints[0].prints[i].url_print,
          isViewed: true
        })
      } else {
        prints.push(competitionPrints[0].prints[i])
      }
    }

    api.put(`/championships-prints/${competition[0].id}`, {
      id: competitionPrints[0].id,
      id_partida: competitionPrints[0].id_partida,
      competition_name: competitionPrints[0].competition_name,
      competition_initials: competitionPrints[0].competition_initials,
      user_manage: competitionPrints[0].user_manage,
      prints
    })
    .then(() => movePhase())
    .catch(err => console.log(err))
  }

  function movePhase() {
    let arrayAux = [];

    getDataPhases()
    console.log(competitionPhases[0].phase)
    if(competitionPhases !== undefined) {
      switch(competitionPhases[0].phase) {
        case 'eliminatorias':
          console.log('entrei elimi')
          arrayAux = competitionPhases[0].phases.eliminatorias
          arrayAux.push(team?.name)
          api.put(`/api/championships-phases/${competitionPhases[0].id}`, {
            id: competitionPhases[0].id,
            competition_id: competition[0].id,
            phase: competitionPhases[0].phase,
            competition_name: competition[0].competition_name,
            competition_initials: competition[0].competition_initials,
            phases: {
              eliminatorias: [],
              oitavas: arrayAux,
              quartas: [],
              semi: [],
              final: []
              }
          })
          .then(() => { 
            alert('Vencedor selecionado com sucesso!')
            return
          })
          break
        case 'oitavas':
          console.log('entrei oitava')
          arrayAux = competitionPhases[0].phases.oitavas
          arrayAux.push(team?.name)
          api.put(`/api/championships-phases/${competitionPhases[0].id}`, {
            id: competitionPhases[0].id,
            competition_id: competition[0].id,
            phase: competitionPhases[0].phase,
            competition_name: competition[0].competition_name,
            competition_initials: competition[0].competition_initials,
            phases: {
              eliminatorias: [],
              oitavas: [],
              quartas: arrayAux,
              semi: [],
              final: []
              }
          })
          .then(() => { 
            alert('Vencedor selecionado com sucesso!')
            return
          })
          break
        case 'quartas':
          console.log('entrei quarta')
          arrayAux = competitionPhases[0].phases.quartas
          arrayAux.push(team?.name)
          api.put(`/api/championships-phases/${competitionPhases[0].id}`, {
            id: competitionPhases[0].id,
            competition_id: competition[0].id,
            phase: competitionPhases[0].phase,
            competition_name: competition[0].competition_name,
            competition_initials: competition[0].competition_initials,
            phases: {
              eliminatorias: [],
              oitavas: [],
              quartas: [],
              semi: arrayAux,
              final: []
              }
          })
          .then(() => { 
            alert('Vencedor selecionado com sucesso!')
            return
          })
          break
        case 'semis':
          console.log('entrei semi')
          arrayAux = competitionPhases[0].phases.semis
          arrayAux.push(team?.name)
          api.put(`/api/championships-phases/${competitionPhases[0].id}`, {
            id: competitionPhases[0].id,
            competition_id: competition[0].id,
            phase: competitionPhases[0].phase,
            competition_name: competition[0].competition_name,
            competition_initials: competition[0].competition_initials,
            phases: {
              eliminatorias: [],
              oitavas: [],
              quartas: [],
              semi: [],
              final: arrayAux
              }
          })
          .then(() => { 
            alert('Vencedor selecionado com sucesso!')
            return
          })
          break
        case 'final':
          console.log('entrei final')
          arrayAux = competitionPhases[0].phases.final
          arrayAux.push(team?.name)
          api.put(`/api/championships-phases/${competitionPhases[0].id}`, {
            id: competitionPhases[0].id,
            competition_id: competition[0].id,
            phase: competitionPhases[0].phase,
            competition_name: competition[0].competition_name,
            competition_initials: competition[0].competition_initials,
            phases: {
              eliminatorias: [],
              oitavas: [],
              quartas: [],
              semi: [],
              final: arrayAux
              }
          })
          .then(() => { 
            alert('Vencedor selecionado com sucesso!')
            return
          })
          break
        default:
          return
      }
    }
  }

  function setDatetime(e) {
    e.preventDefault();
    const datetime_initial = {
      date: document.getElementById('edit_date').value,
      time: document.getElementById('edit_time').value,
    }

    const datetime_final = {
      date: document.getElementById('edit_date_final').value,
      time: document.getElementById('edit_time_final').value,
    }
    
    api.put(`/api/championships/${competition[0].id}`, {
      id: competition[0].id,
      competition_name: competition[0].competition_name,
      competition_initials: competition[0].competition_initials ,
      competition_picture: competition[0].competition_picture,
      competition_level: competition[0].competition_level,
      competition_initial_date: datetime_initial,
      competition_final_date: datetime_final,
      competition_initial_subscription: competition[0].competition_initial_subscription,
      competition_final_subscription: competition[0].competition_final_subscription,
      competition_awards: competition[0].competition_awards,
      competition_rules: competition[0].competition_rules,
      competition_qty_teams: competition[0].competition_qty_teams,
      competition_manager: competition[0].competition_manager
    })
    .then(() => {
      alert('Data alterada com sucesso!')
      window.location.href="/mycompetition"
    })
    .catch(() => alert('Ocorreu um erro na alteração das datas!'))
  }

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
