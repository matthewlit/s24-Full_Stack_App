import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";
import infoHandler from "./api/getInfo";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Recommendations Page
export default function Shows() {
  // **TODO**: Search function
  const Search = (query) => {};

  // **TODO**: Get Recommendations and search results
  const recommendedShows = [];
  const [discoverResults, setDiscoverResults] = useState([])

  useEffect(() => {
      const getTrending = async () => {
        const request =
        "https://api.themoviedb.org/3/trending/tv/week?language=en-US";
        const data = await infoHandler(request);
        setDiscoverResults(data.results)
        console.log(discoverResults)
      };

      getTrending();

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
