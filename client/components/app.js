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
        getPage(data.project, data.links.repository, 'repository');
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
        setSearch('');
      });
  };

  const getPage = (name, url, site) => {
    console.log(url);
    fetch('/api/page', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url, site, name }),
    })
      .then((res) => res.text())
      .then((data) => {
        // console.log(data);
        setPage(data);
      });
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
      {data.responses &&
        data.responses.map((result) => <SearchResult {...result} getMoreInfo={getMoreInfo} />)}
      {data.project && (
        <div className='description'>
          <div className='repo-title'>{data.project.toUpperCase()}</div>
          <div>
            {Object.entries(data.links).map(([site, link]) => (
              <a
                className='links'
                onClick={site === 'homepage' ? () => {} : () => getPage(data.project, link, site)}
                href={site === 'homepage' ? link : '#'}>
                -{site.toUpperCase()}-
              </a>
            ))}
          </div>
          <div>{data.description}</div>
        </div>
      )}
      <div>{page && <div className='imported' dangerouslySetInnerHTML={{ __html: page }} />}</div>
    </div>
  );
};
