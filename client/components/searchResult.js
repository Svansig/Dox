import React from 'react';

export default (props) => {
  return (
    <div className='search-result'>
      <span onClick={() => props.getMoreInfo(props.package.name)}>{props.package.name}</span>
      {props.package.description}
    </div>
  );
};
