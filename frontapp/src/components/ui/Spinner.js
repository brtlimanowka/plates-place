import React from 'react';
import styled from 'styled-components';
import CenteredCard from '../styles/CenteredCard.styled';

const Dot = styled.div`
  background-color: ${(props) => props.theme.colors.spinner};
  height: 20px;
  width: 20px;
  margin: 0 15px;
  border-radius: 20px;
  animation: pulse 1.5s linear infinite;
  animation-delay: ${(props) => props.delay};

  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(100%);
    }
    7% {
      opacity: 0.3;
      transform: scale(75%);
    }
    14% {
      opacity: 0.1;
      transform: scale(50%);
    }
    21% {
      opacity: 0.3;
      transform: scale(75%);
    }
    28% {
      opacity: 1;
      transform: scale(100%);
    }
  }
`;

const Spinner = (props) => {
  return (
    <CenteredCard height={props.height}>
      <Dot delay='0s' />
      <Dot delay='0.3s' />
      <Dot delay='0.6s' />
    </CenteredCard>
  );
};

export default Spinner;
