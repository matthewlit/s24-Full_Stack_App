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
  File: movies.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the movies page
**************************************************************************/

// Movies Page
export default function Movies() {
  // Initialize useState hooks
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [discoverResults, setDiscoverResults] = useState([]);
  const { user } = useStateContext();

  // Get currently trending movies from TMDB API
  const getTrending = async () => {
    const request =
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    const data = await infoHandler(request);
    setDiscoverResults(data.results);
  };

  // Get user's recommended movies based off watch list from watchthis API
  const getRecommend = async () => {
    // Get user's data from database
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();

      // Get ids of movies in user's watch list and pass them to watchthis API
      const movieIdsString = userData.shows.join(",");
      if (movieIdsString === "") return;
      const request =
        "https://watchthis.p.rapidapi.com/api/v1/movie?ids=" + movieIdsString;
      // const data = await recommendHandler(request); // **Uncomment for recommendations**

      // Get info for recommended movies from TMDB API
      let moviePromises = data.related.map(async (movie) => {
        const request = "https://api.themoviedb.org/3/movie/" + movie.tmdb_id;
        const response = await infoHandler(request);
        return response;
      });

      // Wait to all info is received and update movies array
      const movies = await Promise.all(moviePromises);
      setRecommendedMovies(movies);
    }
  };

  // Get results from user query from TMDB API
  const onSearch = async (query) => {
    const request =
      "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(query);
    const data = await infoHandler(request);
    setDiscoverResults(data.results);
  };

  // Update discover list based on search
  const Search = (query) => {
    if (query != "") onSearch(query);
    else getTrending();
  };

  // Get user recommended and trending movies on first render
  useEffect(() => {
    getTrending();
    getRecommend();
  }, []);

  return (
    <>
      <Head>
        <title>TVTrackr - Movies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar />
        <Background>
          {/* Search Bar */}
          <ContentContainer>
            <SearchBar
              placeholder={"Search movies by title..."}
              onSearch={Search}
            />
          </ContentContainer>
          {/* List for discover movies */}
          <ContentContainer>
            <Title>Discover Movies:</Title>
            <TVList data={discoverResults} />
          </ContentContainer>
          {/* List of recommended movies */}
          <ContentContainer>
            <Title>Recommended Movies:</Title>
            <TVList data={recommendedMovies} />
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
