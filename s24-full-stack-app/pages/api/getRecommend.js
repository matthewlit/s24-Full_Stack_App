/**************************************************************************
  File: getRecommend.js
  Author: Matthew Kelleher
  Description: Handles all watchthis API requests
**************************************************************************/

export default async function handler(req) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_API_KEY",
      "X-RapidAPI-Host": "watchthis.p.rapidapi.com",
    },
  };

  const res = await fetch(req, options);
  const data = await res.json();
  return data;
}
