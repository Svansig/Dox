import React from 'react';

export default (props) => (
  <div>
    <div className='imported' dangerouslySetInnerHTML={props.page} />
  </div>
);
