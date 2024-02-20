import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import Link from "next/link";
import { useState } from "react";

// Display list of shows or movies
const TVList = ({ data = [], emptyMessage = "Error: No Items" }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <Container>
      {data.length === 0 ? (
        <NoItem>{emptyMessage}</NoItem>
      ) : (
        data.map((item) => (
          <Item key={item.id}>
            <Image src={item.image} />
            <Title>{item.title}</Title>
            <NavButton onClick={() => openPopup(item)}>More Info</NavButton>
          </Item>
        ))
      )}
      {selectedItem && (
        <Popup>
          <PopupContent>
            <InfoWrapper>
              <Image src={selectedItem.image} />
              <Title>Title:</Title>
                <PopupText>{selectedItem.title}</PopupText>
              <Title>Description:</Title>
                <PopupText>temp{selectedItem.description}</PopupText>
              <Title>Rating:</Title>
                <PopupText>temp{selectedItem.rating}</PopupText>
              <Title>Streaming Platforms:</Title>
                <PopupText>temp{selectedItem.platforms}</PopupText>
            </InfoWrapper>
            <NavButton>Remove From Watched</NavButton>
            <NavButton onClick={closePopup}>Close</NavButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${Colors.secondary};
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2.5vw;
`

const Image = styled.img`
  width: 7.5vw;
  border-radius: 5vw;
`

const Title = styled.h3`
  margin-top: 1vw;
  font-size: 1vw;
  font-weight: bold;
`

const NoItem = styled.h2`
  display: flex;
  text-align: center;
  width: 100%;
  align-items: center;
  margin: 2.5vw;
  justify-content: center;
`

const NavButton = styled.button`
  background-color: ${Colors.accentDark};
  margin: 0.5vw;
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
`

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.secondary};
  padding: 1vw;
  border-radius: 2.5vw;
  align-items: center;
`

const InfoWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 5vw;
`

const PopupText = styled.p`
  font-size: 1vw;
`

export default TVList;
