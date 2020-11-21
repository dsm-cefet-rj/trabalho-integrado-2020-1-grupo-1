import React, { useState } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Title from '../../components/Title';

import api from '../../services/api';

import * as UserActions from '../../store/actions/user';

const EditProfile = ({ user, editUser }) => {
  const [selectedRole, setSelectedRole] = useState('');

  function saveNewData(e){
    e.preventDefault();

    const name = document.getElementById('edit_name').value;
    const username = document.getElementById('edit_username').value;
    const champion1 = document.getElementById('edit_champion_1').value;
    const champion2 = document.getElementById('edit_champion_2').value;
    const champion3 = document.getElementById('edit_champion_3').value;
    const facebook = document.getElementById('edit_facebook').value;
    const instagram = document.getElementById('edit_instagram').value;
    const twitter = document.getElementById('edit_twitter').value;
    const other = document.getElementById('edit_others').value;

    api.put('/api/users/Entonin', {
      name,
      username,
      role:selectedRole,
      champion1,
      champion2,
      champion3,
      facebook,
      instagram,
      twitter,
      others:other,
      email:user.email
    })
    .then(() => {
      editUser(name, username, user.profile_picture, selectedRole, champion1, champion2, champion3, facebook, instagram, twitter, other, user.email)
      alert('Os dados foram alterados!')
    })
    .catch(() => alert('Ocorreu um erro inesperado!'))
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Editar perfil" />

      <form onSubmit={e => saveNewData(e)}>
        <input 
          type="text" 
          placeholder="Nome *" 
          required 
          id="edit_name"
          defaultValue={user.name}
        />
        <input 
          type="text" 
          placeholder="Username do League of Legends *" 
          required
          id="edit_username"
          defaultValue={user.username}
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
          type="text"
          disabled 
          defaultValue={user.email}
        />
        <select id="edit_role" onChange={e => setSelectedRole(e.target.value)} defaultValue={user.role}>
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
          defaultValue={user.champion1}
        />
        <input 
          type="text" 
          placeholder="Campeão 2 *" 
          required
          id="edit_champion_2"
          defaultValue={user.champion2}
        />
        <input 
          type="text" 
          placeholder="Campeão 3 *" 
          required
          id="edit_champion_3"
          defaultValue={user.champion3}
        />
        <input 
          type="text" 
          placeholder="facebook.com/" 
          id="edit_facebook"
          defaultValue={user.facebook}
        />
        <input 
          type="text" 
          placeholder="instagram.com/" 
          id="edit_instagram"
          defaultValue={user.instagram}
        />
        <input 
          type="text" 
          placeholder="twitter.com/"  
          id="edit_twitter"
          defaultValue={user.twitter}
        />
        <input 
          type="text" 
          placeholder="Outras" 
          id="edit_others"
          defaultValue={user.other}
        />
        <button type="submit" id="btn_save">Salvar</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  editUser: (name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email) => dispatch(UserActions.editUser(name, username, profile_picture, role, champion1, champion2, champion3, facebook, instagram, twitter, other, email))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
