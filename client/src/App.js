import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Albums from './Albums';
import AlbumForm2 from './AlbumForm2';
import ArtistForm from './ArtistForm';
import { CLEAR_ARTISTS } from './actions/types';

const App = () => {
  useEffect(() => {
    store.dispatch({ type: CLEAR_ARTISTS });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/edit-album/:id' component={AlbumForm2} />
          <Route exact path='/edit-album/' component={AlbumForm2} />
          <Route exact path='/edit-artist/' component={ArtistForm} />
          <Route exact path='/' component={Albums} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
