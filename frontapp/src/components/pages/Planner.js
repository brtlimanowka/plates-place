import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: repeating-linear-gradient(
    10deg,
    ${(props) => props.theme.colors.spinner} 20%,
    ${(props) => props.theme.colors.errorBackground} 21%
  );
  /* background: radial-gradient(
    ${(props) => props.theme.colors.backgroundLighter},
    ${(props) => props.theme.colors.background} 60%
  ); */
`;
const Icon = styled.i`
  filter: blur(3px);
  position: absolute;
  top: 28%;
  left: 35%;
  font-size: 210px;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
    0 0 50px ${(props) => props.theme.colors.buttonSecondaryBackground};
  transform: rotate(-10deg);
  z-index: 1;
  animation: blink 3s linear infinite;
  @keyframes blink {
    0% {
      opacity: 1;
    }
    33% {
      opacity: 1;
    }
    35% {
      opacity: 0.4;
    }
    37% {
      opacity: 1;
    }
    55% {
      opacity: 1;
    }
    56% {
      opacity: 0.8;
    }
    58% {
      opacity: 0.2;
    }
    59% {
      opacity: 0.7;
    }
    60% {
      opacity: 0.2;
    }
    61% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    81% {
      opacity: 0.7;
    }
    84% {
      opacity: 0.7;
    }
    85% {
      opacity: 1;
    }
  }
`;
const TitleEN = styled.div`
  position: absolute;
  text-transform: lowercase;
  color: rgba(0, 0, 0, 0.5);
  font-size: 120px;
  line-height: 140px;
  letter-spacing: 0.1em;
  z-index: 2;
  font-family: 'GULDENZ', sans-serif;
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  letter-spacing: 0.12em;
  span:first-of-type {
    position: absolute;
    top: -15%;
  }
  span:last-of-type {
    padding-left: 140px;
  }
`;
const TitleJP = styled.div`
  position: absolute;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: 'Rampart One', cursive;
  line-height: 90px;
  font-size: 90px;
  z-index: 1;
  top: 7%;
  right: 33%;
  color: ${(props) => props.theme.colors.spinner};
  text-shadow: 3px 2px 0
      ${(props) => props.theme.colors.buttonPrimaryBackground},
    -6px -4px 0 rgba(255, 0, 0, 0.3),
    0 0 10px ${(props) => props.theme.colors.spinner},
    20px 2px 10px rgba(0, 0, 0, 0.22);
`;

const Planner = () => {
  return (
    <Container>
      <Icon className='icon fas fa-dumbbell'></Icon>
      <TitleEN>
        <span>Plates'</span>
        <br />
        <span>Place</span>
      </TitleEN>
      <TitleJP>プレートの場所</TitleJP>
    </Container>
  );
};

export default Planner;
