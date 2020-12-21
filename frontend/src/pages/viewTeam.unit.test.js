import React from 'react'
import { render, screen } from '@testing-library/react'
import viewTeam from './viewTeam'

import { MemoryRouter } from 'react-router-dom'

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


jest.mock('./ViewTeam', () => jest.fn(() => (<Title content={'Equipe ' + team.name} />)));

const buttonDeleteTest = async (existTeam,  containerParam = null, historyParam = null) => {
    const history = historyParam ? historyParam : createMemoryHistory();
    const { container } = containerParam ? containerParam : render(<Router history={history}><ViewTeam/></Router>);

    const deleteButton = container.querySelector("#btn_delete_team");

    if(existTeam){
        
        await act(async () => {
            fireEvent.submit(deleteButton);
        });

        expect(history.location.pathname).toBe(path);
    }else{
        await act(async () => {
            fireEvent.submit(deleteButton);
        });

        expect(history.location.pathname).toBe("/");
    }

}

describe('delete team Unit', function () {

    test('sem time', () => {
        render(<ViewTeam/>);
        expect(sairButton).toBeNull()
        expect(visualizarButton).toBeNull();
        expect(criarButton).toBeTruthy();
        expect(screen.getByText(/Não existem times a serem exibidos./i)).toBeInTheDocument()
    });

    test('times vazio', () => {
        render(<ViewTeam teams={[]}  />);
        expect(screen.getByText(/Não existem times a serem exibidos./i)).toBeInTheDocument() 
    });
    
    test('um time', () => {
        render(<ViewTeam times={[{id:1, nome: 'Time 1', sigla: 'P11'}]}  />, { wrapper: MemoryRouter });
        expect(screen.getByText(/MockedLine/i)).toBeInTheDocument();
        expect(viewTeam).toHaveBeenCalledTimes(1);
    });

});