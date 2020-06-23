import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import './app.css';
export default () => {
  let [data, updateData] = useState({});

  useEffect(() => {
    fetch('/api/react')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateData(data);
      });
  }, []);

  return (
    <div>
      {data.collected && (
        <div className='description'>
          <div>Repo: {data.collected.metadata.name}</div>
          <div>Link: {data.collected.metadata.links.homepage}</div>
          <div>Description: {data.collected.metadata.description}</div>
        </div>
      )}
    </div>
  );
};
