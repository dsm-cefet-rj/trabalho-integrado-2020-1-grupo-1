import React from 'react';

import Title from '../../components/Title';
import Menu from '../../components/Menu';
import Header from '../../components/Header';

import api from '../../services/api';

export default function NewCompetition() {
  
  function sendData(e) {
    e.preventDefault();
    const competition_name = document.getElementById('competition_name').value;
    const competition_initials = document.getElementById('competition_initials').value;
    const competition_picture = "";
    const competition_level = document.getElementById('competition_level').value;
    const competition_initial_date = document.getElementById('competition_initial_date').value;
    const competition_final_date = document.getElementById('competition_final_date').value;
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
      competition_qty_teams
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
          required=""
          id="competition_name"
        />
        <input
          type="text"
          placeholder="Sigla *"
          required=""
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
        <select id="competition_level">
          <option value="">Livre</option>
          <option value="">Ferro+</option>
          <option value="">Prata+</option>
          <option value="">Ouro+</option>
          <option value="">Platina+</option>
          <option value="">Diamante+</option>
          <option value="">Mestre+</option>
          <option value="">Grão Mestre+</option>
          <option value="">Challenger</option>
        </select>
        <input
          type="datetime"
          placeholder="Data/horário do início da competição *"
          required="true"
          id="competition_initial_date"
        />
        <input
          type="datetime"
          placeholder="Data/horário do fim da competição *"
          required="true"
          id="competition_final_date"
        />
        <input
          type="datetime"
          placeholder="Data/horário do início da inscrição *"
          required="true"
          id="competition_initial_subscription_date"
        />
        <input
          type="datetime"
          placeholder="Data/horário do fim da inscrição *"
          required="true"
          id="competition_final_subscription_date"
        />
        <input
          type="text"
          placeholder="Premiação *"
          required="true"
          id="competition_awards"
        />
        <input
          type="text"
          placeholder="Regras *"
          required="true"
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
