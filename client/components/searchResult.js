import React from 'react';

export default (props) => {
  return (
    <div className='search-result'>
      <span onClick={() => props.getMoreInfo(props.name)}>{props.name}</span>
      {props.description}
    </div>
  );
};
