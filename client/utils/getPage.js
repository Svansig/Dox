export default (name, url, site, setPage) => {
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
