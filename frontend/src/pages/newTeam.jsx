import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Title from '../components/Title';
import Menu from '../components/Menu';

import api from '../services/api';

function NewTeam({ user }) {
  document.title = 'Battleside - Criar nova equipe';
  
  async function sendData(e) {
    e.preventDefault();

    try {
      await api.post('/api/teams', {
        name: document.getElementById('team_name').value,
        initials: document.getElementById('team_initials').value,
        logoPictureURL: "",
        administrator: user.id
      })
      alert('Equipe criada com sucesso!')
    } catch(err) {
      alert('Ocorreu um erro inesperado!')
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NewTeam);
