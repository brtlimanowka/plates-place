import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import WorkoutContext from '../../../store/workout/workoutContext';
import SettingsContext from '../../../store/settings/settingsContext';
import CenteredCard from '../../styles/CenteredCard.styled';
import Button from '../../styles/Button';
import ButtonIcon from '../../styles/ButtonIcon';
import Input from '../../styles/Input';

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

const Container = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  background-color: ${(props) => props.theme.colors.background};
  min-width: 350px;
  padding: 20px;
  border-radius: 10px;
  header {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    i {
      padding-top: 4px;
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.errorBackground};
      }
    }
  }
`;
const InputGroup = styled.div`
  display: flex;
  margin: 7px 0;
  label {
    min-width: 150px;
    flex-basis: 30%;
  }
`;
const WideInput = styled(Input)`
  width: 100%;
`;
const Menu = styled.select`
  width: 100%;
`;

const WorkoutNew = (props) => {
  // const workoutContext = useContext(WorkoutContext);
  const settingsContext = useContext(SettingsContext);
  const [formData, setFormData] = useState(null);
  const [selectedPlates, setSelectedPlates] = useState(null);
  // const [isFormValid, setIsFormValid] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);

  const groups = ['Push', 'Pull', 'Legs', 'Other'];
  const bars = settingsContext.settings.bars.sort((a, b) =>
    a.weight > b.weight ? -1 : 1
  );
  const weights = settingsContext.settings.weights.sort((a, b) =>
    a.weight > b.weight ? -1 : 1
  );

  const nameChangeHandler = (event) => {
    let name = event.target.value;
    if (name.length > 20) {
      name = name.substring(0, 19);
    }
    setFormData({ ...formData, name });
  };
  const groupChangeHandler = (event) => {
    let muscleGroup = event.target.value;
    setFormData({ ...formData, muscleGroup });
  };
  const barChangeHandler = (event) => {
    let barMatch = bars.find((bar) => bar._id === event.target.value);
    let bar = {
      name: barMatch.name,
      weight: barMatch.weight,
    };
    setFormData({ ...formData, bar });
  };
  const totalWeightChangeHandler = (event) => {
    let desiredWeightPerSide = event.target.value / 2;
    const desiredPlates = {};

    weights.forEach((plate) => {
      desiredPlates[plate._id] = Math.floor(
        desiredWeightPerSide / plate.weight
      );
      desiredWeightPerSide = desiredWeightPerSide % plate.weight;
    });

    setSelectedPlates(desiredPlates);
  };
  const plateChangeHandler = (event) => {};

  const workoutSubmitHandle = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <CenteredCard>
      <Container>
        <header>
          <h2>New Workout</h2>
          <i
            className='fas fa-times-circle'
            title='Close'
            onClick={() => props.closeModal()}></i>
        </header>
        <form onSubmit={workoutSubmitHandle}>
          <InputGroup>
            <label htmlFor='name'>Name</label>
            <WideInput
              type='text'
              id='name'
              maxLength='20'
              onChange={nameChangeHandler}
              autoFocus
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='group'>Group</label>
            <Menu id='group' defaultValue='' onChange={groupChangeHandler}>
              <option value='' disabled></option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </Menu>
          </InputGroup>
          <InputGroup>
            <label htmlFor='bar'>Bar</label>
            <Menu id='bar' defaultValue='' onChange={barChangeHandler}>
              <option value='' disabled></option>
              {bars.map((bar) => (
                <option key={bar._id} value={bar._id}>
                  {`${bar.name} (${bar.weight} kg)`}
                </option>
              ))}
            </Menu>
          </InputGroup>
          <h2 style={{ margin: '10px 0' }}>Plates</h2>
          <InputGroup>
            <label htmlFor='weight'>Total weight:</label>
            <WideInput
              type='number'
              id='weight'
              min='0'
              placeholder='Excluding bar weight'
              onChange={totalWeightChangeHandler}
            />
          </InputGroup>
          <h4 style={{ textAlign: 'center', margin: '10px 0' }}>
            Or select from available plates below <br />
            (per one end of bar)
          </h4>
          {weights.map((weight) => (
            <InputGroup key={weight._id}>
              <label htmlFor={weight._id} style={{ textAlign: 'right' }}>
                {weight.name}
              </label>
              <WideInput
                id={weight._id}
                type='number'
                min='0'
                step='1'
                max={weight.count}
                style={{ marginLeft: '10px' }}
                value={selectedPlates ? selectedPlates[weight._id] : ''}
                onChange={plateChangeHandler}
              />
            </InputGroup>
          ))}
          <h3>Total weight:</h3>
          <ControlContainer>
            <ControlButton
              disabled={false}
              onMouseOver={workoutSubmitHandle}
              onMouseLeave={null}
              className={false ? '' : 'disabled'}>
              <ButtonIcon className='fas fa-check-circle'></ButtonIcon>
              Confirm
            </ControlButton>
            <ControlButton onClick={null}>
              <ButtonIcon className='fas fa-times-circle'></ButtonIcon>
              Cancel
            </ControlButton>
          </ControlContainer>
        </form>
      </Container>
    </CenteredCard>
  );
};

export default WorkoutNew;
