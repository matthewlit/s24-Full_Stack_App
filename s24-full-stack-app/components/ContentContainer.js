import React from 'react'
import styled from 'styled-components'
import Colors from '../library/Colors'

const ContentContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

const Container = styled.div`
  background-color: ${Colors.secondary};
  color: ${Colors.text};
  padding: 2vw;
  border-radius: 10px;
  margin: 2.5vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  align-items: center;
`

export default ContentContainer
