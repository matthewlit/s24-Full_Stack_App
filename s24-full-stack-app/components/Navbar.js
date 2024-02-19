import React from 'react'
import styled from 'styled-components'
import Colors from '../library/Colors'
import Link from 'next/link'
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <Container>
        <LogoContainer>
        <Link href="/watchList"><Logo src="Logo.png"></Logo></Link>
        </LogoContainer>

        <NavButtonContainer>
          <Link href="/">
            <NavButton active={router.pathname === '/'}>Home</NavButton>
          </Link>
          <Link href="/watchList">
            <NavButton active={router.pathname === '/watchList'}>Watch List</NavButton>
          </Link>
          <Link href="/recommend">
            <NavButton active={router.pathname === '/recommend'}>Recommendations</NavButton>
          </Link>
          <Link href="/profile">
            <NavButton active={router.pathname === '/profile'}>Profile</NavButton>
          </Link>
        </NavButtonContainer>

    </Container>
  )
}

const Container = styled.div`
  width:15%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: ${Colors.backgroundLight};
  position: fixed;
  height: 100%;
  overflow: auto;
`

const LogoContainer = styled.div`
  align-self: center;
  padding-bottom: 2vw;
`

const Logo = styled.img`
  width: 15vw;
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
  width: 15vw;
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

export default Navbar