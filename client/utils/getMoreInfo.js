export default (name, setData, getPage, setPage) => {
  console.log(name);
  fetch(`/api/${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setData(data);
      getPage(data.project, data.links.repository, 'repository', setPage);
    });
};
