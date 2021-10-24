import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log(formData);
    if (formData) {
      const hasName = !!formData.name;
      const hasWeight = !!formData.weight && formData.weight > 0;
      const hasType = !!formData.type;
      const hasCount = !!formData.count && formData.count > 0;

      setIsFormValid(hasName && hasWeight && (hasType || hasCount));
    }
  }, [formData]);

  const nameChangeHandler = (event) => {
    let name = event.target.value;
    if (name.length > 20) {
      name = name.substring(0, 19);
    }
    setFormData({ ...formData, name });
  };
  const weightChangeHandler = (event) => {
    let weight = +event.target.value;
    setFormData({ ...formData, weight });
  };
  const thirdPropertyChangeHandler = (event) => {
    if (props.type === 'Bars') {
      const type = event.target.value;
      setFormData({ ...formData, type });
    }
  };
  const confirmHoverHandler = (event) => {
    event.preventDefault();
    // check isFormValid, provide feedback
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
    <select onChange={thirdPropertyChangeHandler} defaultValue=''>
      <option value='' disabled></option>
      <option value='barbell'>Barbell</option>
      <option value='dumbbell'>Dumbbell</option>
      <option value='other'>Other</option>
    </select>
  );
  const renderWeightsCount = (
    <Input
      type='number'
      min='1'
      step='1'
      onChange={thirdPropertyChangeHandler}
    />
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
          <Input
            type='text'
            id='name'
            maxLength='20'
            onChange={nameChangeHandler}
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor='weight'>Weight</Label>
          <Input
            type='number'
            min='0'
            max='50'
            onChange={weightChangeHandler}
          />
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
