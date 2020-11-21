import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

const CompetitionDetails = ({ team }) => {
  const [competition, setCompetition] = useState({});
  let { id } = useParams()

  useEffect(() => {
    api.get(`/api/championships/${id}`)
    .then(response => setCompetition(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function registerCompetition() {
    if(!team.name) {
      alert('Seja de uma equipe para participar dessa competição!')
    }

    api.get()
  }

  return (
    <div className="container">
      <Menu />
      <Header />{console.log(team)}

      {(competition) ? 
        <div>
          <Title content={competition.competition_name} />

          <div>
            <h3>Quantidade de equipes: {competition.competition_qty_teams}</h3>
            <h3>Nível: {competition.competition_level}</h3>
          </div>

          <div>
            <h3>Regras</h3>
            <p>{competition.competition_rules}</p>
          </div>

          <div>
            <h3>Premiação</h3>
            <h4>{competition.competition_awards}</h4>
          </div>

          <button type="button" id="btn_subscription" onClick={registerCompetition}>Se inscrever</button>
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = state => ({
  team: state.team
});

export default connect(mapStateToProps)(CompetitionDetails);
