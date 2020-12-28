import { createStore } from 'redux';

import rootReducers from './reducers';

/**
 * @module store/index.js 
 */

/**
 * Função responsável por salvar na local storage a store da Redux e dessa forma, persistir os dados entre os componentes.
 * @param {Object} name: State que será salvo na Local Storage
 *
 */
function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

/**
 * Função responsável por carregar da local storage a store da Redux.
 *
 */
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if(serializedState === null) { return undefined }
    return JSON.parse(serializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducers, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
