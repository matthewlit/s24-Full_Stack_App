import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@/library/firebaseConfig.js";
import { signOut } from "firebase/auth";
import { useStateContext } from "@/context/StateContext";

// Nav Bar Component
const Navbar = () => {
  const router = useRouter();

    const { setUser } = useStateContext();

    // Run when sign out button clicked
    function SignOut() {
      // Sign In
      signOut(auth).then(() => {
          // Signed out
          setUser({uid: null, email: "None"});
          router.push("/");
        })
        .catch((error) => {
          // Handle error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error ${errorCode}: ${errorMessage}`);
        });
    }

  return (
    <Container>
      {/* Logo */}
      <LogoContainer>
        <Link href="/profile">
          <Logo src="Logo.png"></Logo>
        </Link>
      </LogoContainer>

      {/* Navigation Buttons */}
      <NavButtonContainer>
        <Link href="/profile">
          <NavButton active={router.pathname === "/profile"}>Profile</NavButton>
        </Link>
        <Link href="/watchList">
          <NavButton active={router.pathname === "/watchList"}>
            Watch List
          </NavButton>
        </Link>
        <Link href="/shows">
          <NavButton active={router.pathname === "/shows"}>Shows</NavButton>
        </Link>
        <Link href="/movies">
          <NavButton active={router.pathname === "/movies"}>Movies</NavButton>
        </Link>
      </NavButtonContainer>

      {/* Sign Out Button */}
      <SignOutButtonContainer>
          <NavButton onClick={SignOut}>Sign Out</NavButton>
      </SignOutButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: ${Colors.backgroundDark};
  position: fixed;
  height: 100%;
  overflow: auto;
`;

const LogoContainer = styled.div`
  align-self: center;
  padding-bottom: 2vw;
`;

const Logo = styled.img`
  width: 10vw;
`;

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  align-items: center;
`;

const NavButton = styled.button`
  background-color: ${(props) =>
    props.active ? Colors.accentLight : Colors.secondary};
  box-shadow: 1px 1px 5px ${Colors.accentLight};
  color: ${Colors.text};
  width: 10vw;
  height: 2.5vw;
  text-align: center;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover {
    background-color: ${Colors.accentDark};
  }
`;

const SignOutButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 2.5vw;
`;

export default Navbar;
