import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImportedPage from './importedPage';
import DetailsHeader from './detailsHeader';

import getPage from '../utils/getPage';
import getMoreInfo from '../utils/getMoreInfo';

export default () => {
  const { project } = useParams();
  const [data, setData] = useState({});
  const [page, setPage] = useState('');

  useEffect(() => getMoreInfo(project, setData, getPage, setPage), [getMoreInfo]);

  return (
    <>
      <DetailsHeader
        getPage={getPage}
        setPage={setPage}
        project={data.project}
        description={data.description}
        links={data.links}
      />
      <ImportedPage page={{ __html: page }} />
    </>
  );
};
