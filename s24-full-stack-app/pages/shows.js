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
export default function Shows() {
  // **TODO**: Search function
  const Search = (query) => {};

  const [recommendedShows, setRecommendedShows] = useState([]);
  const [discoverResults, setDiscoverResults] = useState([]);
  const { user } = useStateContext();

  const getTrending = async () => {
    const request =
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
    const data = await infoHandler(request);
    setDiscoverResults(data.results)
  };

  const getRecommend = async () => {
    const docRef = doc(database, "watchLists/" + user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const showIdsString = userData.shows.join(",");
      if (showIdsString === "")
        return
      console.log(showIdsString)
      const request = "https://watchthis.p.rapidapi.com/api/v1/tv?ids=" + showIdsString;
      const data = await recommendHandler(request);
      let showPromises = data.related.map(async (show) => {
        const request = "https://api.themoviedb.org/3/tv/" + show.tmdb_id;
        const response = await infoHandler(request);
        return response;
      });
      const shows = await Promise.all(showPromises);

      setRecommendedShows(shows)
    }
  };

  useEffect(() => {

      getTrending();
      getRecommend();

      console.log(discoverResults)
      console.log(recommendedShows)

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
          <ContentContainer>
            <SearchBar
              placeholder={"Search shows by title or genre..."}
              onSearch={Search}
            />
          </ContentContainer>
          <ContentContainer>
            <Title>Discover Shows:</Title>
            <TVList data={discoverResults} />
          </ContentContainer>
          <ContentContainer>
            <Title>Recommended Shows:</Title>
            <TVList data={recommendedShows} />
          </ContentContainer>
        </Background>
      </Page>
    </>
  );
}

const Title = styled.h1`
  text-align: center;
`;
