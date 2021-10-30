import React from 'react';
import styled from 'styled-components';
import SectionContainer from '../../styles/SectionContainer.styled';

const TypeFilter = styled.div`
  display: flex;
`;
const Types = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin-left: 10px;
  li {
    width: 50px;
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.background};
    background-image: linear-gradient(
      ${(props) => props.theme.colors.backgroundLighter},
      ${(props) => props.theme.colors.background}
    );
    text-align: center;
    font-size: 0.8rem;
    text-transform: uppercase;
    &:hover {
      cursor: pointer;
      background-image: linear-gradient(
        ${(props) => props.theme.colors.background},
        ${(props) => props.theme.colors.backgroundLighter}
      );
    }
  }
`;

const WorokutsTable = () => {
  return (
    <SectionContainer>
      <header>
        <TypeFilter>
          Show:
          <Types>
            <li>All</li>
            <li>Push</li>
            <li>Pull</li>
            <li>Legs</li>
            <li>Other</li>
          </Types>
        </TypeFilter>
      </header>
    </SectionContainer>
  );
};

export default WorokutsTable;
