import React from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function NewTeam() {
  function sendData(e) {
    e.preventDefault();

    const name = document.getElementById('team_name').value;
    const initials = document.getElementById('team_initials').value;
    const image = "";

    api.post('/api/teams', {
      id: initials,
      name,
      initials,
      image,
      members: [],
      competitions: [],
      titles: []
    })
    .then(() => alert('Equipe criada com sucesso!'))
    .catch(() => alert('Ocorreu um erro inesperado!'))
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

        <div className="form-group">
          <label htmlFor="url-img">Logo da equipe</label>
          <input type="file" name="url-img" id="btn_select_image" className="form-control-file" accept="image/png, image/jpeg" />
        </div>
        
        <div className="center">
          <button type="submit" id="btn_create_team" className="default-button">Criar</button>
        </div>
      </form>
    </div>
  );
}
