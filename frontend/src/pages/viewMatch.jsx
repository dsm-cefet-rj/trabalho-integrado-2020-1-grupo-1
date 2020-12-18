import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Title from '../components/Title';
import Header from '../components/Header';
import Menu from '../components/Menu';

import api from '../services/api';

export default function ViewMatch() {
  document.title = 'Battleside - Ver partida';

  const [match, setMatch] = useState({});
  const [prints, setPrints] = useState({});

  let { id, phase, team } = useParams();

  useEffect(() => {
    api.get(`/api/championships-phases?competition_id=${id}`)
    .then(response => setMatch(response.data))
    .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    api.get(`/api/championships-prints/${id}`)
    .then(response => setPrints(response.data))
    .catch(err => console.log(err.response))
  }, [])

  function getAdversary() {
    switch(phase){
      case 'eliminatorias':
        for(let i = 0; i < (match[0]?.phases?.eliminatorias)?.length; i++) {
          if(team === match[0]?.phases?.eliminatorias[i]) {
            if(i % 2 === 1) {
              return match[0]?.phases?.eliminatorias[i-1];
            } else {
              return match[0]?.phases?.eliminatorias[i+1];
            }
          }
        }
      default:
        return '';
    }
  }

  function generateCode() {
    return Math.floor(Math.random() * 1000000);
  }

  function sendPrint() {
    let aux = prints.prints;

    aux.push({
      id: Math.random(),
      team1: team,
      team2: getAdversary(),
      image_team1: "https://i.pinimg.com/originals/e7/c8/32/e7c832e0b3b3d2e2d1e6a1286cd0e54b.png",
      image_team2: "https://i.pinimg.com/originals/e7/c8/32/e7c832e0b3b3d2e2d1e6a1286cd0e54b.png",
      url_print: "https://sm.ign.com/ign_br/screenshot/default/link_t3cf.png"
    })

    api.put(`/api/championships-prints/${id}`, {
      id: id,
      id_partida: prints.id_partida,
      competition_name: prints.competition_name,
      competition_initials: prints.competition_initials,
      user_manage: prints.user_manage,
      prints: aux
    })
    .then(() => alert('Print enviado com sucesso!'))
    .catch(err => console.log(err))
  }
  
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Partida" />

      <div className="box-no-height">
        <h3 className="box-match-name">{match[0]?.competition_name}</h3>
        <p className="box-match-phase">{(match[0]?.phase)}</p>
        <div>
          <div>
            <h1>{team} X {getAdversary()}</h1>
          </div>  
        </div>

        <h5>Código da partida</h5>
        <h6>{generateCode()}</h6>

        <label htmlFor="url-img" className="label-match">Print do término da partida</label>
        <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />

        <button type="button" id="btn_send_print" className="btn-primary space-top-20" onClick={() => sendPrint()}>Enviar</button>
      </div>

      {/* <button type="button" onClick={() => console.log('report')}>Report</button> */}
    </div>
  );
}
