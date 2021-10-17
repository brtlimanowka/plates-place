import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsContainer from '../../styles/SettingsContainer.styled';

const ItemsContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin: 10px;
  padding: 10px;
  line-height: 24px;
  li {
    list-style: none;
  }
`;

const SettingsGroup = (props) => {
  const [showItems, setShowItems] = useState(false);

  const headerClickHandler = () => setShowItems(!showItems);

  return (
    <SettingsContainer>
      <header onClick={headerClickHandler}>{props.group}</header>
      <ItemsContainer show={showItems}>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </ItemsContainer>
    </SettingsContainer>
  );
};

export default SettingsGroup;
