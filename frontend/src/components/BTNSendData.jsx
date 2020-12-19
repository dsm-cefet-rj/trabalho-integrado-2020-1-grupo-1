import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  padding: 15px;
  width: 150px;
  
  border-radius: 5px;
  background: white;
  font-size: 10pt;
  color: #000;

  margin-bottom: 10px;

  :hover {
    background: gray;
    transition: .4s;
  }
`

/**
 * @module components/BTNSendData 
 */

/**
 * Componente responsável por renderizar a tela de detalhes da equipe.
 * @param {String} props.type - Tipo do botão.
 * @param {Boolean} props.disabled - Booleano que representa se o botão está ou não desativado.
 * @param {String} props.content - Conteúdo a ser renderizado pelo componente.
 */

function BTNSendData(props) {
  return (
    <Button 
      type={props.type} 
      disabled={props.disabled}
    >
      {props.content}
    </Button>
  );
}

export default BTNSendData;
