import React from 'react';
import styled from 'styled-components';

import foto from '../images/foto.png';

export const Banner = styled.div`
  height: 150px;
  width: 100%;
  background: #222;

  display: flex;
  justify-content: center;  

  margin-bottom: 50px;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const ProfilePicture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  border: 5px solid #E5E5E5;
  margin-top: 30px;
`

/**
 * @module components/Header 
 */

/**
 * Componente responsável por renderizar o cabeçalho padrão de todas as telas.
 * 
 */
function Header() {
  return (
    <Banner>
      <ProfilePicture src={foto} alt="Foto perfil" />
    </Banner>
  );
}

export default Header;
