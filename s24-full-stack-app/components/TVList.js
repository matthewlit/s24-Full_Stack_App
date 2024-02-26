import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useState, useEffect } from "react";
import infoHandler from "@/pages/api/getInfo";
import { database } from "@/library/firebaseConfig";
import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { useStateContext } from "@/context/StateContext";

// Display list of shows or movies
const TVList = ({ data, emptyMessage = "Error", added = false }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [providers, setProviders] = useState([]);
  const { user } = useStateContext();

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  const addToWatchList = (item) => {
    // Add to user's watchList in database
    if (user.uid != null) {
      const docRef = doc(database, "watchLists/", "" + user.uid);
      let fieldToUpdate = null;
      if (item.media_type === "tv") {
        fieldToUpdate = "shows";
      } else if (item.media_type === "movie") {
        fieldToUpdate = "movies";
      }
      updateDoc(docRef, {
        [fieldToUpdate]: arrayUnion(item.id),
      });
    }
  };

  const removeFromWatchList = (item) => {
    // Remove from user's watchList in database
    if (user.uid != null) {
      const docRef = doc(database, "watchLists/", "" + user.uid);
      let fieldToUpdate = null;
      if (item.name) {
        fieldToUpdate = "shows";
      } else if (item.title) {
        fieldToUpdate = "movies";
      }
      updateDoc(docRef, {
        [fieldToUpdate]: arrayRemove(item.id),
      });
      setSelectedItem(null);
      const index = data.indexOf(item);
      data.splice(index, 1);
    }
  };

  useEffect(() => {
    const getProviders = async () => {
      const request =
        "https://api.themoviedb.org/3/" +
        selectedItem.media_type +
        "/" +
        selectedItem.id +
        "/watch/providers";
      const data = await infoHandler(request);
      console.log(data);
      setProviders(data.results);
      console.log(providers);
    };

    if (selectedItem != null) getProviders();
  }, [selectedItem]);

  console.log(data);

  return (
    <Container>
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
            {added === false ? (
              <NavButton onClick={() => addToWatchList(selectedItem)}>
                Add To WatchList
              </NavButton>
            ) : (
              <NavButton onClick={() => removeFromWatchList(selectedItem)}>
                Remove From WatchList
              </NavButton>
            )}
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
