import React from 'react';
import styled from 'styled-components';
import Colors from '../library/Colors'

const SearchBar = () => {
  return (
    <Container>
      <SearchInput type="text" placeholder="Search Shows and Movies..."/>
      <SearchButton>Search</SearchButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  width: 75vw;
  margin-right: 1vw;
`

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
  &:hover{
    background-color: ${Colors.accentLight};
  }
`

export default SearchBar;