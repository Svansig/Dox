import React from 'react';
import { Link } from 'react-router-dom';

const handleSubmit = (e, history) => {
  console.log(history);
  e.preventDefault();
  history.push('/search');
};

export default (props) => (
  <div className='header'>
    <Link to='/'>
      <h1>DOX!</h1>
    </Link>
    <input
      onChange={props.handleInput}
      onSubmit={(e) => handleSubmit(e, props.history)}
      value={props.search}></input>
    <button>
      <Link to='/search'>Search!</Link>
    </button>
  </div>
);
