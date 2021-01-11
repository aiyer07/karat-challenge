import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {Dashboard } from './pages'

const App = () => {
  return (
    <main>
      <Switch>
          <Route path="/" component={Dashboard} />
      </Switch>
    </main>
  );
}

export default App;
