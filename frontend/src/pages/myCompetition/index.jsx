import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function MyCompetition() {
  const [competition, setCompetition] = useState({});

  useEffect(() => {
    api.get('/championships-prints/?user_manage=Entonin')
    .then(response => setCompetition(response.data))
    .catch(err => console.log(err.response))
  }, [])

  return (
    <div className="container">
      <Menu />
      <Header />

      <Title content="Sua competição" />

      {(competition) ? 
        <div>
          <h1>{competition.name}</h1>
          <div className="box-your-competition">
            <h4>Prints recebidos</h4>
            <div className="list-matchs">
              {(competition.prints).map(print => (
                <div className="match">
                  <div className="icon-team">
                    <img src={print.image_team1} alt={print.team1} />
                  </div>
                  {print.team1}
                  X
                  {print.team2}
                  <div className="icon-team">
                    <img src={print.image_team2} alt={print.team2} />
                  </div>
                  <button type="button" id="" onClick={() => console.log('vencedor 1')}>Vencedor</button>
                  <button type="button" id="" onClick={() => console.log('vencedor 2')}>Vencedor</button>
                  <button type="button" id="" onClick={() => console.log('ver print')}>Ver print</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4>Ações do administrador</h4>
            <button type="button" id="my_comp_pause" onClick={() => console.log('pause')}>Pausar competição</button>
            <button type="button" id="my_comp_send_message" onClick={() => console.log('send message')}>Enviar mensagem</button>
            <button type="button" id="btn_edit_datehour" onClick={() => console.log('edit date')}>Editar data e horário</button>
            <button type="button" id="btn_delete_comp" onClick={() => console.log('delete competition')}>Deletar competição</button>
          </div>
        </div>
      : ''}
    </div>
  );
}
