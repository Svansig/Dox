import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import SearchResults from './searchResults';
import Header from './header';
import DetailsPage from './detailsPage';
import './app.css';

export default () => {
  let [search, setSearch] = useState('');

  const handleInput = (e) => setSearch(e.target.value);

  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Enter') {
        return <Redirect to='/search' />;
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  return (
    <Router>
      <Header handleInput={handleInput} search={search} />
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
