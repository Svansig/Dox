import React, { useState, useEffect } from 'react';
import SearchResult from './searchResult';
import fetch from 'node-fetch';
import './app.css';
export default () => {
  let [search, setSearch] = useState('');
  let [page, setPage] = useState('');
  let [data, setData] = useState({});

  const handleInput = (e) => setSearch(e.target.value);

  const getMoreInfo = (name) => {
    console.log(name);
    fetch(`/api/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        getPage(data.collected.metadata.links.repository);
      });
  };

  const resetData = () => {
    setPage('');
    setData({});
  };
  const handleSearch = () => {
    fetch(`/api?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const getPage = (url, site = 'github') => {
    console.log(url);
    fetch('/api/page', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url, site }),
    })
      .then((res) => res.text())
      .then((data) => setPage(data));
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [handleSearch]);

  return (
    <div>
      <div className='header'>
        <h1 onClick={resetData}>DOX!</h1>
        <input onChange={handleInput} value={search}></input>
        <button onClick={handleSearch}>Search!</button>
      </div>
      {data.results &&
        data.results.map((result) => <SearchResult {...result} getMoreInfo={getMoreInfo} />)}
      {data.collected && (
        <div className='description'>
          <div className='repo-title'>{data.collected.metadata.name.toUpperCase()}</div>
          <div>
            {Object.entries(data.collected.metadata.links).map(([site, link]) => (
              <a
                className='links'
                onClick={site === 'homepage' ? '' : () => getPage(link, site)}
                href={site === 'homepage' ? link : '#'}>
                -{site.toUpperCase()}-
              </a>
            ))}
          </div>
          <div>Description: {data.collected.metadata.description}</div>
        </div>
      )}
      <div>{page && <div className='imported' dangerouslySetInnerHTML={{ __html: page }} />}</div>
    </div>
  );
};
