import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Colors from "@/library/Colors"
import { useState, useRef } from 'react'
import { useStateContext } from "@/context/StateContext";
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ["latin"] });

// Sign In Page
export default function Home() {

  const { user, setUser } = useStateContext();
  const router = useRouter();

  // Input references
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Run when sign in button clicked
  function SignIn() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // TODO: SIGN IN

    //Temp navigation to main site
    setUser(email);
    router.push('/watchList');
  }

  return (
    <>
      <Head>
        <title>TVTrackr - Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      <Page>
        {/* Sign In Form */}
        <SignInContainer>
          <Logo src="Logo.png"></Logo>
          <SignInLabel>Email:</SignInLabel>
            <SignInInput type="email" ref={emailRef} />
          <SignInLabel>Password:</SignInLabel>
            <SignInInput type="password" ref={passwordRef} />
          <SignInButton type="submit" onClick={SignIn}>Sign In</SignInButton>
        </SignInContainer>
      </Page>   
    </>
  );
}

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.backgroundLight};
`

const SignInContainer = styled.div`
  background-color: ${Colors.secondary};
  color: ${Colors.text};
  padding: 2vw;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  align-items: center;
`

const SignInLabel = styled.label`
  font-size: 1.25vw;
`

const SignInInput = styled.input`
  padding: 0.5vw;
  font-size: 1vw;
`

const SignInButton = styled.button`
  background-color: ${Colors.accentDark};
  width: 15vw;
  height: 2.5vw;
  margin-top: 1vw;
  color: ${Colors.text};
  text-align: center;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover{
    background-color: ${Colors.accentLight};
  }
`

const Logo = styled.img`
  width: 10vw;
  margin: 1vw;
`