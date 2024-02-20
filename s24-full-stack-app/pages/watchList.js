import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar"
import Content from "@/components/Content";
import Colors from "@/library/Colors"

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``

// Watch List Page
export default function WatchList() {
  return (
    <>
      <Head>
        <title>TVTrackr - Watch List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        <Navbar></Navbar>
        <Content>
          
        </Content>
      </Page>      
    </>
  );
}
