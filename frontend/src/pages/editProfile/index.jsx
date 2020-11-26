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

    api.put(`/api/users/${user.username}`, {
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
                defaultValue={user.username}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="url-img">Foto de perfil</label>
            <p className="p-select-image">Após selecionar a foto clique em <strong>CARREGAR</strong></p>
            <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
            {/* <button className="btn_load_image" id="btn-load-image" onClick={() => {
              // setStateOfButton()
              // convertToBase64()
                console.log('carregar')
            }}>
              Carregar
            </button> */}
          </div>
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
            <label htmlFor="edit_role">Role *</label>
            <select id="edit_role" className="form-control" onChange={e => setSelectedRole(e.target.value)} defaultValue={user.role}>
              <option value="">Fill</option>
              <option value="">Suporte</option>
              <option value="">AdCarry</option>
              <option value="">Mid Lane</option>
              <option value="">Jungle</option>
              <option value="">Top Lane</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_champion_1">Campeão 1 *</label>
            <input 
              type="text" 
              placeholder="Campeão 1 *" 
              required
              id="edit_champion_1"
              defaultValue={user.champion1}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_champion_2">Campeão 2 *</label>
            <input 
              type="text" 
              placeholder="Campeão 2 *" 
              required
              id="edit_champion_2"
              defaultValue={user.champion2}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_champion_3">Campeão 3 *</label>
            <input 
              type="text" 
              placeholder="Campeão 3 *" 
              required
              id="edit_champion_3"
              defaultValue={user.champion3}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_facebook">Facebook *</label>
            <input 
              type="text" 
              placeholder="facebook.com/" 
              id="edit_facebook"
              defaultValue={user.facebook}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_instagram">Instagram *</label>
            <input 
              type="text" 
              placeholder="instagram.com/" 
              id="edit_instagram"
              defaultValue={user.instagram}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_twitter">Twitter *</label>
            <input 
              type="text" 
              placeholder="twitter.com/"  
              id="edit_twitter"
              defaultValue={user.twitter}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_others">Outro *</label>
            <input 
              type="text" 
              placeholder="Outras" 
              id="edit_others"
              defaultValue={user.other}
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
