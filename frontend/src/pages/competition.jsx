import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';

/**
 * @module pages/competition 
 */

/**
 * @typedef Competition
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome
 * @property {String} initials - Iniciais
 * @property {String} level - Nível 
 * @property {Object} award - Premiação (tipo e valor)
 */

/**
 * Componente funcional responsável por renderizar a tela de Competição.
 * 
 */

export default function Competition() {
  document.title = "Battleside - Competição";

  const [competitions, setCompetitions] = useState([]);
  const [levelFilter, setLevelFilter] = useState('');
  const [awards, setAwards] = useState('');

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    api.get('/api/competitions')
    .then(response => setCompetitions(response.data))
  }, [])

  useEffect(() => {
    setFiltered(competitions.filter(({ level, award }) => {
      return level === levelFilter && award.type === awards; 
    }));
  }, [levelFilter, awards])

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Competições" />

      <h4 className="white">Use os filtros!</h4>
      <div className="competition-filters">
        <select id="btn_filter_level" onChange={e => {
          setLevelFilter(e.target.value)
        }} defaultValue={levelFilter}>
          <option value="">Nível</option>
          <option value="Free">Livre</option>
          <option value="Silver">Prata</option>
          <option value="Gold">Ouro</option>
          <option value="Platinum">Platina</option>
          <option value="Diamond">Diamante</option>
          <option value="Master">Mestre</option>
          <option value="Grandmaster">Grão Mestre</option>
          <option value="Challenger">Challenger</option>
        </select>
        
        <select id="btn_filter_awards" onChange={e => {
          setAwards(e.target.value)
        }} defaultValue={awards}>
          <option value="">Premiação</option>
          <option value="None">Nenhum</option>
          <option value="RP">RP</option>
          <option value="Money">Dinheiro</option>
        </select>
      </div>

      <div className="competition-list">
        <div className="items-competitions">
          {
            filtered?.map(competition => (
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
            ))
          } 
        </div>
      </div>

      <br /><br />
    </div>
  );
}
