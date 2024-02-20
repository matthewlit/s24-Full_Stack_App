import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import Link from "next/link";

// Display list of shows or movies
const TVList = ({ data = [], emptyMessage = "Error: No Items" }) => {
  return (
    <Container>
      {data.length === 0 ? (
        <NoItem>{emptyMessage}</NoItem>
      ) : (
        data.map((item) => (
          <Item key={item.id}>
            <Image src={item.image} />
            <Title>{item.title}</Title>
            <NavButton>More Info</NavButton>
          </Item>
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${Colors.secondary};
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2.5vw;
`;

const Image = styled.img`
  width: 7.5vw;
  border-radius: 5vw;
`;

const Title = styled.h3`
  margin-top: 1vw;
  margin-bottom: 1vw;
  font-size: 1vw;
  font-weight: bold;
`;

const NoItem = styled.h2`
  display: flex;
  text-align: center;
  width: 100%;
  align-items: center;
  margin: 2.5vw;
  justify-content: center;
`;

const NavButton = styled.button`
  background-color: ${Colors.accentDark};
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  color: ${Colors.text};
  width: fit-content;
  padding: 0.5vw;
  height: 2vw;
  text-align: center;
  border: none;
  font-size: 1vw;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover {
    background-color: ${Colors.accentLight};
  }
`;

export default TVList;
