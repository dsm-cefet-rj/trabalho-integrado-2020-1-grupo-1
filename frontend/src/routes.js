import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './pages/home';
import Signup from './pages/signup';
import ForgetMyPassword from './pages/forgetPassword';
import ViewTeam from './pages/viewTeam';
import Team from './pages/team';
import Index from './pages/index';
import NewTeam from './pages/newTeam';
import Competition from './pages/competition';
import MyCompetition from './pages/myCompetition';
import NewCompetition from './pages/newCompetition';
import ViewCompetition from './pages/viewCompetition';
import ViewMatch from './pages/viewMatch';


function isAuthenticated() {
  const access_token = sessionStorage.getItem("access_token");
  if (access_token != null) {
    return true
  } else {
    // return false
    return true
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


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ () => <Home /> } />
        <Route path="/signup" component={ () => <Signup /> } />
        <Route path="/forget" component={ () => <ForgetMyPassword /> } />
        <PrivateRoute path="/index" component={ () => <Index/> } />
        <PrivateRoute path="/team" component={ () => <Team /> } />
        <PrivateRoute path="/viewteam" component={ () => <ViewTeam /> } />
        <PrivateRoute path="/newteam" component={ () => <NewTeam /> } />
        <PrivateRoute path="/competition" component={ () => <Competition /> } />
        <PrivateRoute path="/mycompetition" component={ () => <MyCompetition/> } />
        <PrivateRoute path="/newcompetition" component={ () => <NewCompetition/> } />
        <PrivateRoute path="/viewcompetition" component={ () => <ViewCompetition/> } />
        <PrivateRoute path="/match" component={ () => <ViewMatch/> } />
      </Switch>
    </BrowserRouter>
  )
}
