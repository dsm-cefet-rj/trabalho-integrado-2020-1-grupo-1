import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';
import { connect } from 'react-redux';

const MyCompetition = ({ user }) =>{
  const [competition, setCompetition] = useState({});
  const [competitionPrints, setCompetitionPrints] = useState({});
  const [championshipMatchData, setChampionshipMatchData] = useState({});

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

  function setWinner(winner) {
    api.get(`/api/championships-matchs/${competition[0].id_partida}`)
    .then(response => setChampionshipMatchData(response.data))

    api.put(`/api/championships-matchs/${competition[0].id_partida}`, {
      id: championshipMatchData.id,
      competition_name: championshipMatchData.name,
      matchs: championshipMatchData.matchs,
      winner
    })
    .then(() => alert('Vencedor selecionado com sucesso!'))
    .catch(() => alert('Ocorreu um erro inexperado!'))
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
    .then(() => alert('Data alterada com sucesso!'))
    .catch(() => alert('Ocorreu um erro na alteração das datas!'))
  }

  // function attPrintsTable(datetime_initial, datetime_final){
  //   api.put(`/api/championships-prints/${competition[0].id}`, {
  //     id: competition[0].id,
  //     id_partida: competition[0].id_partida,
  //     competition_name: competition[0].competition_name,
  //     competition_initials: competition[0].competition_initials,
  //     user_manage: competition[0].user_manage,
  //     competition_initial_date: datetime_initial,
  //     competition_final_date: datetime_final,
  //     prints: competition[0].prints
  //   })
  //   .then(() => alert('Data alterada com sucesso!'))
  // }

  function deleteCompetition() {
    api.delete(`/api/championships/${competition[0].id}`)
    .then(() => {
      alert('Competição deletada com sucesso!')
      window.location.href='/home'
    })
    api.delete(`/api/championships-prints/${competition[0].id}`)
  }

  return (
    <div className="container">
      <Menu />
      <Header />

      <Title content="Sua competição" />{console.log(competitionPrints)}

      {(competition[0]) ? 
        <div>
          <h1>{competition[0].name}</h1>
          <div className="box-your-competition">
            <h4>Prints recebidos</h4>
            <div className="list-matchs">
              {(competitionPrints.prints) ? (competitionPrints.prints).map(print => (
                <div className="match" key={print.id}>
                  <div className="icon-team">
                    <img src={print.image_team1} alt={print.team1} />
                  </div>
                  {print.team1}
                  X
                  {print.team2}
                  <div className="icon-team">
                    <img src={print.image_team2} alt={print.team2} />
                  </div>
                  <button type="button" id="" onClick={() => setWinner(print.team1)}>Vencedor</button>
                  <button type="button" id="" onClick={() => setWinner(print.team2)}>Vencedor</button>
                  <button type="button" id="" onClick={() => console.log('ver print')}>Ver print</button>
                </div>
              )) : ''}
            </div>
          </div>

          <div>
            <h4>Ações do administrador</h4>
            <button type="button" id="btn_edit_datehour" onClick={() => console.log('edit date')}>Editar data e horário</button>
            <button type="button" id="btn_delete_comp" onClick={() => deleteCompetition()}>Deletar competição</button>
          </div>

          <div>
            <form onSubmit={e => setDatetime(e)}>
              <input type="date" id="edit_date" defaultValue={competition[0].competition_initial_date?.date} required />
              <input type="time" id="edit_time" defaultValue={competition[0].competition_initial_date?.time} required />
              <input type="date" id="edit_date_final" defaultValue={competition[0].competition_final_date?.date} required />
              <input type="time" id="edit_time_final" defaultValue={competition[0].competition_final_date?.time} required />
              <button type="submit" id="btn_save_edit" >Salvar</button>
            </form>
          </div>
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(MyCompetition)
