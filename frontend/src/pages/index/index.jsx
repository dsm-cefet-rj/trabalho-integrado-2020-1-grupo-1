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
          <div className="box">
            <BoxTitle content="Sobre mim" />              
            <Roles>
              <div className="row">
                {user?.name}
                {user?.role}
                <a href={user?.facebook}>Facebook</a>
                <a href={user?.instagram}>Instagram</a>
                <a href={user?.twitter}>Twitter</a>
                <a href={user?.other}>Outro</a>
                {user?.champion1}
                {user?.champion2}
                {user?.champion3}
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
