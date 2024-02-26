import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { useStateContext } from "@/context/StateContext";
import ContentContainer from "@/components/ContentContainer";
import StatCounter from "@/components/StatCounter";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/library/firebaseConfig";
import infoHandler from "@/pages/api/getInfo";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Profile Page
export default function Profile() {
  // Get Username
  const { user } = useStateContext();

  const [showsWatched, setShowsWatched] = useState(0);
  const [moviesWatched, setMoviesWatched] = useState(0);

  async function getStats() {
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setMoviesWatched(data.movies.length)
      setShowsWatched(data.shows.length)
    }
  }

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
          {/* Welcome */}
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

const Welcome = styled.h1`
  font-size: 3vw;
  text-align: center;
`;

const StatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
