import React from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BoxTitle from '../../components/BoxTitle';

import * as teamActions from '../../store/actions/team';

import { 
  Roles,
  BoxTeamName,
  BoxContent,
  BoxSince
} from './styles';
import { useEffect } from 'react';

const Index = ({ user, team, teamData }) => {
  useEffect(() => { 
    api.get(`/api/userteam/${user?.username}`)
    .then(response => teamData(response.data.name, response.data.image, response.data.initials, response.data.entryYear))
    .catch(error => console.log(error.response))
  }, [])

  return (
    <div className="container">     
      <Menu />
      <Header />

      <div className="row">
        <div className="col-md-6">
          <div className="box about-me">
            <BoxTitle content="Sobre mim" />              
            <Roles>
              <div className="row">
                <div className="col-md-6 name-role">
                  <strong>Nome:</strong> {(user?.name).split(' ')[0]}
                </div>

                <div className="col-md-6 name-role">
                  <strong>Role: </strong> {(user?.role)}
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 social-media-link">
                  <a href={user?.facebook}>Facebook</a>
                </div>

                <div className="col-md-3 social-media-link">
                  <a href={user?.instagram}>Instagram</a>
                </div>

                <div className="col-md-3 social-media-link">
                  <a href={user?.twitter}>Twitter</a>
                </div>

                <div className="col-md-3 social-media-link">
                  <a href={user?.other}>Outro</a>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 card-champion-area">
                  <div className="card-champion-item">
                    {user?.champion1}
                  </div>
                </div>

                <div className="col-md-4 card-champion-area">
                  <div className="card-champion-item">
                    {user?.champion2}
                  </div>
                </div>

                <div className="col-md-4 card-champion-area">
                  <div className="card-champion-item">
                    {user?.champion3}
                  </div>
                </div>
              </div>
            </Roles>
          </div>
        </div>
        <div className="col-md-6">
          <div className="box">
            <BoxTitle content="Sua equipe" />   
            <BoxContent>
              <div className="image" />
              <BoxTeamName>{team?.name}</BoxTeamName>
              <BoxSince>Desde {team?.entryYear}</BoxSince>
            </BoxContent>                      
          </div>
        </div>
        <div className="col-md-12">
          <div className="box">
            <BoxTitle content="Títulos" />   
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
  teamData: (name, initials, entryYear) => dispatch(teamActions.teamData(name, initials, entryYear))
});

export default connect(mapStateToProps,mapDispatchToProps)(Index);
