import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BoxTitle from '../../components/BoxTitle';

import * as teamActions from '../../store/actions/team';

import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import twitter from './images/twitter.png';
import other from './images/link.png';

import { 
  Roles,
  BoxTeamName,
  BoxContent,
  BoxSince
} from './styles';

const Index = ({ user, team, teamData }) => {
  const [titles, setTitles] = useState([]);

  useEffect(() => { 
    api.get(`/api/userteam/${user?.username}`)
    .then(response => teamData(response.data.name, response.data.initials, response.data.entryYear, response.data.image))
    .catch(error => console.log(error.response))
  }, [])

  useEffect(() => { 
    api.get(`/api/user-titles?id_user=${user?.username}`)
    .then(response => setTitles(response.data[0].titles))
    .catch(error => console.log(error.response))
  }, [])

  return (
    <div className="container">     
      <Menu />
      <Header />

      <div className="row">
        <div className="col-md-4">
          <div className="box">
            <BoxTitle content="Sobre mim" />              
            <div className="about-me">
              <p><strong>Nome:</strong> {(user?.name).split(' ')[0]}</p>
              <p><strong>Role: </strong> {(user?.role)}</p>              
              <a href={user?.facebook} target="_blank"><img src={facebook} className="icon-social-media" alt="facebook" /></a>                
              <a href={user?.instagram} target="_blank"><img src={instagram} className="icon-social-media" alt="instagram" /></a>            
              <a href={user?.twitter} target="_blank"><img src={twitter} className="icon-social-media" alt="twitter" /></a>                
              <a href={user?.other} target="_blank"><img src={other} className="icon-social-media" alt="outro" /></a>      

              <h5>Campeões favoritos</h5>
              <p><strong>1° -</strong> {user?.champion1}</p>
              <p><strong>2° -</strong> {user?.champion2}</p>
              <p><strong>3° -</strong> {user?.champion3}</p>                          
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <BoxTitle content="Sua equipe" />   
            <BoxContent>
              <img className="image" src={team?.image} />
              <BoxTeamName>{team?.name}</BoxTeamName>
              <BoxSince>Desde {team?.entryYear}</BoxSince>
            </BoxContent>                      
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <BoxTitle content="Títulos" />   
            <div className="box-titles">
              {titles?.map(title => (
                <div className="card-title" key={title.id}>
                  <h3>{title.comp_name}</h3>
                  <p>{title.position}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  team: state.team,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  teamData: (name, initials, entryYear, image) => dispatch(teamActions.teamData(name, initials, entryYear, image))
});

export default connect(mapStateToProps,mapDispatchToProps)(Index);
