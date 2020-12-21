
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
    }],
    teams: {
        status: 'not_loaded',
        error: null,
        teams: []
    }
}

// Mocking /api/teams
jest.mock("../api/teams", () => ({
    httpGet: jest.fn(),
    httpPost: jest.fn(),
    httpPut: jest.fn(),
    httpDelete: jest.fn()
}));

// Mocking the slice

jest.mock("./TeamsSlice", () => ({
    selectAllTeams: jest.fn(() => mockAppState.teams.teams),
    deleteTeamServer: jest.fn(),
    fetchTeams: jest.fn()
}));


const buttonTest = async (existeTime, containerParam = null, historyParam = null) => {
    
    const history = historyParam ? historyParam : createMemoryHistory();
    const store = createStore(rootReducers);
    const { container } = containerParam ? containerParam : render(<Router history={history}><Team/></Router>);

    const visualizarButton = container.querySelector("#btn_viewTeam");
    const sairButton = container.querySelector("#btn_leave");
    const criarButton = container.querySelector("#btn_create_team");
    
    if(existeTime){
        expect(sairButton).toBeTruthy()
        expect(visualizarButton).toBeTruthy()
        expect(criarButton).toBeNull();
    } else{
        expect(sairButton).toBeNull()
        expect(visualizarButton).toBeNull()
        expect(criarButton).toBeTruthy();
    }
}

let store;
describe("Team unit", () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });
    
    afterEach(() => {
        selectAllTeams.mockClear();
        deleteTeamServer.mockClear();
        fetchTeams.mockClear();
    });
    
    test('Existe time vinculado', async () => {
        expect(selectAllTeams).toHaveBeenCalledTimes(1);
        buttonTest(true);
    });

    test('Não Existe time vinculado', async () => {
        expect(selectAllTeams).toHaveBeenCalledTimes(1);
        buttonTest(false);
    });

});