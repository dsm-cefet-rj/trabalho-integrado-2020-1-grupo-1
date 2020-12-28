import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

export const CardMatch = styled.div`
  background: #CECECE;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;

  .img-right {
    float: right;
  }

  .img-team {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-team {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 17px;
    font-weight: bold;
  }

  .versus {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 40px;
    font-weight: bold;
  }

  .buttons-winner {
    margin-top: 10px;
    .col-md-6 {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      width: 150px;
      padding: 7px;
      border-radius: 3px;
    }
  }

  .btn-print {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    button {
      width: 150px;
      padding: 7px;
      border-radius: 3px;
    }
  }

  img {
    width: 100px;
    border-radius: 50px;
  }
`

export const AdminArea = styled.div`
  background: #CECECE;
  border-radius: 10px;
  margin-top: 30px;
  padding: 10px;

  h4 {
    font-weight: bold;
  }

  button {
    padding: 7px 30px;
    margin-right: 10px;
    border-radius: 3px;
    margin-top: 15px;
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
 * @module pages/MyCompetition 
 */

/**
 * @typedef Competition
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome
 * @property {String} initials - Iniciais
 */

 /**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 */

/**
 * Componente responsável por renderizar a tela de minha competição.
 * @param {Object} user - Objeto que possui os dados de User presentes na store do redux.
 */

const MyCompetition = ({ user }) => {
  document.title = 'Battleside - Minha competição';
  const accessToken = getAccessToken();

  const [competition, setCompetition] = useState({});
  const [competitionPrints, setCompetitionPrints] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    api.get(`/api/competitions?creator=${user.id}&finished=false`, { headers: { Authorization: accessToken }})
    .then(response => setCompetition(response.data))
  }, [])

  useEffect(() => {
    api.get(``)
    .then(response => competitionPrints(response.data))
  }, [])

  /**
   * Função responsável por alterar o estado do modal (abrir).
   * @param {String} type - String que possui o tipo da modal que a aplicação deve abrir.
  */
  const handleOpen = type => {
    if(type === 'edit') {
      setOpenEdit(true);
    } else {
      setOpenDelete(true);
    }
  };

  /**
   * Função responsável por alterar o estado do modal (fechar).
   * @param {String} type - String que possui o tipo da modal que a aplicação deve abrir.
  */ 
  const handleClose = type => {
    if(type === 'edit') {
      setOpenEdit(false);
    } else {
      setOpenDelete(false);
    }
  };

  /**
   * Função responsável por enviar ao backend a solicitação de deletar a competição.
   * 
  */
  async function deleteCompetition() {
    try {
      api.delete(`/api/competitions/${competition[0].id}`, { headers: { Authorization: accessToken }})
      success('Competição deletada com sucesso!', 'Você será redirecionado para a Home após este alerta ser fechado!');
      window.location.href = '/home';

    } catch(err) {
      error('Ocorreu um erro na solicitação!', 'Tente novamente mais tarde!');
    }
  }

  /**
   * Função responsável por enviar ao backend a solicitação para alterar a data da competição.
   * 
  */
  async function setDateOfCompetition(e) {
    e.preventDefault();

    try {
      await api.put(`/api/competitions/${competition[0].id}`, {
        initialDate: document.getElementById('edit_date').value,
        finalDate: document.getElementById('edit_date_final').value
      }, { headers: { Authorization: accessToken }})
      success('Dados alterados com sucesso!', '');

    } catch(err) {
      if(err.response.status === 422) {
        error('Ocorreu um erro inesperado!', err.response.data?.errors[0]);
      } else {
        error('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde!');
      }
    }
  }

  /**
   * Função responsável por enviar ao backend o vencedor de uma partida.
   * @param {String} winnerID - ID da equipe vencedora
   * @param {String} matchID - ID da partida
   * 
  */
  async function setWinner(winnerID, matchID) {
    try { 
      await api.put(`/api/matches/${matchID}`, {
        winnerTeam: winnerID
      }, { headers: { Authorization: accessToken }})
    } catch(err) {

    }
  }

  /**
   * Função responsável por converter e retornar a data para o formato americano.
   * @param {String} date - Parâmetro que guarda a data no formato original.
   * 
   */
  function convertDate(date){
    const splitedDate = date.split('/');
    const convertedDate = splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0];

    return convertedDate
  }

  /**
   * Função responsável por renderizar a lista de prints.
   * @param {Object} print - String que possui o tipo da modal que a aplicação deve abrir.
   * 
  */
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
          <button type="button" id="" className="btn-primary" onClick={() => setWinner(print.id)}>Vencedor</button>
        </div>
        <div className="col-md-6">
          <button type="button" id="" className="btn-primary" onClick={() => setWinner(print.id)}>Vencedor</button>
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
            {/* <div className="list-matchs">
              {(competitionPrints[0]?.prints) ? (competitionPrints[0]?.prints).map(print => (
                generatePrintList(print)
              )) : ''}
            </div> */}
          </div>

          <AdminArea>
            <h4>Ações do administrador</h4>
            <button type="button" id="btn_edit_datehour" className="btn-primary" onClick={() => handleOpen('edit')}>Editar data e horário</button>
            <button type="button" id="btn_delete_comp" className="btn-primary" onClick={() => handleOpen('delete')}>Deletar competição</button>
          </AdminArea>

          <br /><br />

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
                <form onSubmit={e => setDateOfCompetition(e)}>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_date">Data inicial da competição *</label>
                    <input type="date" className="form-group" id="edit_date" defaultValue={convertDate(competition[0].initialDate)} required />
                  </div>
                  <div className="form-group">
                    <label className="black" htmlFor="edit_date_final">Data final da competição *</label>
                    <input type="date" className="form-group" id="edit_date_final" defaultValue={convertDate(competition[0].finalDate)} required />
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
  user: state.user
})

export default connect(mapStateToProps)(MyCompetition)
