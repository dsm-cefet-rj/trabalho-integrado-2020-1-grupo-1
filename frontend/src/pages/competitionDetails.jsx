import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { error, success } from '../utils/alerts';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';

/**
 * @module pages/competitionDetails 
 */

/**
 * @typedef Competition
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome
 * @property {String} initials - Iniciais
 * @property {String} level - Nível 
 * @property {String} slots - Quantidade de equipes
 * @property {String} rules - Regras
 * @property {Object} award - Premiação (tipo e valor)
 */

/**
 * Componente responsável por renderizar a tela de detalhes da competição.
 * @param {object} team - Objeto que possui os dados de Team presentes na store do redux.
 */
const CompetitionDetails = ({ team, user }) => {
  document.title = 'Battleside - Detalhes da competição';
  const accessToken = getAccessToken();

  const [competition, setCompetition] = useState({});
  const [isSubscribed, setIsSubscribed] = useState({});
  const [matches, setMatches] = useState([]);

  let { id } = useParams()

  useEffect(() => {
    api.get(`/api/teamsSubscriptions?competition=${id}&team=${team.id}`, { headers: { Authorization: accessToken }})
    .then(response => setIsSubscribed(response.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.get(`/api/competitions/${id}`, { headers: { Authorization: accessToken }})
    .then(response => setCompetition(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/matches?competition=${id}`, { headers: { Authorization: accessToken }})
    .then(response => setMatches(response.data))
  }, [])

  /**
   * Função responsável por enviar ao backend os dados necessários para se inscrever em uma competição.
   * 
   */
  async function registerCompetition() {
    if(!team.name) {
      return error('Ocorreu um erro inesperado!','Seja de uma equipe para participar dessa competição!');
    }

    try {
      await api.post('/api/usersSubscriptions', {
        id: user.id,
        team: team.id,
        competition: id,
        role: user.preferredRole,
      });
      
      await api.post('/api/teamsSubscriptions', {
        competition: id,
        team: team.id
      });

      success('Inscrição realizada com sucesso!', 'Boa sorte!');
      window.location.href = `/viewcompetition/${id}`;

    } catch(err) {
      error('Ocorreu um erro inesperado!','Não foi possivel se inscrever na competição!');
    }
  }

  /**
   * Função responsável por enviar ao backend a solicitação para pegar as equipes que estão na partida do ID informado.
   * @param {String} matchID - ID da partida
   * 
   */
  async function getTeams(matchID) {
    try {
      const response = await api.get(`/api/teamsMatches?match=${matchID}`);
      return (
        <div className="box-competition-details-match">
          <h3>{response.data[0]?.name} X {response.data[1]?.name}</h3>
        </div>
      )
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />

      {(competition) ? 
        <div>
          <Title content="Detalhes da Competição" />
  
          {(isSubscribed.length !== 0) ? 
            <div className="box-competition-details">
              {matches?.map(match => (
                <Link to={`/match/${match.id}`}>
                  id
                  sucessor
                  winnerTeam
                  {getTeams(match.id)}
                </Link>
              ))}
              <div className="box-competition-details-match">
                
              </div>
              <br /><br />  
            </div>
          : 
            <div className="box-details">
              <h1 className="title-box-details">{competition?.name}</h1>
              <div className="row">
                <div className="col-md-6 justify-left">
                  <h3><strong>Quantidade de equipes:</strong> {competition?.slots}</h3>
                  <h3><strong>Nível:</strong> {competition?.level}</h3>
                </div>
                <div className="col-md-6">
                  <div className="row rules">
                    <h3><strong>Regras</strong></h3>
                    <p>{competition?.competitionRules}</p>
                  </div>
                  <div className="row awards">
                    <h3><strong>Premiação:</strong> {competition?.award?.type + ' - ' + competition?.award?.amount}</h3>
                  </div>
                </div>                
              </div>
              <div className="row area-button-details">
                <button type="button" id="btn_subscription" className="btn-primary" onClick={registerCompetition}>Se inscrever</button>
              </div>
            </div>
          }   
          <br /><br />       
        </div>
      : ''}
    </div>
  );
}

const mapStateToProps = state => ({
  team: state.team,
  user: state.user
});

export default connect(mapStateToProps)(CompetitionDetails);
