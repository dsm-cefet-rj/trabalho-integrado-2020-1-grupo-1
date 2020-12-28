import axios from 'axios';

/**
 * @module services/api.js 
 */

/**
 * Função responsável por criar a instância da API com o método do Axios create().
 * 
 */
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export default api;
