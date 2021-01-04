import { Modal } from 'antd';

/**
 * @module utils/alerts.js
 */

/**
* Função que gera o modal de erro em tela.
* @param {String} title - Título do Modal.
* @param {String} content - Conteúdo do Modal.
*/
export const error = (title, content) => {
  Modal.error({title, content});
}

/**
* Função que gera o modal de sucesso em tela.
* @param {String} title - Título do Modal.
* @param {String} content - Conteúdo do Modal.
*/
export const success = (title, content) => {
  Modal.success({title, content});
}
