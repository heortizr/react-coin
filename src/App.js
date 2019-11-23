import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './components/notfound/NotFound';
import Details from './components/details/Details';
import Header from './components/commons/Header';
import List from './components/list/List';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Details} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
