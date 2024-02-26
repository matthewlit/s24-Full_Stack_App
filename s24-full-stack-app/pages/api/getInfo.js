export default async function handler(req) {

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjQwZGRmZDYxNDcxOGQ1MzIzNTNmYmEwYjljZjgzMyIsInN1YiI6IjY1ZDc1YjM5ZmJhNjI1MDE2OGU3MWQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zi3lTWNcwFqurfm-sKPKefNewXHsWQvf2rsAEWZYNyQ",
    },
  };

  const res = await fetch(req, options)
  const data = await res.json();
  return data;
}
