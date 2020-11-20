import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function CompetitionDetails() {
  const [competition, setCompetition] = useState({});

  useEffect(() => {
    api.get('/competition')
    .then(response => setCompetition(response.data))
    .catch(err => console.log(err.response))
  })

  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Nome da Equipe" />

      <div>
        <h3>Quantidade de equipes: 16</h3>
        <h3>Nível: Livre</h3>
      </div>

      <div>
        <h3>Regras</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>

      <div>
        <h3>Premiação</h3>
        <h4>1500 RP's</h4>
      </div>

      <button type="button" id="btn_subscription" onClick={() => console.log('se inscrever')}>Se inscrever</button>
    </div>
  );
}
