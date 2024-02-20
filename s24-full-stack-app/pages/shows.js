import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Colors from "@/library/Colors";
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Recommendations Page
export default function Shows() {
  // **TODO**: Search function
  const Search = (query) => {};

  // **TODO**: Get Recommendations and search results
  let searchResults = [];
  let recommendedShows = [];

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
            <TVList data={searchResults} />
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
