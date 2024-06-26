import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useRef } from "react";

/**************************************************************************
  File: SearchBar.js
  Author: Matthew Kelleher
  Description: Search Bar component
**************************************************************************/

const SearchBar = ({ placeholder, onSearch }) => {
  // Ref to search bar contents
  const serachRef = useRef(null);

  // Run when search button is clicked
  function Search() {
    const query = serachRef.current.value;
    onSearch(query);
  }

  return (
    <Container>
      <SearchInput ref={serachRef} type="text" placeholder={placeholder} />
      <SearchButton onClick={Search}>Search</SearchButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  width: 75vw;
  margin-right: 1vw;
`;

const SearchButton = styled.button`
  background-color: ${Colors.accentDark};
  width: fit-content;
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
`;

export default SearchBar;
