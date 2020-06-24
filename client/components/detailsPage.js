import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImportedPage from './importedPage';
import DetailsHeader from './detailsHeader';

const getMoreInfo = (name, setData, getPage, setPage) => {
  console.log(name);
  fetch(`/api/${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setData(data);
      getPage(data.project, data.links.repository, 'repository', setPage);
    });
};

const getPage = (name, url, site, setPage) => {
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
      setPage(data);
    });
};

export default () => {
  const { project } = useParams();
  const [data, setData] = useState({});
  const [page, setPage] = useState('');

  useEffect(() => getMoreInfo(project, setData, getPage, setPage), [getMoreInfo]);

  return (
    <>
      <DetailsHeader project={data.project} description={data.description} links={data.links} />
      <ImportedPage page={{ __html: page }} />
    </>
  );
};
