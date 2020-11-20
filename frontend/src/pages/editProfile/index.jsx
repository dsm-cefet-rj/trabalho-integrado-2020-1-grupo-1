import React, { useState, useEffect } from 'react';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Title from '../../components/Title';

import api from '../../services/api';

export default function EditProfile() {
  const [userdata, setUserData] = useState({});

  useEffect(() => {
    api.get('/my')
    .then(response => setUserData(response.data))
    .catch(err => console.log(err.response))
  })

  function saveNewData(){
    const name = document.getElementById('edit_name').value;
    const username = document.getElementById('edit_username').value;
    const champion1 = document.getElementById('edit_champion_1').value;
    const champion2 = document.getElementById('edit_champion_2').value;
    const champion3 = document.getElementById('edit_champion_3').value;
    const facebook = document.getElementById('edit_facebook').value;
    const instagram = document.getElementById('edit_instagram').value;
    const twitter = document.getElementById('edit_twitter').value;
    const others = document.getElementById('edit_others').value;

    api.put('/my', {
      name,
      username,
      champion1,
      champion2,
      champion3,
      facebook,
      instagram,
      twitter,
      others
    })
    .then(() => alert('Os dados foram alterados!'))
    .catch(() => alert('Ocorreu um erro inesperado!'))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Editar perfil" />

      <form onSubmit={saveNewData}>
        <input 
          type="text" 
          placeholder="Nome *" 
          required 
          id="edit_name"
        />
        <input 
          type="text" 
          placeholder="Username do League of Legends *" 
          required
          id="edit_username"
        />
        <label htmlFor="url-img">Foto de perfil</label>
                      <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                      <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                      <button className="btn_load_image" id="btn-load-image" onClick={() => {
                        // setStateOfButton()
                        // convertToBase64()
                        console.log('carregar')
                      }}>
                        Carregar
                      </button>
        <button type="button" id="btn_select_image" onClick={() => console.log('enviar')}>Enviar</button>
        <input 
          type="email"
          disabled 
        />
        <select id="edit_role">
          <option value="">Fill</option>
          <option value="">Suporte</option>
          <option value="">AdCarry</option>
          <option value="">Mid Lane</option>
          <option value="">Jungle</option>
          <option value="">Top Lane</option>
        </select>
        <input 
          type="text" 
          placeholder="Campeão 1 *" 
          required
          id="edit_champion_1"
        />
        <input 
          type="text" 
          placeholder="Campeão 2 *" 
          required
          id="edit_champion_2"
        />
        <input 
          type="text" 
          placeholder="Campeão 3 *" 
          required
          id="edit_champion_3"
        />
        <input 
          type="text" 
          placeholder="facebook.com/" 
          id="edit_facebook"
        />
        <input 
          type="text" 
          placeholder="instagram.com/" 
          id="edit_instagram"
        />
        <input 
          type="text" 
          placeholder="twitter.com/"  
          id="edit_twitter"
        />
        <input 
          type="text" 
          placeholder="Outras" 
          id="edit_others"
        />
        <button type="submit" id="btn_save">Salvar</button>
      </form>
    </div>
  );
}
