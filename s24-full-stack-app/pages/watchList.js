import Head from "next/head";
// Components and APIs
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";
import infoHandler from "@/pages/api/getInfo";
import Colors from "../library/Colors";
// Firebase
import { database } from "@/library/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// React
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect } from "react";

/**************************************************************************
  File: watchList.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the watchList page
**************************************************************************/

const Page = styled.div``;

// Watch List Page
export default function WatchList() {
  // Initialize useState hooks
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const { user } = useStateContext();

  // Sets shows and movies to the user's current watch list in the database
  async function getUserData() {
    // Get user's data from database
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      // Get info for all shows in watch list from TMDB API
      let showPromises = data.shows.map(async (id) => {
        const request = "https://api.themoviedb.org/3/tv/" + id;
        const response = await infoHandler(request);
        return response;
      });
      // Get info for all movies in watch list from TMDB api
      let moviePromises = data.movies.map(async (id) => {
        const request = "https://api.themoviedb.org/3/movie/" + id;
        const response = await infoHandler(request);
        return response;
      });

      // Wait to all info is received and update show and movie arrays
      const shows = await Promise.all(showPromises);
      const movies = await Promise.all(moviePromises);
      setShows(shows);
      setMovies(movies);
    }
  }

  // Get user data on first render
  useEffect(() => {
    if (user != null) {
      getUserData();
    }
  }, []);

  return (
    <>
      <Head>
        <title>TVTrackr - Watch List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar />
        <Background>
          {/* Page Header */}
          <HeaderWrapper>
            <Header>Your Watch List</Header>
          </HeaderWrapper>
          {/* List of watched shows */}
          <ContentContainer>
            <Title>Watched Shows:</Title>
            <TVList
              data={shows}
              emptyMessage="Your watchlist is empty!"
              added={true}
            />
          </ContentContainer>
          {/* List of watched movies */}
          <ContentContainer>
            <Title>Watched Movies:</Title>
            <TVList
              data={movies}
              emptyMessage="Your watchlist is empty!"
              added={true}
            />
          </ContentContainer>
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Title = styled.h1`
  text-align: center;
`;

const Header = styled.h1`
  color: ${Colors.text};
  text-align: center;
  font-size: 4vw;
  margin: 2vw;
`;

const HeaderWrapper = styled.div`
  background-color: ${Colors.secondary};
  border-radius: 5vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2vw;
  box-shadow: 2px 2px 5px ${Colors.accentLight};
  width: fit-content;
  display: flex;
`;
