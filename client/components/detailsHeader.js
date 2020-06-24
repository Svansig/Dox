import React from 'react';

export default (props) => {
  return (
    <div className='description'>
      <div className='repo-title'>{props.project?.toUpperCase()}</div>
      <div>{props.description}</div>
      {props.links &&
        Object.entries(props.links).map(([site, link]) => (
          <a
            className='links'
            onClick={
              site === 'homepage'
                ? () => {}
                : () => props.getPage(props.project, link, site, props.setPage)
            }
            href={site === 'homepage' ? link : '#'}>
            -{site.toUpperCase()}-
          </a>
        ))}
    </div>
  );
};
