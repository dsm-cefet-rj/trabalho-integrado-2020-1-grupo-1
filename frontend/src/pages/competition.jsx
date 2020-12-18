import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';

export default function Competition() {
  document.title = "Battleside - Competição";

  const [competitions, setCompetitions] = useState([]);
  const [level, setLevel] = useState('');
  const [maxTeams, setMaxTeams] = useState('');
  const [awards, setAwards] = useState('');

  useEffect(() => {
    api.get('/api/competitions')
    .then(response => setCompetitions(response.data))
  }, [])

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Competições" />

      <div className="competition-filters">
        <select id="btn_filter_level" onChange={e => setLevel(e.target.value)}>
          <option value="livre">Livre</option>
          <option value="ferro">Ferro</option>
          <option value="bronze">Bronze</option>
          <option value="prata">Prata</option>
          <option value="ouro">Ouro</option>
          <option value="platina">Platina</option>
          <option value="diamante">Diamante</option>
          <option value="mestre">Mestre</option>
          <option value="grao-mestre">Grão-Mestre</option>
          <option value="desafiante">Desafiante</option>
        </select>

        <select id="btn_filter_max_teams" onChange={e => setMaxTeams(e.target.value)}>
          <option value="8">8 equipes</option>
          <option value="16">16 equipes</option>
          <option value="32">32 equipes</option>
        </select>
        
        <select id="btn_filter_awards" onChange={e => setAwards(e.target.value)}>
          <option value="livre">Livre</option>
          <option value="rp">RP</option>
          <option value="dinheiro">Dinheiro</option>
        </select>
      </div>

      <div className="competition-list">
        <div className="items-competitions">
          {competitions?.map(competition => (
            <Link to={`/viewcompetition/${competition.id}`} key={competition.id}>
              <div className="item-competition row" id="btn_id_competição">
                <div className="col-md-2 box-image">
                  {/* <img src={competition.competition_picture} className="items-competitions-image" alt={competition.competition_name} /> */}
                </div>
                <div className="col-md-10">
                  <h3 className="items-competitions-name">{competition.name + ' - ' + competition.initials}</h3>
                  <p className="items-competitions-level">Nível: {competition.level}</p>
                  <p className="items-competitions-awards">Premiação: {competition.award.type + ' - ' + competition.award.amount}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
