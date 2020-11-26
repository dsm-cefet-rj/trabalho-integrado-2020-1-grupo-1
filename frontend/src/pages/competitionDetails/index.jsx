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

    api.post('/api/register-championship', {
      id: Math.random(),
      competition_id: id,
      competition_name: competition.competition_name,
      competition_initials: competition.competition_initials,
      team: team.name
    })
    .then(() => {
      alert('Inscrição realizada com sucesso!')
      getPhases()
    })
    .catch(err => console.log(err.response))
  }

  function getPhases() {
    api.get(`/api/championships-phases?competition_id=${id}`)
    .then(response => {
      setPhases(response.data)
      setInTablePhases()
    })
    .catch(err => console.log(err))
  }

  function setInTablePhases() {
    let arrayAux = [];
    
    switch(phases[0].phase) {
      case 'eliminatorias':
        arrayAux = phases[0].phases.eliminatorias
        arrayAux.push(team?.name)
        api.put(`/api/championships-phases/${phases[0].id}`, {
          id: phases[0].id,
          competition_id: id,
          phase: phases[0].phase,
          competition_name: competition.competition_name,
          competition_initials: competition.competition_initials,
          phases: {
            eliminatorias: arrayAux,
            oitavas: [],
            quartas: [],
            semi: [],
            final: []
            }
        })
      case 'oitavas':
        arrayAux = phases[0].phases.oitavas
        arrayAux.unshift(team?.name)
        api.put(`/api/championships-phases/${phases[0].id}`, {
          id: phases[0].id,
          competition_id: id,
          phase: phases[0].phase,
          competition_name: competition.competition_name,
          competition_initials: competition.competition_initials,
          phases: {
            eliminatorias: [],
            oitavas: arrayAux,
            quartas: [],
            semi: [],
            final: []
            }
        })
      case 'quartas':
        arrayAux = phases[0].phases.quartas
        arrayAux.unshift(team?.name)
        api.put(`/api/championships-phases/${phases[0].id}`, {
          id: phases[0].id,
          competition_id: id,
          phase: phases[0].phase,
          competition_name: competition.competition_name,
          competition_initials: competition.competition_initials,
          phases: {
            eliminatorias: [],
            oitavas: [],
            quartas: arrayAux,
            semi: [],
            final: []
            }
        })
      case 'semis':
        arrayAux = phases[0].phases.semis
        arrayAux.unshift(team?.name)
        api.put(`/api/championships-phases/${phases[0].id}`, {
          id: phases[0].id,
          competition_id: id,
          phase: phases[0].phase,
          competition_name: competition.competition_name,
          competition_initials: competition.competition_initials,
          phases: {
            eliminatorias: [],
            oitavas: [],
            quartas: [],
            semi: arrayAux,
            final: []
            }
        })
      case 'final':
        arrayAux = phases[0].phases.final
        arrayAux.unshift(team?.name)
        api.put(`/api/championships-phases/${phases[0].id}`, {
          id: phases[0].id,
          competition_id: id,
          phase: phases[0].phase,
          competition_name: competition.competition_name,
          competition_initials: competition.competition_initials,
          phases: {
            eliminatorias: [],
            oitavas: [],
            quartas: [],
            semi: [],
            final: arrayAux
            }
        })
      default:
        return
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
              <h1 className="title-box-details">{competition.competition_name}</h1>
              <div className="row">
                <div className="col-md-6 justify-left">
                  <h3><strong>Quantidade de equipes:</strong> {competition.competition_qty_teams}</h3>
                  <h3><strong>Nível:</strong> {competition.competition_level}</h3>
                </div>
                <div className="col-md-6">
                  <div className="row rules">
                    <h3><strong>Regras</strong></h3>
                    <p>{competition.competition_rules}</p>
                  </div>
                  <div className="row awards">
                    <h3><strong>Premiação:</strong> {competition.competition_awards}</h3>
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
