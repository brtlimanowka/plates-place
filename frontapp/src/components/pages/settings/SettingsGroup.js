import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
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
  background-color: ${(props) =>
    props.show && props.theme.colors.backgroundLighter};
  border-radius: ${(props) => props.show && '10px'};
  padding: ${(props) => props.show && '20px 30px'};
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
  const settingsContext = useContext(SettingsContext);
  const [showItems, setShowItems] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const headerClickHandler = () => setShowItems(!showItems);
  const addNewClickHandler = () => setShowNew(true);
  const newItemSubmittedHandler = () => setShowNew(false);
  const newItemCancelHandler = () => setShowNew(false);
  const setHeaderIcon = showItems ? 'fas fa-angle-up' : 'fas fa-angle-down';

  const itemDeleteHandler = (type, id) => {
    let updateType = type.toLowerCase();
    let currentSettings = settingsContext.settings;
    let updatedSettings = currentSettings[updateType].filter(
      (item) => item._id !== id
    );
    let transport = {};
    transport[updateType] = updatedSettings;
    settingsContext.saveSettings(transport);
  };

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
              <SettingsItem
                key={item._id}
                data={item}
                type={props.group}
                deleteItem={itemDeleteHandler}
              />
            ))}
        </ul>
        {(props.group === 'Bars' || props.group === 'Weights') && (
          <NewItemContainer show={showNew}>
            {showNew && (
              <SettingsNewItem
                type={props.group}
                cancelNewItem={newItemCancelHandler}
                submitNewItem={newItemSubmittedHandler}
              />
            )}
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
