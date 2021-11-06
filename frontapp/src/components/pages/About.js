import React from 'react';
import styled from 'styled-components';
import statue from '../../assets/statue.png';

const Container = styled.div`
  position: relative;
  height: calc(100vh - 66px);
  display: flex;
  justify-content: center;
  align-items: center;

  background: repeating-linear-gradient(
    10deg,
    ${(props) => props.theme.colors.spinner} 20%,
    ${(props) => props.theme.colors.errorBackground} 21%
  );
`;
const Icon = styled.i`
  filter: blur(3px);
  position: absolute;
  top: 27%;
  left: 29%;
  font-size: 32rem;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2),
    0 0 50px ${(props) => props.theme.colors.buttonSecondaryBackground},
    0 0 170px ${(props) => props.theme.colors.buttonPrimaryBackground};
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
const Image = styled.img`
  margin-left: 12rem;
  filter: grayscale(10%) invert(100%);
  z-index: 2;
`;
const TitleEN = styled.div`
  position: absolute;
  text-transform: lowercase;
  color: rgba(0, 0, 0, 1);
  font-size: 12rem;
  line-height: 24rem;
  z-index: 2;
  font-family: 'GULDENZ', sans-serif;
  border-left: 1px solid rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  letter-spacing: 0.32em;
  span:first-of-type {
    position: absolute;
    top: -15%;
  }
  span:last-of-type {
    padding-left: 10rem;
  }
`;
const TitleJP = styled.div`
  position: absolute;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-family: 'Rampart One', cursive;
  line-height: 9rem;
  font-size: 9rem;
  z-index: 3;
  top: 17%;
  right: 33%;
  color: ${(props) => props.theme.colors.spinner};
  text-shadow: 3px 2px 0
      ${(props) => props.theme.colors.buttonPrimaryBackground},
    -6px -4px 0 rgba(255, 0, 0, 0.3),
    0 0 10px ${(props) => props.theme.colors.spinner},
    20px 2px 10px rgba(0, 0, 0, 0.22);
`;

const About = () => {
  return (
    <Container>
      <Image src={statue} alt='Statue' />
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

export default About;
