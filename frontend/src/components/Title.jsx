import React from 'react';
import styled from 'styled-components';

export const Text = styled.h1`
  color: #FFF;
  font-size: 25pt;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin-bottom: 50px;
`

/**
 * @module components/Title 
 */

/**
 * Componente responsável por renderizar os títulos das páginas.
 * @param {String} props.content - Conteúdo à ser renderizado.
 * 
 */
const Title = props => (
  <Text>{props.content}</Text>
);

export default Title;
