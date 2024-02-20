import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import Colors from "@/library/Colors";
import { useStateContext } from "@/context/StateContext";
import ContentContainer from "@/components/ContentContainer";
import StatCounter from "@/components/StatCounter";

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``;

// Profile Page
export default function Profile() {
  // Get Username
  const { user } = useStateContext();

  // **TODO**: Get Stats
  const episodesWatched = 0;
  const moviesWatched = 0;
  const hoursWatched = 0;

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
            <StatCounter label="Episodes Watched:" value={episodesWatched} />
            <StatCounter label="Movies Watched:" value={moviesWatched} />
            <StatCounter label="Hours Watched:" value={hoursWatched} />
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
