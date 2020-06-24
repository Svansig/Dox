import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div className='header'>
    <Link to='/'>
      <h1>DOX!</h1>
    </Link>
    <input onChange={props.handleInput} value={props.search}></input>
    <button>
      <Link to='/search'>Search!</Link>
    </button>
  </div>
);
