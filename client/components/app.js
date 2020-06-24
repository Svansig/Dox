import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import SearchResults from './searchResults';
import Header from './header';
import DetailsPage from './detailsPage';
import './app.css';

export default () => {
  let [search, setSearch] = useState('');
  let history = useHistory();

  const handleInput = (e) => setSearch(e.target.value);

  return (
    <Router>
      <Header handleInput={handleInput} search={search} history={history} />
      <Switch>
        <Route path='/search'>
          <SearchResults search={search} setSearch={setSearch} />
        </Route>

        <Route path='/:project'>
          <DetailsPage />
        </Route>
      </Switch>
    </Router>
  );
};
