import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function Competition() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    api.get('/api/championships')
    .then(response => setCompetitions(response.data))
    .catch(err => console.log(err.response))
  }, [])

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Competições" />

      <div className="competition-list">
        <div className="items-competitions">
          {competitions?.map(competition => (
            <Link to={`/viewcompetition/${competition.id}`} key={competition.id}>
              <div className="item-competition row" id="btn_id_competição">
                <div className="col-md-2 box-image">
                  <img src={competition.competition_picture} className="items-competitions-image" alt={competition.competition_name} />
                </div>
                <div className="col-md-10">
                  <h3 className="items-competitions-name">{competition.competition_name}</h3>
                  <p className="items-competitions-level">Nível: {competition.competition_level}</p>
                  <p className="items-competitions-awards">Premiação: {competition.competition_awards}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
