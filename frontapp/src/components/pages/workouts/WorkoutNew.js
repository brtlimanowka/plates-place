import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import WorkoutContext from '../../../store/workout/workoutContext';
import SettingsContext from '../../../store/settings/settingsContext';
import NewWorkoutContainer from '../../styles/NewWorkout.styled';
import CenteredCard from '../../styles/CenteredCard.styled';
import ButtonIcon from '../../styles/ButtonIcon';
import Input from '../../styles/Input';

const WorkoutNew = (props) => {
  // const workoutContext = useContext(WorkoutContext);
  const { settings } = useContext(SettingsContext);
  const [formData, setFormData] = useState(null);
  const [selectedPlates, setSelectedPlates] = useState(null);
  // const [isFormValid, setIsFormValid] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);

  const groups = ['Push', 'Pull', 'Legs', 'Other'];
  const bars = settings.bars.sort((a, b) => (a.weight > b.weight ? -1 : 1));
  const weights = settings.weights.sort((a, b) =>
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
      <NewWorkoutContainer>
        <header>
          <h2>New Workout</h2>
          <i
            className='fas fa-times-circle'
            title='Close'
            onClick={() => props.closeModal()}></i>
        </header>
        <form onSubmit={workoutSubmitHandle}>
          <div className='control-container'>
            <button
              disabled={false}
              onMouseOver={workoutSubmitHandle}
              onMouseLeave={null}
              className={false ? '' : 'disabled'}>
              <ButtonIcon className='fas fa-check-circle'></ButtonIcon>
              Confirm
            </button>
            <button onClick={() => props.closeModal()}>
              <ButtonIcon className='fas fa-times-circle'></ButtonIcon>
              Cancel
            </button>
          </div>
        </form>
      </NewWorkoutContainer>
    </CenteredCard>
  );
};

export default WorkoutNew;
