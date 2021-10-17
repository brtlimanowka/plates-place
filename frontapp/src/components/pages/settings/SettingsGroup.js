import React from 'react';
import SettingsContainer from '../../styles/SettingsContainer.styled';

const SettingsGroup = (props) => {
  return (
    <SettingsContainer>
      <header>{props.group}</header>
      <div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </div>
    </SettingsContainer>
  );
};

export default SettingsGroup;
