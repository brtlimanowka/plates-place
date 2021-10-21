import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../styles/Button';
import ButtonIcon from '../../styles/ButtonIcon';

const Input = styled.input`
  border-radius: 2px;
  padding: 0 2px;
  line-height: 20px;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.colors.font};
  color: ${(props) => props.theme.colors.background};
`;
const InputContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 810px) {
    flex-direction: row;
  }
`;
const InputGroup = styled.div`
  box-sizing: border-box;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  &.required {
    color: ${(props) => props.theme.colors.errorBackground};
  }
`;
const Label = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 5px 0;

  @media (min-width: 810px) {
    margin: 0 0 5px 0;
  }
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

  const confirmHoverHandler = (event) => {
    event.preventDefault();
  };
  const cancelHandler = (event) => {
    event.preventDefault();
    props.cancelNewItem();
  };

  const thirdProperty =
    props.type === 'Bars'
      ? { for: 'type', label: 'Type' }
      : { for: 'count', label: 'Count' };
  const renderBarTypes = (
    <select ref={refThirdField}>
      <option value='barbell'>Barbell</option>
      <option value='dumbbell'>Dumbbell</option>
      <option value='other'>Other</option>
    </select>
  );
  const renderWeightsCount = (
    <Input ref={refThirdField} type='number' min='1' step='1' />
  );

  return (
    <form>
      <InputContainer>
        <InputGroup>
          <Label htmlFor='name'>
            Name
            {/* <ButtonIcon
              className='fas fa-exclamation-triangle'
              title='Required'></ButtonIcon> */}
          </Label>
          <Input ref={refFirstField} type='text' id='name' />
        </InputGroup>
        <InputGroup>
          <Label htmlFor='weight'>Weight</Label>
          <Input ref={refSecondField} type='number' min='0' />
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
        <ControlButton onClick={cancelHandler}>
          <ButtonIcon className='fas fa-times-circle'></ButtonIcon>
          Cancel
        </ControlButton>
      </ControlContainer>
    </form>
  );
};

export default SettingsNewItem;
