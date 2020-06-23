import React, { useState } from 'react';
import SearchResult from './searchResult';
import fetch from 'node-fetch';
import './app.css';
export default () => {
  let [search, setSearch] = useState('');
  let [data, setData] = useState({});

  const handleInput = (e) => setSearch(e.target.value);

  const getMoreInfo = (name) => {
    console.log(name);
    fetch(`/api/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const handleSearch = () => {
    fetch(`/api?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <div>
      <div className='header'>
        <h1>DOX!</h1>
        <input onInput={handleInput}></input>
        <button onClick={handleSearch}>Search!</button>
      </div>
      {data.results &&
        data.results.map((result) => <SearchResult {...result} getMoreInfo={getMoreInfo} />)}
      {data.collected && (
        <div className='description'>
          <div className='repo-title'>{data.collected.metadata.name.toUpperCase()}</div>
          <div>
            {Object.entries(data.collected.metadata.links).map(([site, link]) => (
              <a className='links' href={link}>
                -{site.toUpperCase()}-
              </a>
            ))}
          </div>
          <div>Description: {data.collected.metadata.description}</div>
        </div>
      )}
    </div>
  );
};
