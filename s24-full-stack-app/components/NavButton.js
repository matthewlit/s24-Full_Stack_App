import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

const NavButton = ({children}, onClick) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  background-color: ${Colors.accentDark};
  margin: 0.5vw;
  padding: 0.5vw;
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
`

export default NavButton;
