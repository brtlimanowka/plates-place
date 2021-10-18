import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../styles/Button';
import SettingsContainer from '../../styles/SettingsContainer.styled';
import SettingsItem from './SettingsItem';
import SettingsNewItem from './SettingsNewItem';

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
const NewItemContainer = styled.div`
  margin-top: 10px;
  align-self: center;
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: 810px) {
    width: 60%;
  }
`;
const AddItemButton = styled(Button)`
  width: 100%;
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
  const [showNew, setShowNew] = useState(false);
  const headerClickHandler = () => setShowItems(!showItems);
  const addNewClickHandler = () => setShowNew(!showNew);
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
          <NewItemContainer>
            {showNew && <SettingsNewItem type={props.group} />}
            {!showNew && (
              <AddItemButton onClick={addNewClickHandler}>
                <Icon className='fas fa-plus'></Icon>Add New
              </AddItemButton>
            )}
          </NewItemContainer>
        )}
      </ItemsContainer>
    </SettingsContainer>
  );
};

export default SettingsGroup;
