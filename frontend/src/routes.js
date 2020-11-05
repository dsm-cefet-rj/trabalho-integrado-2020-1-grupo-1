import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Home from './pages/home';
import Signup from './pages/signup';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ () => <Home /> } />
        <Route path="/signup" component={ () => <Signup /> } />
      </Switch>
    </BrowserRouter>
  )
}
