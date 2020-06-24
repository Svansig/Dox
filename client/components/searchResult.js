import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className='search-result'>
      <Link to={`/${props.name}`}>{props.name}</Link>
      {props.description}
    </div>
  );
};
