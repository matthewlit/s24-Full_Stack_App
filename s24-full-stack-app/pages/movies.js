import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";
import infoHandler from "./api/getInfo";
import recommendHandler from "./api/getRecommend";
import { useState, useEffect } from "react";
import { database } from "@/library/firebaseConfig";
import { doc, getDoc  } from "firebase/firestore";
import { useStateContext } from "@/context/StateContext";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Recommendations Page
export default function Movies() {

  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [discoverResults, setDiscoverResults] = useState([]);
  const { user } = useStateContext();

  const getTrending = async () => {
    const request =
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    const data = await infoHandler(request);
    console.log(data);
    setDiscoverResults(data.results)
    console.log(discoverResults)
  };

  const getRecommend = async () => {
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const movieIdsString = userData.shows.join(",");
      if (movieIdsString === "")
        return
      console.log(movieIdsString)
      const request = "https://watchthis.p.rapidapi.com/api/v1/movie?ids=" + movieIdsString;
      const data = await recommendHandler(request);
      let moviePromises = data.related.map(async (movie) => {
        const request = "https://api.themoviedb.org/3/movie/" + movie.tmdb_id;
        // const response = await infoHandler(request);
        return response;
      });
      const movies = await Promise.all(moviePromises);

      setRecommendedMovies(movies)
    }
  };

  const onSearch = async (query) => {
    const request =
      "https://api.themoviedb.org/3/search/movie?query=" + encodeURIComponent(query);
    const data = await infoHandler(request);
    setDiscoverResults(data.results);
  };

  const Search = (query) => {
    if (query != "")
      onSearch(query);
    else
      getTrending()
  };

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
          <ContentContainer>
            <SearchBar
              placeholder={"Search movies by title..."}
              onSearch={Search}
            />
          </ContentContainer>
          <ContentContainer>
            <Title>Discover Movies:</Title>
            <TVList data={discoverResults} />
          </ContentContainer>
          <ContentContainer>
            <Title>Recommended Movies:</Title>
            <TVList data={recommendedMovies} />
          </ContentContainer>
        </Background>
      </Page>
    </>
  );
}

const Title = styled.h1`
  text-align: center;
`;
