import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

import {
  TeamName, 
  Since
} from './styles';

export default function Team() {
  const [team, setTeam] = useState({});

  useEffect(() => {
    api.get('/team')
    .then(response => setTeam(response.data))
    .catch(err => console.log(err.response))
  })
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Equipe" />

      <div className="center">
        <div className="image2"></div>
        <TeamName>Nome da equipe</TeamName>
        <Since>Desde 2017</Since>

        <Link to="/viewteam" id="btn_viewTeam">Visualizar equipe</Link>
        <button type="button" id="btn_leave" onClick={() => console.log('Leave team')}>Sair da equipe</button>
      </div>    

      {/* <div className="center">
        <div className="list-invites">
          <div className="list">
            <div className="invite">
              <h2>Nome equipe</h2>
              <span>Sigla equipe</span>
              <div className="invite-buttons">
                <button type="button" id="btn_accept">Yes</button>
                <button type="button" id="btn_reject">No</button>
              </div>
            </div>

          </div>
        </div>

        <Link to="/newteam" id="btn_create_team">Criar nova equipe</Link>
      </div> */}

      <div className="modal-box">
        <h4>Deseja realmente sair?</h4>
        <button id="btn_confirm_leave" onClick={() => console.log('sim')}>Sim</button>
        <button id="btn_cancel_leave" onClick={() => console.log('nao')}>Não</button>
      </div>
    </div>
  );
}
