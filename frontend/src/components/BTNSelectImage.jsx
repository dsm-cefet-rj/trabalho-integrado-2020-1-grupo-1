import React from 'react';

/**
 * @module components/BTNSelectImage 
 */

/**
 * Componente responsável por renderizar o botão de selecionar imagem.
 * @param {String} props.content - Conteúdo a ser renderizado pelo componente.
 * 
 */
function BTNSelectImage(props) {
  return (
    <button type="button">{props.content}</button>
  );
}

export default BTNSelectImage;
