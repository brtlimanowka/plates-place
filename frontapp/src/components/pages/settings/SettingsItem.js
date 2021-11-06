import React, { useState, useContext, Fragment } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
import SettingsNewItem from './SettingsNewItem';
import ButtonIcon from '../../styles/ButtonIcon';

const Item = styled.li`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  border-radius: 5px;
  &.deleted {
    display: none;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundLighter};
  }

  @media (min-width: 810px) {
    flex-direction: row;
  }
`;
const EditItemContainer = styled.div`
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 810px) {
    width: 60%;
  }
`;
const Column = styled.div`
  &:first-of-type {
    flex-basis: 25%;
  }
  &:nth-of-type(2),
  &:nth-of-type(3) {
    margin-left: 10px;
  }
  &:last-of-type {
    flex-basis: 45%;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
  flex-basis: 15%;
  display: flex;
  label {
    margin-right: 10px;
  }

  @media (min-width: 810px) {
    &:nth-of-type(2),
    &:nth-of-type(3) {
      margin-left: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;
const Icon = styled(ButtonIcon)`
  &:hover {
    cursor: pointer;
    color: ${(props) =>
      props.action === 'edit'
        ? props.theme.colors.buttonPrimaryBackground
        : props.theme.colors.errorBackground};
  }
`;

const SettingsItem = (props) => {
  const settingsContext = useContext(SettingsContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const enterEditModeHandler = () => setIsEditMode(true);
  const editItemCancelHandler = () => setIsEditMode(false);
  const itemEditedHandler = () => setIsEditMode(false);
  const itemDeleteHandler = () => {
    let updateType = props.type.toLowerCase();
    let clonedSettings = { ...settingsContext.settings };
    clonedSettings[updateType] = clonedSettings[updateType].filter(
      (item) => item._id !== props.data._id
    );
    settingsContext.saveSettings(clonedSettings);
    setIsDeleted(true);
  };

  const renderBarType = (
    <Column>
      <label>Type:</label> {props.data.barType}
    </Column>
  );
  const renderWeightCount = (
    <Column>
      <label>Count:</label> {props.data.count}
    </Column>
  );
  const renderDisplay = (
    <Fragment>
      <Column>{props.data.name}</Column>
      <Column>
        <label>Weight:</label>
        {props.data.weight} kg
      </Column>
      {props.type === 'Bars' ? renderBarType : renderWeightCount}
      <Column>
        {props.data?.weight !== 0 && (
          <Fragment>
            <Icon
              action='edit'
              className='fas fa-wrench'
              title='Edit'
              onClick={enterEditModeHandler}></Icon>

            <Icon
              action='delete'
              className='fas fa-times'
              title='Delete'
              onClick={itemDeleteHandler}></Icon>
          </Fragment>
        )}
      </Column>
    </Fragment>
  );
  const renderEdit = (
    <EditItemContainer>
      <SettingsNewItem
        type={props.type}
        data={props.data}
        cancelNewItem={editItemCancelHandler}
        submitNewItem={itemEditedHandler}
      />
    </EditItemContainer>
  );

  return (
    <Item className={isDeleted ? 'deleted' : ''}>
      {isEditMode ? renderEdit : renderDisplay}
    </Item>
  );
};

export default SettingsItem;
