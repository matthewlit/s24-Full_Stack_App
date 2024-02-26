export default async function handler(req) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b4a80dd4demsh4860fc9fcf506a9p124234jsn694ea47b41bb",
      "X-RapidAPI-Host": "watchthis.p.rapidapi.com",
    },
  };

  const res = await fetch(req, options);
  const data = await res.json();
  return data;
}
