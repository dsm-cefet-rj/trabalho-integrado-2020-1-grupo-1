import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

const CompetitionDetails = ({ team }) => {
  const [competition, setCompetition] = useState({});
  const [isSubscribed, setIsSubscribed] = useState({});
  const [phases, setPhases] = useState([]);

  let { id } = useParams()

  useEffect(() => {
    api.get(`/api/championships/${id}`)
    .then(response => setCompetition(response.data))
    .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    api.get(`/api/register-championship?competition_id=${id}`)
    .then(response => setIsSubscribed(response.data))
    .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    api.get(`/api/championships-phases?competition_id=${id}`)
    .then(response => setPhases(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function registerCompetition() {
    if(!team.name) {
      return alert('Seja de uma equipe para participar dessa competição!')
    }

    // api.get('/api/championships-phases')
  }

  return (
    <div className="container">
      <Menu />
      <Header />

      {(competition) ? 
        <div>
          <Title content={competition.competition_name} />
          
          {isSubscribed[0]?.competition_id === parseFloat(id) ? 
            <React.Fragment>
              <div>
                <h3>Eliminatórias</h3>
                {(phases[0]?.phases?.eliminatorias)?.map(team => ((
                  <Link to={'/match/' + id + '/eliminatorias/'+ team} className="card-team">
                    {team}
                  </Link>
                )))}
              </div>

              <div>
                <h3>Oitavas de Final</h3>
                {(phases[0]?.phases?.oitavas)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3>Quartas de Final</h3>
                {(phases[0]?.phases?.quartas)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3>Semifinal</h3>
                {(phases[0]?.phases?.semi)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3>Final</h3>
                {(phases[0]?.phases?.final)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>
            </React.Fragment>
          : 
            <React.Fragment>
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
            </React.Fragment>
          }          
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = state => ({
  team: state.team
});

export default connect(mapStateToProps)(CompetitionDetails);
