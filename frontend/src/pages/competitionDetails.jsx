import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';

const CompetitionDetails = ({ team }) => {
  document.title = 'Battleside - Detalhes da competição';

  const [competition, setCompetition] = useState({});
  const [isSubscribed, setIsSubscribed] = useState({});
  const [phases, setPhases] = useState([]);

  let { id } = useParams()

  useEffect(() => {
    api.get(`/api/competitions/${id}`)
    .then(response => setCompetition(response.data))
  }, [])

  async function registerCompetition() {
    if(!team.name) {
      return alert('Seja de uma equipe para participar dessa competição!')
    }

    try {
      await api.post('/api/teamsSubscriptions', {
        competition: id,
        team: team.id
      })
      alert('Inscrição realizada com sucesso!')
    } catch(err) {
      alert('Não foi possivel se inscrever na competição!');
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />

      {(competition) ? 
        <div>
          <Title content="Detalhes da Competição" />{console.log(phases)}
          
          {isSubscribed[0]?.competition_id === parseFloat(id) ? 
            <div className="box-competition-details">
              <div>
                <h3>Eliminatórias</h3>
                {(phases[0]?.phases?.eliminatorias)?.map(team => ((
                  <Link to={'/match/' + id + '/eliminatorias/'+ team} className="card-team">
                    {team}
                  </Link>
                )))}
              </div>

              <div>
                <h3 className="box-competition-details-phase">Oitavas de Final</h3>
                {(phases[0]?.phases?.oitavas)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3 className="box-competition-details-phase">Quartas de Final</h3>
                {(phases[0]?.phases?.quartas)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3 className="box-competition-details-phase">Semifinal</h3>
                {(phases[0]?.phases?.semi)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>

              <div>
                <h3 className="box-competition-details-phase">Final</h3>
                {(phases[0]?.phases?.final)?.map(team => ((
                  <div className="card-team">
                    {team.team}
                  </div>
                )))}
              </div>
            </div>
          : 
            <div className="box-details">
              <h1 className="title-box-details">{competition.name}</h1>
              <div className="row">
                <div className="col-md-6 justify-left">
                  <h3><strong>Quantidade de equipes:</strong> {competition.slots}</h3>
                  <h3><strong>Nível:</strong> {competition.level}</h3>
                </div>
                <div className="col-md-6">
                  <div className="row rules">
                    <h3><strong>Regras</strong></h3>
                    <p>{competition.rules}</p>
                  </div>
                  <div className="row awards">
                    <h3><strong>Premiação:</strong> {competition.award.type + ' - ' + competition.award.amount}</h3>
                  </div>
                </div>                
              </div>
              <div className="row area-button-details">
                <button type="button" id="btn_subscription" className="btn-primary" onClick={registerCompetition}>Se inscrever</button>
              </div>
            </div>
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
