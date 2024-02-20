import React from 'react'
import styled from 'styled-components'
import Colors from '../library/Colors'
import Link from 'next/link'
import { useRouter } from 'next/router';

// Nav Bar Component
const Navbar = () => {
  const router = useRouter();

  return (
    <Container>
        {/* Logo */}
        <LogoContainer>
          <Link href="/profile"><Logo src="Logo.png"></Logo></Link>
        </LogoContainer>

        {/* Navigation Buttons */}
        <NavButtonContainer>
          <Link href="/profile">
            <NavButton active={router.pathname === '/profile'}>Profile</NavButton>
          </Link>
          <Link href="/watchList">
            <NavButton active={router.pathname === '/watchList'}>Watch List</NavButton>
          </Link>
          <Link href="/recommend">
            <NavButton active={router.pathname === '/showsAndMovies'}>Shows and Movies</NavButton>
          </Link>
        </NavButtonContainer>

        {/* Sign Out Button */}
        <SignOutButtonContainer>
          <Link href="/"><NavButton>Sign Out</NavButton></Link>
        </SignOutButtonContainer>

    </Container>
  )
}

const Container = styled.div`
  width:10%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: ${Colors.backgroundDark};
  position: fixed;
  height: 100%;
  overflow: auto;
`

const LogoContainer = styled.div`
  align-self: center;
  padding-bottom: 2vw;
`

const Logo = styled.img`
  width: 10vw;
`

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  align-items: center;
`

const NavButton = styled.button`
  background-color: ${props => props.active ? Colors.accentLight : Colors.secondary};
  color: ${Colors.text};
  width: 10vw;
  height: 2.5vw;
  text-align: center;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover{
    background-color: ${Colors.accentDark};
  }
`

const SignOutButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 2.5vw;
`

export default Navbar