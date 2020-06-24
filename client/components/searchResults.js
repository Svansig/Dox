import React, { useState, useEffect } from 'react';
import SearchResult from './searchResult';

const handleSearch = (search, setResponses, setSearch) => {
  fetch(`/api?search=${search}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setResponses(data.responses);
      setSearch('');
    });
};

export default (props) => {
  let [responses, setResponses] = useState([]);

  useEffect(() => {
    handleSearch(props.search, setResponses, props.setSearch);
  }, [handleSearch]);

  return (
    <div>
      {responses.map((result) => (
        <SearchResult {...result} getMoreInfo={props.getMoreInfo} />
      ))}
    </div>
  );
};
