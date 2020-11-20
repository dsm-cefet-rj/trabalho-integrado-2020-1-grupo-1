import React from 'react';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import BoxTitle from '../../components/BoxTitle';

import { 
  Roles,
  BoxTeamName,
  BoxContent,
  BoxSince
} from './styles';

export default function Index() {
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
                <div className="col-md-6">
                  Top laner
                </div>
                <div className="col-md-6">
                  Mid laner
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
              <BoxTeamName>Nome da equipe</BoxTeamName>
              <BoxSince>Desde 2017</BoxSince>
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
