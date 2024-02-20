import Head from "next/head";
import { Inter } from "next/font/google";
import styled from "styled-components";
import Colors from "@/library/Colors"
import { useRef } from 'react'
import { useStateContext } from "@/context/StateContext";
import { useRouter } from 'next/router';
import ContentContainer from "@/components/ContentContainer";

const inter = Inter({ subsets: ["latin"] });

// Sign In Page
export default function Home() {

  const { setUser } = useStateContext();
  const router = useRouter();

  // Input references
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Run when sign in button clicked
  function SignIn() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // TODO: SIGN IN

    // Check for blank input
    if (email === "" || password === ""){
      alert("Invalid email or password. Please try again.");
    }
    else{
      // Temp navigation to main site for any input
      setUser(email);
      router.push('/profile');
    }
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
        <ContentContainer>
          <Logo src="Logo.png"></Logo>
          <SignInLabel>Email:</SignInLabel>
            <SignInInput type="email" ref={emailRef} />
          <SignInLabel>Password:</SignInLabel>
            <SignInInput type="password" ref={passwordRef} />
          <SignInButton type="submit" onClick={SignIn}>Sign In</SignInButton>
        </ContentContainer>
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