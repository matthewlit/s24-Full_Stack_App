import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/Navbar"
import Content from "@/components/Content";
import Colors from "@/library/Colors"

const inter = Inter({ subsets: ["latin"] });
const Page = styled.div``

// Recommendations Page
export default function Recommend() {
  return (
    <>
      <Head>
        <title>TVTrackr - Recommendations</title>
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
