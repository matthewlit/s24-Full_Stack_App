import React from 'react'
import styled from 'styled-components'
import Colors from '../library/Colors'

const Content = () => {
  return (
    <Contentcontainer></Contentcontainer>
  )
}

const Contentcontainer = styled.div`
  background-color: ${Colors.backgroundDark};
  color: ${Colors.text};
  font-size: 10vw;
  margin-left: 17%;
  padding-left: 5%;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
`

export default Content
