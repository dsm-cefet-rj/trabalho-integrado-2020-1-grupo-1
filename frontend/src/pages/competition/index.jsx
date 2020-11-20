import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function Competition() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    api.get('/competitions')
    .then(response => setCompetitions(response.data))
    .catch(err => console.log(err.response))
  })

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Competições" />

      <div className="competition-filters">
        <select id="btn_filter_level">
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
        <select id="btn_filter_max_teams">
          <option value="8">8 equipes</option>
          <option value="16">16 equipes</option>
          <option value="32">32 equipes</option>
        </select>
        <select id="btn_filter_awards">
          <option value="livre">Livre</option>
          <option value="rp">RP</option>
          <option value="dinheiro">Dinheiro</option>
        </select>
      </div>

      <div classname="competition-list">
        <div className="items-competitions">
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
          <div className="item-competition" id="btn_id_competição">
            
          </div>
        </div>
      </div>
    </div>
  );
}
