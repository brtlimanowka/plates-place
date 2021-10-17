import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  padding-left: 10px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundLighter};
  }
`;
const Column = styled.div`
  &:first-of-type {
    flex-basis: 25%;
  }
  &:last-of-type {
    flex-basis: 45%;
    justify-content: flex-end;
  }
  flex-basis: 15%;
  display: flex;
  label {
    margin-right: 10px;
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

const SettingsItem = (props) => {
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
        <Icon action='delete' className='fas fa-times' title='Delete'></Icon>
      </Column>
    </Item>
  );
};

export default SettingsItem;
