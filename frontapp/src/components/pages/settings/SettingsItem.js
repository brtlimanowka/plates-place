import React, { useContext } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
import ButtonIcon from '../../styles/ButtonIcon';

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundLighter};
  }

  @media (min-width: 810px) {
    flex-direction: row;
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
    color: ${(props) =>
      props.action === 'edit'
        ? props.theme.colors.buttonPrimaryBackground
        : props.theme.colors.errorBackground};
  }
`;

const SettingsItem = (props) => {
  const settingsContext = useContext(SettingsContext);

  const itemDeleteHandler = () => {
    let updateType = props.type.toLowerCase();
    let clonedSettings = { ...settingsContext.settings };
    clonedSettings[updateType] = clonedSettings[updateType].filter(
      (item) => item._id !== props.data._id
    );
    settingsContext.saveSettings(clonedSettings);
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

  return (
    <Item>
      <Column>{props.data.name}</Column>
      <Column>
        <label>Weight:</label>
        {props.data.weight} kg
      </Column>
      {props.type === 'Bars' ? renderBarType : renderWeightCount}
      <Column>
        <Icon action='edit' className='fas fa-wrench' title='Edit'></Icon>
        <Icon
          action='delete'
          className='fas fa-times'
          title='Delete'
          onClick={itemDeleteHandler}></Icon>
      </Column>
    </Item>
  );
};

export default SettingsItem;
