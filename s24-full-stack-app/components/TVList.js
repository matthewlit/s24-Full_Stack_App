import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useState, useEffect } from "react";
import infoHandler from "@/pages/api/getInfo";
import { database } from "@/library/firebaseConfig";
import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { useStateContext } from "@/context/StateContext";

/**************************************************************************
  File: TVList.js
  Author: Matthew Kelleher
  Description:  List given array of movies or shows with a pop up for more 
                info and option to add or remove from watch list
**************************************************************************/

// Display list of shows or movies
const TVList = ({
  data,
  emptyMessage = "Add To Watch List First!",
  added = false,
}) => {
  // Initialize useState hooks
  const [selectedItem, setSelectedItem] = useState(null);
  const [providers, setProviders] = useState([]);
  const { user } = useStateContext();

  // Open popup when more info is clicked
  const openPopup = (item) => {
    setSelectedItem(item);
  };

  // Close popup when more info is clicked
  const closePopup = () => {
    setSelectedItem(null);
  };

  // Adds selected item to user's watchlist in database
  const addToWatchList = (item) => {
    if (user.uid != null) {
      // Get user's watch list
      const docRef = doc(database, "watchLists/", "" + user.uid);
      let fieldToUpdate = null;
      if (item.name) {
        fieldToUpdate = "shows";
      } else if (item.title) {
        fieldToUpdate = "movies";
      }
      // Add to watched array
      updateDoc(docRef, {
        [fieldToUpdate]: arrayUnion(item.id),
      });
      // Close popup and remove from list
      setSelectedItem(null);
      const index = data.indexOf(item);
      data.splice(index, 1);
    }
  };

  // Removes selected item from user's watchlist in database
  const removeFromWatchList = (item) => {
    if (user.uid != null) {
      // Get user's watch list
      const docRef = doc(database, "watchLists/", "" + user.uid);
      let fieldToUpdate = null;
      if (item.name) {
        fieldToUpdate = "shows";
      } else if (item.title) {
        fieldToUpdate = "movies";
      }
      // Remove from watched array
      updateDoc(docRef, {
        [fieldToUpdate]: arrayRemove(item.id),
      });
      // Close popup and remove from list
      setSelectedItem(null);
      const index = data.indexOf(item);
      data.splice(index, 1);
    }
  };

  // Get streaming providers for selected item from TMDB API
  const getProviders = async () => {
    const request =
      "https://api.themoviedb.org/3/" +
      selectedItem.media_type +
      "/" +
      selectedItem.id +
      "/watch/providers";
    const data = await infoHandler(request);
    setProviders(data.results);
  };

  // Get streaming provider for item when selected
  useEffect(() => {
    if (selectedItem != null) getProviders();
  }, [selectedItem]);

  return (
    <Container>
      {/* Display list of items */}
      {data.length === 0 ? (
        <NoItem>{emptyMessage}</NoItem>
      ) : (
        data.map((item) => (
          <Item key={item.id}>
            <Image src={"http://image.tmdb.org/t/p/w500" + item.poster_path} />
            <NavButton onClick={() => openPopup(item)}>More Info</NavButton>
          </Item>
        ))
      )}
      {/* Display popup for selected item */}
      {selectedItem && (
        <Popup>
          <PopupContent>
            <BackDropImage
              src={
                "http://image.tmdb.org/t/p/w500" + selectedItem.backdrop_path
              }
            />
            <InfoWrapper>
              <Title>Title:</Title>
              <PopupText>
                {selectedItem.title ? selectedItem.title : selectedItem.name}
              </PopupText>
              <Title>Description:</Title>
              <PopupText>{selectedItem.overview}</PopupText>
              <Title>Rating:</Title>
              <PopupText>
                {Math.round(selectedItem.vote_average * 10) / 10 + "/10"}
              </PopupText>
              {providers != undefined &&
              providers.US != undefined &&
              providers.US.flatrate != undefined ? (
                <>
                  <Title>Streaming Platforms:</Title>
                  <LogoWrapper>
                    {providers.US.flatrate.map((item) => (
                      <Logo
                        key={item.provider_id}
                        src={"http://image.tmdb.org/t/p/w500" + item.logo_path}
                      />
                    ))}
                  </LogoWrapper>
                </>
              ) : (
                <></>
              )}
            </InfoWrapper>
            {/* Add or Remove from watch list */}
            {added === false ? (
              <NavButton onClick={() => addToWatchList(selectedItem)}>
                Add To WatchList
              </NavButton>
            ) : (
              <NavButton onClick={() => removeFromWatchList(selectedItem)}>
                Remove From WatchList
              </NavButton>
            )}
            {/* Close popup */}
            <NavButton onClick={closePopup}>Close</NavButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

// Styled components

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${Colors.secondary};
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2.5vw;
`;

const Image = styled.img`
  width: 10vw;
  height: 15vw;
  border-radius: 1vw;
  margin-bottom: 1vw;
  box-shadow: 2px 2px 5px ${Colors.primary};
`;

const Title = styled.h3`
  margin: 1vw;
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
  margin-bottom: 1vw;
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
  overflow: auto;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.secondary};
  padding: 1vw;
  border-radius: 2.5vw;
  align-items: center;
  width: 30%;
  margin-top: 5vw;
  margin-bottom: 1vw;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1vw;
  width: 100%;
  margin-left: 5vw;
  margin-right: 5vw;
`;

const PopupText = styled.p`
  font-size: 1vw;
  margin-left: 2vw;
`;

const BackDropImage = styled.img`
  width: 75%;
  border-radius: 1vw;
  border-style: solid;
  box-shadow: 2px 2px 5px ${Colors.accentLight};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 2vw;
  margin-right: 2vw;
  width: 100%;
  overflow: auto;
`;

const Logo = styled.img`
  width: 2.5vw;
  border-radius: 0.5vw;
  box-shadow: 2px 2px 5px ${Colors.accentLight};
  margin-bottom: 1vw;
  margin-right: 1vw;
`;

export default TVList;
