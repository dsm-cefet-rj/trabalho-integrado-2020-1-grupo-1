import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function ViewMatch() {
  const [match, setMatch] = useState({});

  let { id, phase, team } = useParams();

  useEffect(() => {
    api.get(`/api/championships-phases?competition_id=${id}`)
    .then(response => setMatch(response.data))
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
    api.post('/api/championships-prints')
  }
  
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Partida" />

      <h3>{match[0]?.competition_name}</h3>
      <span>{match[0]?.phase}</span>
      <div>
        <div>
          {team}
        </div>
        <div>
          {getAdversary()}
        </div>
      </div>

      <h4>Código da partida</h4>
      <h5>{generateCode()}</h5>

      <h6>Print do término da partida</h6>
      <label htmlFor="url-img">Foto de perfil</label>
                    <p>Após selecionar a foto clique em <strong>CARREGAR</strong></p>
                    <input type="file" name="url-img" id="url-img" className="form-control-file" accept="image/png, image/jpeg" />
                    <button className="btn-send-picture" id="btn-load-image" onClick={() => {
                      // setStateOfButton()
                      // convertToBase64()
                      console.log('carregar')
                    }}>
                      Carregar
                    </button>
      <button type="button" id="btn_send_print" onClick={() => console.log('enviar')}>Enviar</button>

      <button type="button" onClick={() => console.log('report')}>Report</button>

    </div>
  );
}
