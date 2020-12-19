import React from 'react';
import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  padding: 15px;
`

/**
 * @module components/BoxTitle 
 */

/**
 * Componente responsável por renderizar o titulo das box.
 * @param {String} props.content - Conteúdo a ser renderizado pelo componente.
 * 
 */

function BoxTitle(props) {
  return (
    <Title>{props.content}</Title>
  );
}

export default BoxTitle;
