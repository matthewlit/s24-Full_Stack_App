import Head from "next/head";
// Components and APIs
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";
import infoHandler from "./api/getInfo";
import recommendHandler from "./api/getRecommend";
// Firebase
import { database } from "@/library/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// React
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect } from "react";

/**************************************************************************
  File: shows.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the shows page
**************************************************************************/

// Shows Page
export default function Shows() {
  // Initialize useState hooks
  const [recommendedShows, setRecommendedShows] = useState([]);
  const [discoverResults, setDiscoverResults] = useState([]);
  const { user } = useStateContext();

  // Get currently trending shows from TMDB API
  const getTrending = async () => {
    const request =
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
    const data = await infoHandler(request);
    setDiscoverResults(data.results);
  };

  // Get user's recommended shows based off watch list from watchthis API
  const getRecommend = async () => {
    // Get user's data from database
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Get ids of shows in user's watch list and pass them to watchthis API
      const showIdsString = userData.shows.reverse().join(",");
      if (showIdsString === "") return;
      const request =
        "https://watchthis.p.rapidapi.com/api/v1/tv?ids=" + showIdsString;
      const data = await recommendHandler(request);

      // Get info for recommended shows from TMDB API
      let showPromises = data.related.map(async (show) => {
        if (!userData.shows.includes(show.tmdb_id)) {
          const request = "https://api.themoviedb.org/3/tv/" + show.tmdb_id;
          const response = await infoHandler(request);
          return response;
        } else {
          return undefined;
        }
      });

      // Wait to all info is received and update show array
      const shows = await Promise.all(showPromises);
      const validShows = shows.filter(show => show !== undefined);
      setRecommendedShows(validShows);
    }
  };

  // Get results from user query from TMDB API
  const onSearch = async (query) => {
    const request =
      "https://api.themoviedb.org/3/search/tv?query=" +
      encodeURIComponent(query);
    const data = await infoHandler(request);
    setDiscoverResults(data.results);
  };

  // Update discover list based on search
  const Search = (query) => {
    if (query != "") onSearch(query);
    else getTrending();
  };

  // Get user recommended and trending shows on first render
  useEffect(() => {
    getTrending();
    getRecommend();
  }, []);

  return (
    <>
      <Head>
        <title>TVTrackr - Shows</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar />
        <Background>
          {/* Search Bar */}
          <ContentContainer>
            <SearchBar
              placeholder={"Search shows by title..."}
              onSearch={Search}
            />
          </ContentContainer>
          {/* List for discover shows */}
          <ContentContainer>
            <Title>Discover Shows:</Title>
            <TVList data={discoverResults} />
          </ContentContainer>
          {/* List of recommended shows */}
          <ContentContainer>
            <Title>Recommended Shows:</Title>
            <TVList data={recommendedShows} />
          </ContentContainer>
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div``;

const Title = styled.h1`
  text-align: center;
`;
