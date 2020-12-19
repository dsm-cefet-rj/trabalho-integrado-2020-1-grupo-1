import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';

/**
 * @module pages/viewMatch 
 */

/**
 * Componente responsável por renderizar a tela de partida.
 * 
 */
function ViewMatch() {
  document.title = 'Battleside - Ver partida';

  const [match, setMatch] = useState({});
  const [matchData, setMatchData] = useState({});

  let { id } = useParams();

  useEffect(() => {
    api.get(`/api/teamsMatches?match=${id}`)
    .then(response => setMatch(response.data))
  }, [])

  useEffect(() => {
    api.get(`/api/matches/${id}`)
    .then(response => setMatchData(response.data))
  }, [])

  /**
   * Função responsável por enviar o print da partida.
   * 
   */
  async function sendPrint() {
    try {
      await api.put(`/api/teamsMatches/${id}`, {
        printURL: ""
      })
      alert('Print enviado com sucesso!')

    } catch(err) {
      alert('Não foi possível enviar o print!');
    }
  }
  
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Partida" />

      <div className="box-no-height">
        <h3 className="box-match-name">{matchData?.name}</h3>
        <p className="box-match-phase"></p>
        <div>
          <div>
            <h1>{match[0]?.name} X {match[1]?.name}</h1>
          </div>  
        </div>

        <h5>Código da partida</h5>
        <h6>ABC123</h6>

        <label htmlFor="url-img" className="label-match">Print do término da partida</label>
        <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />

        <button type="button" id="btn_send_print" className="btn-primary space-top-20" onClick={() => sendPrint()}>Enviar</button>
      </div>
    </div>
  );
}

export default ViewMatch;
