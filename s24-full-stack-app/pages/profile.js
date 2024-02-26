import Head from "next/head";
// Components and APIs
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import ContentContainer from "@/components/ContentContainer";
import StatCounter from "@/components/StatCounter";
// Firebase
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/library/firebaseConfig";
// React
import { useStateContext } from "@/context/StateContext";
import { useState, useEffect } from "react";

/**************************************************************************
  File: profile.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the profile page
**************************************************************************/

// Profile Page
export default function Profile() {
  // Initialize useState hooks
  const { user } = useStateContext();
  const [showsWatched, setShowsWatched] = useState(0);
  const [moviesWatched, setMoviesWatched] = useState(0);

  // Gets stats for current user
  async function getStats() {
    // Get user's data from database
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      // Get the number of movies and shows in watch list
      setMoviesWatched(data.movies.length)
      setShowsWatched(data.shows.length)
    }
  }

  // Get user stats on first render
  useEffect(() => {
    if (user != null) {
      getStats();
    }
  }, []);

  return (
    <>
      <Head>
        <title>TVTrackr - Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar />
        <Background>
          {/* Welcome Message*/}
          <ContentContainer>
            <Welcome>Welcome, {user.email}!</Welcome>
          </ContentContainer>
          {/* Stats */}
          <StatWrapper>
            <StatCounter label="Shows Watched:" value={showsWatched} />
            <StatCounter label="Movies Watched:" value={moviesWatched} />
          </StatWrapper>
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div``;

const Welcome = styled.h1`
  font-size: 3vw;
  text-align: center;
`;

const StatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
