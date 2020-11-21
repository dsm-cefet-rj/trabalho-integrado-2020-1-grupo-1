import React from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function ViewTeam() {
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Nome da Equipe" />

      <div className="area-logo center">
        <div className="logo-team">

        </div>
        <button type="button" id="btn_add_member" className="button-add-delete">+</button>
        <button type="button" id="btn_delete_team" className="button-add-delete">x</button>
      </div>

      <h4 className="center">Membros</h4>
      <div className="list-members">
        <div className="member-icon" alt="Member" id="btn_USERNAME_USUARIO">

        </div>
        <div className="member-icon" alt="Member">

        </div>
        <div className="member-icon" alt="Member">

        </div>
        <div className="member-icon" alt="Member">

        </div>
      </div>

      <div className="box">
        <h4>Histórico de competições</h4>
        <div className="list-competitions">
          <div className="competition">

          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
          <div className="competition">
            
          </div>
        </div>
      </div>

      <div className="box">
        <h4>Títulos</h4>
        <div className="list-titles">
          <div className="title">

          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
          <div className="title">
            
          </div>
        </div>
      </div>

      <div className="modal-box">
        <h4>Adicionar jogador</h4>
        <input type="text" id="input_username" placeholder="Username" />
        <button id="btn_invite" onClick={() => console.log('convidar')}>Convidar</button>
      </div>
    </div>
  );
}
