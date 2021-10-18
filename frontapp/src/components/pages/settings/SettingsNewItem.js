import React from 'react';
import styled from 'styled-components';
import Button from '../../styles/Button';
import ButtonIcon from '../../styles/ButtonIcon';

const InputContainer = styled.div``;
const Label = styled.label``;
const TextInput = styled.input``;
const NumberInput = styled.input``;
const SelectInput = styled.select``;
const ControlContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ControlButton = styled(Button)`
  flex-basis: 40%;
`;

const SettingsNewItem = (props) => {
  const thirdProperty =
    props.type === 'Bars'
      ? { for: 'type', label: 'Type' }
      : { for: 'count', label: 'Count' };
  const renderBarTypes = (
    <SelectInput>
      <option value='barbell'>Barbell</option>
      <option value='dumbbell'>Dumbbell</option>
      <option value='other'>Other</option>
    </SelectInput>
  );
  const renderWeightsCount = <NumberInput type='number' min='1' step='1' />;

  return (
    <form>
      <InputContainer>
        <Label htmlFor='name'>Name:</Label>
        <TextInput type='text' id='name' />
        <Label htmlFor='weight'>Weight:</Label>
        <NumberInput type='number' min='0' />
        <Label htmlFor={thirdProperty.for}>{thirdProperty.label}</Label>
        {props.type === 'Bars' ? renderBarTypes : renderWeightsCount}
      </InputContainer>
      <ControlContainer>
        <ControlButton>
          <ButtonIcon className='fas fa-check-circle'></ButtonIcon>Confirm
        </ControlButton>
        <ControlButton>
          <ButtonIcon className='fas fa-times-circle'></ButtonIcon>Cancel
        </ControlButton>
      </ControlContainer>
    </form>
  );
};

export default SettingsNewItem;
