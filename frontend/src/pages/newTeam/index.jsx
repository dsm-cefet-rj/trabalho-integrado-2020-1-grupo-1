import React from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function NewTeam() {
  function sendData() {
    const team_name = document.getElementById('team_name').value;
    const team_initials = document.getElementById('team_initials').value;
    const image = document.getElementById('btn_select_image').value;

    api.post('/team', {
      team_name,
      team_initials,
      image
    })
    .then(() => alert('Equipe criada com sucesso!'))
    .catch(() => alert('Ocorreu um erro inesperado!'))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      
      <Title content="Nova equipe" />

      <form onSubmit={sendData}>
        <input 
          type="text" 
          placeholder="Nome da equipe *" 
          required={true} 
          id="team_name"
        />

        <input 
          type="text" 
          placeholder="Sigla da equipe *" 
          required={true} 
          id="team_initials"
        />

        <span>Faça upload da sua logo</span>
        <label htmlFor="url-img">Foto de perfil</label>
                      <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                      <input type="file" name="url-img" id="btn_select_image" className="form-control-file" accept="image/png, image/jpeg" />
                      <button className="btn-send-picture" id="btn-load-image" onClick={() => {
                        // setStateOfButton()
                        // convertToBase64()
                        console.log('carregar')
                      }}>
                        Carregar
                      </button>

        <p>Você será automáticamente alocado como administrador da equipe</p>

        <button type="submit" id="btn_create_team">Criar</button>
      </form>
    </div>
  );
}
