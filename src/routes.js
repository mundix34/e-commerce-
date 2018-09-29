import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from './components/User';
import Home from './components/Home';
export default (
  <Switch>
    <Route component={ Home } exact path="/" />
    <Route component={ User } path="/user/:id" />
  </Switch>
)