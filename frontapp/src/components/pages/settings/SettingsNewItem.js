import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
import Button from '../../styles/Button';
import ButtonIcon from '../../styles/ButtonIcon';
import Input from '../../styles/Input';

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
  font-size: 1.4rem;
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
  const settingsContext = useContext(SettingsContext);
  const [formParent, setFormParent] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setFormParent(props.type.toLowerCase());
    if (props.data) {
      setFormData({ ...props.data });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (formData) {
      const hasName = !!formData.name;
      const hasWeight = !!formData.weight && formData.weight > 0;
      const hasType = !!formData.barType;
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
      let barType = event.target.value;
      setFormData({ ...formData, barType });
    }
    if (props.type === 'Weights') {
      let count = +event.target.value;
      setFormData({ ...formData, count });
    }
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    let transportObject = {};
    transportObject[formParent] = formData;
    let clonedSettings = { ...settingsContext.settings };

    if (props.data) {
      let editedObjectIndex = clonedSettings[formParent].findIndex(
        (item) => item._id === props.data._id
      );
      clonedSettings[formParent][editedObjectIndex] = formData;
    } else {
      clonedSettings[formParent] = [
        ...clonedSettings[formParent],
        transportObject[formParent],
      ];
    }

    settingsContext.saveSettings(clonedSettings);
    props.submitNewItem();
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
    <select
      onChange={thirdPropertyChangeHandler}
      defaultValue={props.data ? props.data.barType : ''}>
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
      defaultValue={props.data ? props.data.count : ''}
    />
  );

  const showNameFeedback = showFeedback && (!formData || !formData.name);
  const showWeightFeedback = showFeedback && (!formData || !formData.weight);
  const showThirdPropertyFeedback =
    showFeedback &&
    (!formData ||
      (props.type === 'Bars' ? !formData.barType : !formData.count));

  const renderFeedbackIcon = (
    <ButtonIcon
      className='fas fa-exclamation-triangle'
      title='Required'></ButtonIcon>
  );

  return (
    <form onSubmit={formSubmitHandler}>
      <InputContainer>
        <InputGroup className={showNameFeedback ? 'required' : ''}>
          <Label htmlFor='name'>
            Name
            {showNameFeedback && renderFeedbackIcon}
          </Label>
          <Input
            type='text'
            id='name'
            maxLength='20'
            onChange={nameChangeHandler}
            defaultValue={props.data ? props.data.name : ''}
            autoFocus
          />
        </InputGroup>
        <InputGroup className={showWeightFeedback ? 'required' : ''}>
          <Label htmlFor='weight'>
            Weight
            {showWeightFeedback && renderFeedbackIcon}
          </Label>
          <Input
            type='number'
            min='0.5'
            step='0.5'
            max='50'
            onChange={weightChangeHandler}
            defaultValue={props.data ? props.data.weight : ''}
          />
        </InputGroup>
        <InputGroup className={showThirdPropertyFeedback ? 'required' : ''}>
          <Label htmlFor={thirdProperty.for}>
            {thirdProperty.label}
            {showThirdPropertyFeedback && renderFeedbackIcon}
          </Label>
          {props.type === 'Bars' ? renderBarTypes : renderWeightsCount}
        </InputGroup>
      </InputContainer>
      <ControlContainer>
        <ControlButton
          disabled={!isFormValid}
          onMouseOver={() => setShowFeedback(true)}
          onMouseLeave={() => setShowFeedback(false)}
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
