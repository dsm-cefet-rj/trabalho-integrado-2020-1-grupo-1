
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import {useSelector} from 'react-redux'
import { Router } from 'react-router-dom'
import { Provider } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux';
import rootReducers  from '../store/reducers';
import { act } from 'react-dom/test-utils';
import NewTeam from './NewTeam'
import { configureStore } from '@reduxjs/toolkit'




// Mocking redux module
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn( () => jest.fn((param) => param) )
}));


// Mocking the state
const mockAppState = {
    users: [
        {email: "mateus@gmail.com", 
        password: "$2b$10$AG0YZHaMDs1FQclXvbHbq.8njmL0u9NgDpxyAQFqsGjiN1ayIQoqC", 
        id: "5fdf857ebaec7e21d058052f"
    }]
}

// Mocking /api/teams
jest.mock("../api/teams", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

// Mocking the slice
/*
jest.mock("./ProjetosSlice", () => ({
    selectProjetosById: jest.fn((state, id) => mockAppState.projetos.projetos.find(e => e.id == id)),
    addProjetoServer: jest.fn(),
    updateProjetoServer: jest.fn()
}));*/

const fieldTest = async (nomeEquipeParam, siglaEquipeParam, isNomeValido, isSiglaValida, msgEsperada, path = "/newteam", containerParam = null, historyParam = null) => {
    const history = historyParam ? historyParam : createMemoryHistory();
    const store = createStore(rootReducers);
    const { container } = containerParam ? containerParam : render(<Router history={history}><NewTeam/></Router>);

    const nome = container.querySelector("#team_name");
    const sigla = container.querySelector("#team_initials");
    const submitButton = container.querySelector("#btn_create_team");
    const vizualisarButton = container.querySelector("#btn_viewTeam");
    const sairEquipeButton = container.querySelector("#team_leave");

    fireEvent.input(nome, {target: {value: nomeEquipeParam}});
    fireEvent.input(sigla, {target: {value: siglaEquipeParam}});

    await act(async () => {
        fireEvent.submit(submitButton);
    });
    
    if(!isNomeValido){
        jest.spyOn(Alert, 'alert');
        expect(Alert.alert).toHaveBeenCalledWith(msgEsperada)
    }
    if(!isSiglaValida){
        jest.spyOn(Alert, 'alert');
        expect(Alert.alert).toHaveBeenCalledWith(msgEsperada)
    }
    if(isNomeValido && isSiglaValida){
        expect(global.window.location.pathname).toEqual('/team');
        expect(screen.getByText(/Equipe/i)).toBeInTheDocument();
        expect(vizualisarButton).toBeInTheDocument();
        expect(sairEquipeButton).toBeInTheDocument();    
    }
}

const buttonTest = async (nomeEquipeParam, siglaEquipeParam, isNomeValido, isSiglaValida, msgEsperada, path = "/newteam", containerParam = null, historyParam = nulla) => {
    
    const history = historyParam ? historyParam : createMemoryHistory();
    const store = createStore(rootReducers);
    const { container } = containerParam ? containerParam : render(<Router history={history}><NewTeam/></Router>);

    const criarButton = container.querySelector("#btn_create_team");

    fireEvent.input(nome, {target: {value: nomeEquipeParam}});
    fireEvent.input(sigla, {target: {value: siglaEquipeParam}});
    
    if(!isNomeValido){
        expect(submitButton).toHaveAttribute('disabled');
    }
    if(!isSiglaValida){
        expect(submitButton).toHaveAttribute('disabled');
    }
    if(isNomeValido && isSiglaValida){
        expect(submitButton.getAttribute("disabled")).toBe(null);
    }
}

let store;
describe("NewTeam unit", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
        store = configureStore({reducer: { projetos:  }});
    });
    
    afterEach(() => {
        useSelector.mockClear();
//        addProjetoServer.mockClear();
    });

    //####### CAMPO NOME ################################
    test('Nome Vazio', async () => {
        fieldTest('', 'abc', false, true, 'Ocorreu um erro inesperado!')
    });

    test('Nome limite inferior válido', async () => {
        await fieldTest('abc', 'abc', true, true, null);
    });

    test('Nome válido', async () => {
        await fieldTest('Nome', 'abc', true, true, null);
    });

    test('Nome limite superior válido -1', async () => {
        await fieldTest('abcdefghijklmnopqrstuvwx', 'abc', true, true, null);
        expect(global.window.location.pathname).toEqual('/team');
        expect(screen.getByText(/Equipe/i)).toBeInTheDocument();
        expect(container.querySelector("#btn_viewTeam")).toBeInTheDocument();
        expect(container.querySelector("#team_leave")).toBeInTheDocument();
        expect(container.querySelector("#team_leave")).toBeInTheDocument();
    });

    test('Nome limite superior válido', async () => {
        await fieldTest('abcdefghijklmnopqrstuvwxy', 'abc', true, true, null);
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Nome limite superior inválido', async () => {
        await fieldTest('abcdefghijklmnopqrstuvwxyz', 'abc', false, true, 'Ocorreu um erro inesperado!');
        expect(addProjetoServer).toHaveBeenCalledTimes(0);
    });

    //####### CAMPO SIGLA ################################
    test('Sigla Vazia', async () => {
        fieldTest('Teste', '', true, false, 'Ocorreu um erro inesperado!')
    });

    test('Sigla limite inferior válido', async () => {
        await fieldTest('Teste', 'abc', true, true, null);
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla válido/limite superior válido -1', async () => {
        await fieldTest('Teste', 'abcd', true, true, null);
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla limite superior válido', async () => {
        await fieldTest('Teste', 'abcde', true, true, null);
        expect(addProjetoServer).toHaveBeenCalledTimes(1);
    });

    test('Sigla limite superior inválido', async () => {
        await fieldTest('Projeto', 'abcdef', true, false, 'Ocorreu um erro inesperado!');
        expect(addProjetoServer).toHaveBeenCalledTimes(0);
    });

    //##########################################################


});