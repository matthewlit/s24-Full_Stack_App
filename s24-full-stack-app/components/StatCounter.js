import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: StatCounter.js
  Author: Matthew Kelleher
  Description: State counter component to display given stat
**************************************************************************/

const StatCounter = ({ value, label }) => {
  return (
    <StatContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </StatContainer>
  );
};

const StatContainer = styled.div`
  background-color: ${Colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  padding: 1.5vw;
  border-radius: 10px;
  margin: 1vw;
  color: ${Colors.text};
`;

const Label = styled.h2`
  font-size: 2vw;
  font-weight: bold;
`;

const Value = styled.p`
  font-size: 2vw;
`;

export default StatCounter;
