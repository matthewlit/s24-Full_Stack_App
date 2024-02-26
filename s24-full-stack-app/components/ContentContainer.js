import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: ContentContainer.js
  Author: Matthew Kelleher
  Description: Container for page contents component
**************************************************************************/

const ContentContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: ${Colors.secondary};
  color: ${Colors.text};
  padding: 2vw;
  border-radius: 2.5vw;
  margin: 2.5vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  box-shadow: 2px 2px 5px ${Colors.accentLight};
`;

export default ContentContainer;
