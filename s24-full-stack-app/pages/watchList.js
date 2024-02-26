import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";
import { useState, useEffect } from "react";
import infoHandler from "@/pages/api/getInfo";
import { database } from "@/library/firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useStateContext } from "@/context/StateContext";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Watch List Page
export default function WatchList() {
  // **TODO**: Get Users Shows from database
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const { user } = useStateContext();

  // **TODO**: Search function
  const Search = (query) => {};

  async function getUserData() {
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();

      let showPromises = data.shows.map(async (id) => {
        const request = "https://api.themoviedb.org/3/tv/" + id;
        const response = await infoHandler(request);
        return response;
      });
      let moviePromises = data.movies.map(async (id) => {
        const request = "https://api.themoviedb.org/3/movie/" + id;
        const response = await infoHandler(request);
        return response;
      });

      const shows = await Promise.all(showPromises);
      const movies = await Promise.all(moviePromises);

      setShows(shows);
      setMovies(movies);
    }
  }

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
          <ContentContainer>
            <SearchBar
              placeholder={"Search your watched shows and movies..."}
              onSearch={Search}
            />
          </ContentContainer>
          <ContentContainer>
            <Title>Watched Shows:</Title>
            <TVList
              data={shows}
              emptyMessage="Your watchlist is empty!"
              added={true}
            />
          </ContentContainer>
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

const Title = styled.h1`
  text-align: center;
`;
