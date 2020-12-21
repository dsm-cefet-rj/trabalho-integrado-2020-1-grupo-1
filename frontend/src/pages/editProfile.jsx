import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Menu from '../components/Menu';
import Header from '../components/Header';
import Title from '../components/Title';

import api from '../services/api';

import * as UserActions from '../store/actions/user';

/**
 * @module pages/editProfile 
 */

/**
 * @typedef User
 * @type {Object}
 * @property {String} id - Identificador 
 * @property {String} name - Nome 
 * @property {String} leagueOfLegendsUsername - Username do League of Legends 
 * @property {String} email - E-mail
 * @property {String} preferredRole - Role preferida 
 * @property {array} favoriteChampions - Array de campeões preferidos 
 * @property {String} birthdate - Data de aniversário 
 * @property {Object} computerSetting - Configurações do computador 
 * @property {Object} socialMedia - Mídias sociais
 */

/**
 * Componente responsável por renderizar a tela de Editar Perfil
 * @param {object} user - Objeto que contém os dados de User presentes na store do Redux.
 * @param {function} editUser - Função do Redux para alterar o estado global de User na store.
 */
const EditProfile = ({ user, editUser }) => {
  document.title = 'Battleside - Editar perfil';

  const [selectedRole, setSelectedRole] = useState(user.preferredRole);
  const [champions, setChampions] = useState([]);
  const [favoriteChampions, setFavoriteChampions] = useState({
    champion1: '5fdd90f5b71bf4fbaf46ed84',
    champion2: '5fdd90f5b71bf4fbaf46ed84',
    champion3: '5fdd90f5b71bf4fbaf46ed84'
  });

  useEffect(() => {
    api.get(`/api/champions`)
    .then(response => setChampions(response.data))
  }, [])

  useEffect(() => {
    setFavoriteChampions(user.favoriteChampions)
  }, [user])

  /**
   * Função que verifica e salva os novos dados do usuário
   * @param {Object} e - Variável que possui o event salvo.
   */
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
      processor: document.getElementById('edit_cpu').value,
      videoCard: document.getElementById('edit_gpu').value,
      keyboard: document.getElementById('edit_keyboard').value,
      mouse: document.getElementById('edit_mouse').value,
      headset: document.getElementById('edit_headset').value
    }

    let bodyRequest ={
      name,
      birthdate,
      profilePictureURL: "",
      preferredRole: selectedRole,
      computerSettings,
      socialMedia,
      favoriteChampions
    };

    for (let index in socialMedia) {
      if(socialMedia[index].length < 8) 
        return alert('URL de rede social informada inválida!');
      
      if(socialMedia[index].substring(0,8) !== 'https://')
        return alert('URL inválido. Favor inserir o prefixo https://')
    }

    if(user.leagueOfLegendsUsername !== leagueOfLegendsUsername) {
      bodyRequest = {
        ...bodyRequest,
        leagueOfLegendsUsername
      }
    }

    try {
      await api.put(`/api/users/${user.id}`, bodyRequest)

      const splitedDate = birthdate.split('-');
      const convertedDate = splitedDate[2] + '/' + splitedDate[1] + '/' + splitedDate[0];

      editUser(name, user.email, convertedDate, user.profilePictureURL, leagueOfLegendsUsername, selectedRole, computerSettings, socialMedia, user.team, favoriteChampions, user.id);
      alert('Os dados foram alterados!');

    } catch(err) {
      alert('Ocorreu um erro inesperado!');
    }
  }

  /**
   * Função responsável por converter e retornar a data para o formato americano.
   * @param {String} date - Parâmetro que guarda a data no formato original.
   * 
   */
  function convertDate(date) {
    const splitedDate = date.split('/');
    const convertedDate = splitedDate[2] + '-' + splitedDate[1] + '-' + splitedDate[0];

    return convertedDate
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
              defaultValue={convertDate(user.birthdate)}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="edit_champion_1">Campeão 1 *</label>
            <select 
              className="form-control" 
              id="edit_champion_1" 
              onChange={e => setFavoriteChampions({
                ...favoriteChampions,
                champion1: e.target.value
              })} 
              value={favoriteChampions?.champion1}
            >
              {champions?.map(champion => (
                <option value={champion.id} key={champion.id}>{champion.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_champion_2">Campeão 2 *</label>
            <select 
              className="form-control" 
              id="edit_champion_2" 
              onChange={e => setFavoriteChampions({
                ...favoriteChampions,
                champion2: e.target.value
              })} 
              value={favoriteChampions?.champion2}
            >
              {champions?.map(champion => (
                <option value={champion.id} key={champion.id}>{champion.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="edit_champion_3">Campeão 3 *</label>
            <select 
              className="form-control" 
              id="edit_champion_3" 
              onChange={e => setFavoriteChampions({
                ...favoriteChampions,
                champion3: e.target.value
              })} 
              value={favoriteChampions?.champion3}
            >
              {champions?.map(champion => (
                <option value={champion.id} key={champion.id}>{champion.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="edit_cpu">Processador</label>
            <input 
              type="text" 
              placeholder="CPU" 
              id="edit_cpu"
              defaultValue={user.computerSettings.processor}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="edit_gpu">Placa de Video</label>
            <input 
              type="text" 
              placeholder="GPU" 
              id="edit_gpu"
              defaultValue={user.computerSettings.videoCard}
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <label htmlFor="edit_keyboard">Teclado</label>
            <input 
              type="text" 
              placeholder="Ex.: Razer Blackwidow Chroma" 
              id="edit_keyboard"
              defaultValue={user.computerSettings.keyboard}
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
