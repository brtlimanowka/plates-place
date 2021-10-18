import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsContainer from '../../styles/SettingsContainer.styled';
import SettingsItem from './SettingsItem';

const HeaderIcon = styled.i`
  padding-top: 3px;
  margin: 0 10px 0 5px;
  color: ${(props) => props.theme.colors.buttonSecondaryBackground};
`;
const ItemsContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  line-height: 24px;
  li {
    list-style: none;
  }
`;
const AddItemButton = styled.button`
  background-color: ${(props) => props.theme.colors.backgroundLighter};
  margin-top: 10px;
  align-self: center;
  width: 100%;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  line-height: 24px;
  letter-spacing: 0.8px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.font};
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.theme.colors.buttonSecondaryBackground};
    color: ${(props) => props.theme.colors.buttonFont};
  }

  @media (min-width: 810px) {
    width: 60%;
  }
`;
const Icon = styled.i`
  margin: 0 10px;
  padding-top: 4px;
  &:hover {
    color: ${(props) =>
      props.action === 'edit'
        ? props.theme.colors.buttonPrimaryBackground
        : props.theme.colors.errorBackground};
  }
`;

const SettingsGroup = (props) => {
  const [showItems, setShowItems] = useState(false);
  const headerClickHandler = () => setShowItems(!showItems);
  const setHeaderIcon = showItems ? 'fas fa-angle-up' : 'fas fa-angle-down';

  return (
    <SettingsContainer>
      <header onClick={headerClickHandler}>
        <HeaderIcon className={setHeaderIcon}></HeaderIcon>
        {props.group}
      </header>
      <ItemsContainer show={showItems}>
        <ul>
          {props.data &&
            props.data.map((item) => (
              <SettingsItem key={item._id} data={item} type={props.group} />
            ))}
        </ul>
        {(props.group === 'Bars' || props.group === 'Weights') && (
          <AddItemButton>
            <Icon className='fas fa-plus'></Icon>Add New
          </AddItemButton>
        )}
      </ItemsContainer>
    </SettingsContainer>
  );
};

export default SettingsGroup;
