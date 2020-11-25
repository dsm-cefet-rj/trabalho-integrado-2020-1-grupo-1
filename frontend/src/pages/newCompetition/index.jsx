import React, { useState } from 'react';
import { connect } from 'react-redux'; 

import Title from '../../components/Title';
import Menu from '../../components/Menu';
import Header from '../../components/Header';

import api from '../../services/api';

const NewCompetition = ({ user }) => {
  const [level, setLevel] = useState('');

  function sendData(e) {
    e.preventDefault();
    const competition_name = document.getElementById('competition_name').value;
    const competition_initials = document.getElementById('competition_initials').value;
    const competition_picture = "";
    const competition_level = level;
    const competition_initial_date = {
      date: document.getElementById('competition_initial_date').value,
      time: document.getElementById('competition_initial_time').value
    };
    const competition_final_date = {
      date: document.getElementById('competition_final_date').value,
      time: document.getElementById('competition_final_time').value
    };
    const competition_initial_subscription = document.getElementById('competition_initial_subscription_date').value;
    const competition_final_subscription = document.getElementById('competition_final_subscription_date').value;
    const competition_awards = document.getElementById('competition_awards').value;
    const competition_rules = document.getElementById('competition_rules').value;
    const competition_qty_teams = document.getElementById('competition_qty_teams').value;

    api.post('/api/championships', {
      id:Math.random(),
      competition_name,
      competition_initials,
      competition_picture,
      competition_level,
      competition_initial_date,
      competition_final_date,
      competition_initial_subscription,
      competition_final_subscription,
      competition_awards,
      competition_rules,
      competition_qty_teams,
      competition_manager: user.username
    })
    .then(() => alert('Campeonato criado com sucesso!'))
    .catch(() => alert('Ocorreu um erro inesperado!'))
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
              <label htmlFor="url-img">Foto de perfil</label>
              <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
              <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                        {/* <button className="btn_load_image" id="competition_load_image" onClick={() => {
                          // setStateOfButton()
                          // convertToBase64()
                          console.log('carregar')
                        }}>
                   Carregar
              </button> */}
              {/* <button type="button" id="competition_select_picture" onClick={() => console.log('enviar')}>Enviar</button> */}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_level">Nível *</label>
              <select id="competition_level" onChange={e => setLevel(e.target.value)} className="form-control">
                <option value="Livre">Livre</option>
                <option value="Ferro+">Ferro+</option>
                <option value="Prata+">Prata+</option>
                <option value="Ouro+">Ouro+</option>
                <option value="Platina+">Platina+</option>
                <option value="Diamante+">Diamante+</option>
                <option value="Mestre+">Mestre+</option>
                <option value="Grão Mestre+">Grão Mestre+</option>
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
              <label htmlFor="competition_initial_time">Horário do início da competição *</label>
              <input
                type="time"
                required
                id="competition_initial_time"
                className="form-control"
              />
            </div>
          </div>
        </div>
        
        <div className="row">
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

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_final_time">Horário do fim da competição *</label>
              <input
                type="time"
                required
                id="competition_final_time"
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
              <label htmlFor="competition_qty_teams">Quantidade de equipes</label>
              <select id="competition_qty_teams" className="form-control">
                <option value="8">8 equipes</option>
                <option value="16">16 equipes</option>
                <option value="32">32 equipes</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="competition_awards">Premiação *</label>
              <input
                type="text"
                required
                id="competition_awards"
                className="form-control"
              />
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
