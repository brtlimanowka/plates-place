import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../styles/Button';
import ButtonIcon from '../../styles/ButtonIcon';

const defaultInput = styled.input`
  border: none;
  outline: none;
`;
const InputContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
`;
const InputGroup = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-size: 14px;
`;
const TextInput = styled(defaultInput)``;
const NumberInput = styled(defaultInput)``;
const SelectInput = styled.select`
  border: none;
  outline: none;
`;
const ControlContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ControlButton = styled(Button)`
  flex-basis: 40%;
  &.disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.theme.colors.disabled};
    &:hover {
      color: ${(props) => props.theme.colors.font};
    }
  }
`;

const SettingsNewItem = (props) => {
  const [formData, setFormData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const refFirstField = useRef(null);
  const refSecondField = useRef(null);
  const refThirdField = useRef(null);

  const confirmHoverHandler = () => {
    console.log(refFirstField.current.value);
  };

  const thirdProperty =
    props.type === 'Bars'
      ? { for: 'type', label: 'Type' }
      : { for: 'count', label: 'Count' };
  const renderBarTypes = (
    <SelectInput ref={refThirdField}>
      <option value='barbell'>Barbell</option>
      <option value='dumbbell'>Dumbbell</option>
      <option value='other'>Other</option>
    </SelectInput>
  );
  const renderWeightsCount = (
    <NumberInput ref={refThirdField} type='number' min='1' step='1' />
  );

  return (
    <form>
      <InputContainer>
        <InputGroup>
          <Label htmlFor='name'>Name</Label>
          <TextInput ref={refFirstField} type='text' id='name' />
        </InputGroup>
        <InputGroup>
          <Label htmlFor='weight'>Weight</Label>
          <NumberInput ref={refSecondField} type='number' min='0' />
        </InputGroup>
        <InputGroup>
          <Label htmlFor={thirdProperty.for}>{thirdProperty.label}</Label>
          {props.type === 'Bars' ? renderBarTypes : renderWeightsCount}
        </InputGroup>
      </InputContainer>
      <ControlContainer>
        <ControlButton
          disabled={!isFormValid}
          onMouseOver={confirmHoverHandler}
          className={isFormValid ? '' : 'disabled'}>
          <ButtonIcon className='fas fa-check-circle'></ButtonIcon>
          Confirm
        </ControlButton>
        <ControlButton>
          <ButtonIcon className='fas fa-times-circle'></ButtonIcon>Cancel
        </ControlButton>
      </ControlContainer>
    </form>
  );
};

export default SettingsNewItem;
