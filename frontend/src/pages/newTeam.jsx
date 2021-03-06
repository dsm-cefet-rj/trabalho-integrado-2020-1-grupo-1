import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Title from '../components/Title';
import Menu from '../components/Menu';

import api from '../services/api';
import { getAccessToken } from '../utils/getAccessToken';
import { error, success } from '../utils/alerts';

import * as teamActions from '../store/actions/team';

/**
 * @module pages/NewTeam 
 */

 /**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 */

/**
 * Componente funcional responsável por renderizar a tela de cadastro de uma nova equipe.
 * @param {Object} user - Objeto que possui os dados do usuário que estão salvos na store do Redux.
 * @param {Function} setTeamAtStore - Função que altera a equipe na store.
 * 
 */
function NewTeam({ user, updateTeamAtStore }) {
  document.title = 'Battleside - Criar nova equipe';
  const accessToken = getAccessToken();

  /**
   * Função assincrona responsável por enviar ao backend os dados da nova equipe através de uma requisição.
   * @param {Object} e - Objeto que possui os dados do event que foi lançado na chamada da função.
   */
  async function sendData(e) {
    e.preventDefault();

    const name = document.getElementById('team_name').value;
    const initials = document.getElementById('team_initials').value;
    const logoPictureURL = "";

    try {
      await api.post('/api/teams', {
        name,
        initials,
        logoPictureURL,
        administrator: user.id
      }, { headers: { Authorization: accessToken }})
      updateTeamAtStore(name, initials, logoPictureURL, user.id);
      success('Equipe criada com sucesso!', '');
      window.location.href = '/team';
      
    } catch(err) {
      if(err.response.status === 422) {
        error('Ocorreu um erro inesperado!', err.response.data?.errors[0]);
      } else {
        error('Ocorreu um erro inesperado!', 'Por favor, tente novamente mais tarde!');
      }
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      
      <Title content="Nova equipe" />

      <form onSubmit={e => sendData(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="team_name">Nome da equipe *</label>
              <input 
                type="text"
                className="form-control"
                id="team_name"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="team_initials">Sigla da equipe *</label>
              <input 
                type="text" 
                className="form-control"
                id="team_initials"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="center">
          <button type="submit" id="btn_create_team" className="default-button">Criar</button>
        </div>
      </form>
    </div>
  );
}

/**
* Função que pega os dados do usuário na Store.
* @param {Object} state - Objeto que contém o estado global da aplicação
*/
const mapStateToProps = state => ({
  user: state.user,
  team: state.team
});

/**
* Função que altera os dados da equipe na Store.
* @param {Function} dispatch - Função que realiza o disparo da action para alterar a Store.
*/
const mapDispatchToProps = dispatch => ({
  updateTeamAtStore: (name, initials, logoPictureURL, id) => dispatch(teamActions.signinTeam(name, initials, logoPictureURL, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
