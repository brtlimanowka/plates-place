import React, { useContext, useState, useEffect } from 'react';
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
  const [totalWeight, setTotalWeight] = useState({ bar: 0, plates: 0 });
  const [isFormValid, setIsFormValid] = useState(false);
  // const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (formData) {
      const hasName = !!formData.name;
      const hasGroup = !!formData.muscleGroup;
      const hasBar = !!formData.bar;

      setIsFormValid(hasName && hasGroup && hasBar);
    }
  }, [formData]);

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
    setTotalWeight({ ...totalWeight, bar: bar.weight });
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
          <div className='fields-container'>
            <div className='input-group'>
              <label htmlFor='name'>Name</label>
              <Input
                type='text'
                id='name'
                maxLength='20'
                onChange={nameChangeHandler}
              />
            </div>
            <div className='input-group'>
              <label htmlFor='group'>Muscle Groups</label>
              <select id='group' defaultValue='' onChange={groupChangeHandler}>
                <option value='' disabled></option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className='input-group'>
              <label htmlFor='bar'>Bar</label>
              <select id='bar' defaultValue='' onChange={barChangeHandler}>
                <option value='' disabled></option>
                {bars.map((bar) => (
                  <option key={bar._id} value={bar._id}>
                    {bar.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='weight-select'>
            <button>
              <i className='fas fa-keyboard'></i>
              Set total weight
            </button>
            <button>
              <i className='fas fa-mouse'></i>
              Select plates
            </button>
          </div>
          <h3>
            Total workout weight: {totalWeight.bar + totalWeight.plates} kg
          </h3>
          <div className='control-container'>
            <button
              disabled={false}
              onMouseOver={workoutSubmitHandle}
              onMouseLeave={null}
              className={isFormValid ? '' : 'disabled'}>
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
