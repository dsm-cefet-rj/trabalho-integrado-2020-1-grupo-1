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
        <input
          type="text"
          placeholder="Nome *"
          required
          id="competition_name"
        />
        <input
          type="text"
          placeholder="Sigla *"
          required
          id="competition_initials"
        />
                <label htmlFor="url-img">Foto de perfil</label>
                        <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                        <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                        <button className="btn_load_image" id="competition_load_image" onClick={() => {
                          // setStateOfButton()
                          // convertToBase64()
                          console.log('carregar')
                        }}>
                          Carregar
                        </button>
          <button type="button" id="competition_select_picture" onClick={() => console.log('enviar')}>Enviar</button>
        <label htmlFor="competition_level">Nível *</label>
        <select id="competition_level" onChange={e => setLevel(e.target.value)}>
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
        <input
          type="date"
          placeholder="Data do início da competição *"
          required
          id="competition_initial_date"
        />
        <input
          type="time"
          placeholder="Horário do início da competição *"
          required
          id="competition_initial_time"
        />
        <input
          type="date"
          placeholder="Data do fim da competição *"
          required
          id="competition_final_date"
        />
        <input
          type="time"
          placeholder="Horário do fim da competição *"
          required
          id="competition_final_time"
        />
        <input
          type="date"
          placeholder="Data do início da inscrição *"
          required
          id="competition_initial_subscription_date"
        />
        <input
          type="date"
          placeholder="Data do fim da inscrição *"
          required
          id="competition_final_subscription_date"
        />
        <input
          type="text"
          placeholder="Premiação *"
          required
          id="competition_awards"
        />
        <input
          type="text"
          placeholder="Regras *"
          required
          id="competition_rules"
        />
        <select id="competition_qty_teams">
          <option value="8">8 equipes</option>
          <option value="16">16 equipes</option>
          <option value="32">32 equipes</option>
        </select>
        <button type="submit" id="btn_create_competition">Criar</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(NewCompetition);
