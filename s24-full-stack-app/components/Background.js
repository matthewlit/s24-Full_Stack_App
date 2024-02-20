import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

const Background = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: ${Colors.backgroundLight};
  margin-left: 12%;
  position: fixed;
  height: 100vh;
  width: 88%;
  overflow: auto;
`;

export default Background;
