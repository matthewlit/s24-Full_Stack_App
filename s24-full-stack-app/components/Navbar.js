import React from 'react'
import styled from 'styled-components'
import Colors from './Colors'

const Navbar = () => {
  return (
    <Container>
        <LogoContainer>
          <Logo src="Logo.png"></Logo>
        </LogoContainer>

        <NavButtonContainer>
            <NavButton>Home</NavButton>
            <NavButton>Watch List</NavButton>
            <NavButton>Recommendations</NavButton>
            <NavButton>Profile</NavButton>
        </NavButtonContainer>

    </Container>
  )
}

const Container = styled.div`
  width:15%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background-color: ${Colors.background2};
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
`

const NavButton = styled.button`
  background-color: ${Colors.secondary};
  color: ${Colors.text};
  padding: 0.5vw;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover{
    background-color: ${Colors.accent};
  }
`

export default Navbar