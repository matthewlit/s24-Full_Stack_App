import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar"
import Background from "@/components/Background";
import Colors from "@/library/Colors"
import SearchBar from "@/components/SearchBar";
import ContentContainer from "@/components/ContentContainer";
import TVList from "@/components/TVList";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``

// Watch List Page
export default function WatchList() {

  // **TODO**: Get Users Shows from database
  let shows = []
  // shows = [{id: 1, image: 'Logo.png', title: 'Show_1'},{id: 2, image: 'Logo.png', title: 'Show_2'},{id: 3, image: 'Logo.png', title: 'Show_3'}];
  let movies = []
  movies = [{id: 1, image: 'Logo.png', title: 'Test_Movie_1'},{id: 2, image: 'Logo.png', title: 'Test_Movie_2'},{id: 3, image: 'Logo.png', title: 'Test_Movie_3'}];

  return (
    <>
      <Head>
        <title>TVTrackr - Watch List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar/>
        <Background>
          <ContentContainer>
            <SearchBar/>
          </ContentContainer>
          <ContentContainer>
            <Title>Watched Shows:</Title>
            <TVList data={shows}/>
          </ContentContainer>
          <ContentContainer>
            <Title>Watched Movies:</Title>
            <TVList data={movies}/>
          </ContentContainer>
        </Background>
      </Page>      
    </>
  );
}

const Title = styled.h1`
  text-align: center;
`
