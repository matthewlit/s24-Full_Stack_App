import Head from "next/head";
// Components and APIs
import styled from "styled-components";
import ContentContainer from "@/components/ContentContainer";
import Colors from "@/library/Colors";
// Firebase
import { auth } from "@/library/firebaseConfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "@/library/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
// React
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/router";
import { useRef } from "react";

/**************************************************************************
  File: index.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the sign in page
**************************************************************************/

// Sign In Page
export default function Home() {
  const { setUser } = useStateContext();
  const router = useRouter();

  // Input references
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Run when sign up button clicked
  function SignUp() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Sign up
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUser(user);

        // Create empty watchList in database
        const newDocData = { email: user.email, movies: [], shows: [] };
        const docRef = doc(database, "watchLists", user.uid);
        setDoc(docRef, newDocData)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        router.push("/profile");
      })
      .catch((error) => {
        // Handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
        alert("Invalid Credentials");
      });
  }

  // Run when sign in button clicked
  function SignIn() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Sign In
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        router.push("/profile");
      })
      .catch((error) => {
        // Handle error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
        alert("Invalid Credentials");
      });
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
          <SignInWrapper>
            <Logo src="Logo.png"></Logo>
            <SignInLabel>Email:</SignInLabel>
            <SignInInput type="email" ref={emailRef} />
            <SignInLabel>Password:</SignInLabel>
            <SignInInput type="password" ref={passwordRef} />
            <SignInButton type="submit" onClick={SignIn}>
              Sign In
            </SignInButton>
            <SignInButton type="submit" onClick={SignUp}>
              Sign Up
            </SignInButton>
          </SignInWrapper>
        </ContentContainer>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.backgroundLight};
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInLabel = styled.label`
  font-size: 1.25vw;
  text-align: center;
`;

const SignInInput = styled.input`
  margin: 0.5vw;
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: None;
`;

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
  &:hover {
    background-color: ${Colors.accentLight};
  }
`;

const Logo = styled.img`
  width: 10vw;
  margin: 1vw;
`;
