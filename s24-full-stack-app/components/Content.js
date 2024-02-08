import React from 'react'
import styled from 'styled-components'
import Colors from './Colors'

const Content = () => {
  return (
    <Contentcontainer></Contentcontainer>
  )
}

const Contentcontainer = styled.div`
  background-color: ${Colors.background1};
  font-size: 5vw;
  margin-left: 17%;
  padding-left: 5%;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: auto;
`

export default Content
