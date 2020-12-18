import React, { useState } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';
import Header from '../components/Header';
import Title from '../components/Title';

import api from '../services/api';

import * as UserActions from '../store/actions/user';

const EditProfile = ({ user, editUser }) => {
  document.title = 'Battleside - Editar perfil';

  const [selectedRole, setSelectedRole] = useState(user.preferredRole);

  async function saveNewData(e){
    e.preventDefault();

    const name = document.getElementById('edit_name').value;
    const birthdate = document.getElementById('edit_birthdate').value;
    const leagueOfLegendsUsername = document.getElementById('edit_username').value;

    const socialMedia = {
      instagram: document.getElementById('edit_instagram').value,
      facebook: document.getElementById('edit_facebook').value,
      twitter: document.getElementById('edit_twitter').value,
      other: document.getElementById('edit_others').value
    }

    const computerSettings = {
      processador: document.getElementById('edit_cpu').value,
      placaDeVideo: document.getElementById('edit_gpu').value,
      teclado: document.getElementById('edit_keyboard').value,
      mouse: document.getElementById('edit_mouse').value,
      headset: document.getElementById('edit_headset').value
    }

    try {
      api.put(`/api/users/${user.id}`, {
        name,
        birthdate,
        profilePictureURL: "",
        leagueOfLegendsUsername,
        preferredRole: selectedRole,
        computerSettings,
        socialMedia,
        favoriteChampions: []
      })

      editUser(name, user.email, birthdate, user.profilePictureURL, leagueOfLegendsUsername, selectedRole, computerSettings, socialMedia, user.team, user.favoriteChampions, user.id)
      alert('Os dados foram alterados!')

    } catch(err) {
      alert('Ocorreu um erro inesperado!')
    }
  }

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Editar perfil" />

      <form className="edit-profile" onSubmit={e => saveNewData(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="edit_name">Nome *</label>
              <input 
                type="text" 
                required 
                id="edit_name"
                className="form-control"
                defaultValue={user.name}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="edit_username">Username do League of Legends *</label>
              <input 
                type="text"
                required
                id="edit_username"
                className="form-control"
                defaultValue={user.leagueOfLegendsUsername}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="">Email *</label>
            <input 
              type="text"
              disabled 
              defaultValue={user.email}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_role">Role preferida *</label>
            <select id="edit_role" className="form-control" onChange={e => setSelectedRole(e.target.value)} value={selectedRole}>
              <option value="Fill">Fill</option>
              <option value="Top">Top</option>
              <option value="Jungler">Jungler</option>
              <option value="Mid">Mid</option>
              <option value="AD Carry">Ad Carry</option>
              <option value="Support">Support</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_birthdate">Data de nascimento *</label>
            <input 
              type="date" 
              required
              id="edit_birthdate"
              defaultValue={user.birthdate}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="edit_champion_1">Campeão 1 *</label>
            <input 
              type="text" 
              placeholder="Campeão 1 *" 
              required
              id="edit_champion_1"
              // defaultValue={user.champion1}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_champion_2">Campeão 2 *</label>
            <input 
              type="text" 
              placeholder="Campeão 2 *" 
              required
              id="edit_champion_2"
              // defaultValue={user.champion2}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_champion_3">Campeão 3 *</label>
            <input 
              type="text" 
              placeholder="Campeão 3 *" 
              required
              id="edit_champion_3"
              // defaultValue={user.champion3}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_cpu">Processador</label>
            <input 
              type="text" 
              placeholder="CPU" 
              id="edit_cpu"
              defaultValue={user.computerSettings.processador}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_gpu">Placa de Video</label>
            <input 
              type="text" 
              placeholder="GPU" 
              id="edit_gpu"
              defaultValue={user.computerSettings.placaDeVideo}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="edit_keyboard">Teclado</label>{console.log(user)}
            <input 
              type="text" 
              placeholder="Ex.: Razer Blackwidow Chroma" 
              id="edit_keyboard"
              defaultValue={user.computerSettings.teclado}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_mouse">Mouse</label>
            <input 
              type="text" 
              placeholder="Ex.: Razer Deathadder" 
              id="edit_mouse"
              defaultValue={user.computerSettings.mouse}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_headset">Headset</label>
            <input 
              type="text" 
              placeholder="Ex.: Razer Kraken Pro" 
              id="edit_headset"
              defaultValue={user.computerSettings.headset}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_facebook">Facebook</label>
            <input 
              type="text" 
              placeholder="facebook.com/" 
              id="edit_facebook"
              defaultValue={user.socialMedia.facebook}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_instagram">Instagram</label>
            <input 
              type="text" 
              placeholder="instagram.com/" 
              id="edit_instagram"
              defaultValue={user.socialMedia.instagram}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_twitter">Twitter</label>
            <input 
              type="text" 
              placeholder="twitter.com/"  
              id="edit_twitter"
              defaultValue={user.socialMedia.twitter}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_others">Outro link</label>
            <input 
              type="text" 
              placeholder="Outras" 
              id="edit_others"
              defaultValue={user.socialMedia.other}
              className="form-control"
            />
          </div>
        </div>

        <div className="center">
          <button type="submit" id="btn_save" className="btn_save btn-primary">Salvar</button>
        </div>  

        <br/><br/>
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
