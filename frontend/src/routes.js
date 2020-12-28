import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import store from './store';
import { getAccessToken } from './utils/getAccessToken';

import Home from './pages/home';
import Signup from './pages/signup';
import ForgetMyPassword from './pages/forgetPassword';
import RecoverPassword from './pages/recoverPassword';
import EditProfile from './pages/editProfile';
import ViewTeam from './pages/viewTeam';
import Team from './pages/team';
import Index from './pages/index';
import NewTeam from './pages/newTeam';
import Competition from './pages/competition';
import MyCompetition from './pages/myCompetition';
import NewCompetition from './pages/newCompetition';
import ViewCompetition from './pages/competitionDetails';
import ViewMatch from './pages/viewMatch';

/**
 * @module src/routes.js 
 */

/**
 * Função responsável por verificar se o usuário está autenticado, e dessa forma, informar a aplicação quais rotas ele pode ou não acessar.
 *
 */
function isAuthenticated() {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    return true
  } else {
    return false
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

/**
 * Função que possui a definição das rotas públicas e privadas da aplicação.
 *
 */
export default function Routes() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ () => <Index /> } />
          <Route path="/signup" component={ () => <Signup /> } />
          <Route path="/forget" component={ () => <ForgetMyPassword /> } />
          <Route path="/recover" component={ () => <RecoverPassword /> } />
          <PrivateRoute path="/home" component={ () => <Home /> } />
          <PrivateRoute path="/edit" component={ () => <EditProfile /> } />
          <PrivateRoute path="/team" component={ () => <Team /> } />
          <PrivateRoute path="/viewteam" component={ () => <ViewTeam /> } />
          <PrivateRoute path="/newteam" component={ () => <NewTeam /> } />
          <PrivateRoute path="/competition" component={ () => <Competition /> } />
          <PrivateRoute path="/mycompetition" component={ () => <MyCompetition /> } />
          <PrivateRoute path="/newcompetition" component={ () => <NewCompetition /> } />
          <PrivateRoute path="/viewcompetition/:id" component={ () => <ViewCompetition /> } />
          <PrivateRoute path="/match/:id" component={ () => <ViewMatch /> } />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
