import React, { useState } from 'react';
import { connect } from 'react-redux'; 

import Title from '../components/Title';
import Menu from '../components/Menu';
import Header from '../components/Header';

import api from '../services/api';

const NewCompetition = ({ user }) => {
  document.title = 'Battleside - Nova competição';

  const [level, setLevel] = useState('Free');
  const [QTYTeams, setQTYTeams] = useState('4')
  const [typeAward, setTypeAward] = useState('RP');

  async function sendData(e) {
    e.preventDefault();

    try {
      await api.post('/api/competitions', {
        name: document.getElementById('competition_name').value,
        initials: document.getElementById('competition_initials').value,
        award: {
          amount: document.getElementById('competition_amount').value,
          type: typeAward
        },
        subscriptionInitialDate: document.getElementById('competition_initial_subscription_date').value,
        subscriptionFinalDate: document.getElementById('competition_final_subscription_date').value,
        initialDate: document.getElementById('competition_initial_date').value,
        finalDate: document.getElementById('competition_final_date').value,
        slots: QTYTeams,
        level: level,
        socialMedia: {
          facebook: "",
          instagram: "",
          twitter: "",
          other: ""
        },
        competitionRules: document.getElementById('competition_rules').value,
        winnerTeam: null,
        creator: user.id,
        paused: false
      })
      alert('Competição criada com sucesso!');
      window.location.href = '/mycompetition';

    } catch(err) {
      alert('Não foi possivel criar a competição!')
      console.log(err.response)
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />

      <Title content="Nova competição" />

      <form onSubmit={e => sendData(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_name">Nome *</label>
              <input
                type="text"
                required
                id="competition_name"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_initials">Sigla *</label>
              <input
                type="text"
                required
                id="competition_initials"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_level">Nível *</label>
              <select id="competition_level" onChange={e => setLevel(e.target.value)} className="form-control">
                <option value="Free">Livre</option>
                <option value="Silver">Prata</option>
                <option value="Gold">Ouro</option>
                <option value="Platinum">Platina</option>
                <option value="Diamond">Diamante</option>
                <option value="Master">Mestre</option>
                <option value="Grandmaster">Grão Mestre</option>
                <option value="Challenger">Challenger</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_initial_date">Data do início da competição *</label>
              <input
                type="date"
                required
                id="competition_initial_date"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_final_date">Data do fim da competição *</label>
              <input
                type="date"
                required
                id="competition_final_date"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_initial_subscription_date">Data do início da inscrição *</label>
              <input
                type="date"
                required
                id="competition_initial_subscription_date"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_final_subscription_date">Data do fim da inscrição *</label>
              <input
                type="date"
                required
                id="competition_final_subscription_date"
                className="form-control"
              />
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_qty_teams">Quantidade de equipes *</label>
              <select id="competition_qty_teams" className="form-control" onChange={e => setQTYTeams(e.target.value)}>
                <option value="4">4 equipes</option>
                <option value="8">8 equipes</option>
                <option value="16">16 equipes</option>
                <option value="32">32 equipes</option>
                <option value="64">64 equipes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_typeAward">Tipo de premiação *</label>
              <select id="competition_typeAward" className="form-control" onChange={e => setTypeAward(e.target.value)}>
                <option value="RP">RP</option>
                <option value="Money">Dinheiro</option>
                <option value="None">Nenhum</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_amount">Valor de premiação *</label>
              <input type="text" id="competition_amount" className="form-control" placeholder="Em caso de 'nenhum', coloque 0" required />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="competition_rules">Regras *</label>
          <input
            type="text"
            required
            id="competition_rules"
            className="form-control"
          />
        </div>
        
        <div className="center">
          <button type="submit" id="btn_create_competition" className="btn_save btn-primary">Criar</button>
        </div>
        <br /><br /><br />
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(NewCompetition);
