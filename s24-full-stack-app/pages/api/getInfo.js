/**************************************************************************
  File: getInfo.js
  Author: Matthew Kelleher
  Description: Handles all TMDB API requests
**************************************************************************/

export default async function handler(req) {

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "YOUR_API_KEY",
    },
  };

  const res = await fetch(req, options)
  const data = await res.json();
  return data;
}
