import React, { useState, useEffect } from 'react';

import Title from '../../components/Title';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

import api from '../../services/api';

export default function ViewMatch() {
  const [match, setMatch] = useState({});

  useEffect(() => {
    api.get('/match')
    .then(response => setMatch(response.data))
    .catch(err => console.log(err.response))
  })
  
  return (
    <div className="container">
      <Menu />
      <Header />
      <Title content="Partida" />

      <div>
        <div>
          Equipe 1
        </div>
        <div>
          Equipe 2
        </div>
      </div>

      <h4>Código da partida</h4>
      <h5>AAA123</h5>

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
