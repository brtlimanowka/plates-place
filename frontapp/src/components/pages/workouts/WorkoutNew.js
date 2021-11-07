import React, { useContext, useState, useEffect, Fragment } from 'react';
// import WorkoutContext from '../../../store/workout/workoutContext';
import SettingsContext from '../../../store/settings/settingsContext';
import NewWorkoutContainer from '../../styles/NewWorkout.styled';
import CenteredCard from '../../styles/CenteredCard.styled';
import ButtonIcon from '../../styles/ButtonIcon';
import Input from '../../styles/Input';

const WorkoutNew = (props) => {
  // const workoutContext = useContext(WorkoutContext);
  const { settings } = useContext(SettingsContext);
  const [formData, setFormData] = useState(null);
  const [weightRenderMode, setWeightRenderMode] = useState('select');
  const [selectedPlates, setSelectedPlates] = useState(null);
  const [totalWeight, setTotalWeight] = useState({ bar: 0, plates: 0 });
  const [isBarNone, setIsBarNone] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

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
  const getTotalAvailableWeight = () => {
    let sum = 0;
    weights.forEach((plate) => (sum += plate.weight * plate.count));
    return sum;
  };

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
    if (!bar.weight) {
      setIsBarNone(true);
      setTotalWeight({ bar: 0, plates: 0 });
    } else {
      setIsBarNone(false);
    }
  };
  const totalWeightChangeHandler = (event) => {
    let inputWeight = +event.target.value;
    let totalAvailable = getTotalAvailableWeight();
    let weight = inputWeight > totalAvailable ? totalAvailable : inputWeight;

    setFormData({ ...formData, totalWeight: weight });
    setTotalWeight({ ...totalWeight, plates: weight });
  };
  const plateChangeHandler = (event) => {
    // let desiredWeightPerSide = event.target.value / 2;
    // const desiredPlates = {};
    // weights.forEach((plate) => {
    //   desiredPlates[plate._id] = Math.floor(
    //     desiredWeightPerSide / plate.weight
    //   );
    //   desiredWeightPerSide = desiredWeightPerSide % plate.weight;
    // });
    // setSelectedPlates(desiredPlates);
  };
  const workoutSubmitHandle = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const showNameFeedback = showFeedback && (!formData || !formData.name);
  const showGroupFeedback =
    showFeedback && (!formData || !formData.muscleGroup);
  const showBarFeedback = showFeedback && (!formData || !formData.bar);
  const renderFeedbackIcon = (
    <ButtonIcon
      className='fas fa-exclamation-triangle'
      title='Required'></ButtonIcon>
  );
  const renderWeightSelect = (
    <Fragment>
      <button
        onClick={() => setWeightRenderMode('manual')}
        disabled={isBarNone}
        className={`${isBarNone ? 'disabled' : ''}`}>
        <i className='fas fa-keyboard'></i>
        Set total weight
      </button>
      <button
        onClick={() => setWeightRenderMode('plates')}
        disabled={isBarNone}
        className={`${isBarNone ? 'disabled' : ''}`}>
        <i className='fas fa-mouse'></i>
        Select plates
      </button>
    </Fragment>
  );
  const renderWeightManual = (
    <div
      className='div-input'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <label>Total desired plate weight (excluding the bar)</label>
      <Input
        style={{ width: '100%', marginTop: '10px' }}
        type='number'
        min='0'
        step='1'
        onChange={totalWeightChangeHandler}
        autoFocus
      />
    </div>
  );
  const renderWeightPlates = (
    <div className='plates-list'>
      <h3>Plate count (per bar side)</h3>
      <ul>
        {weights.map((plate) => (
          <li key={plate._id}>
            <label htmlFor={plate._id}>{plate.name}</label>
            <Input
              type='number'
              min='0'
              max={plate.count}
              step='1'
              defaultValue='0'
              onChange={plateChangeHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
  const renderWeight = () => {
    switch (weightRenderMode) {
      case 'select':
        return renderWeightSelect;
      case 'manual':
        return isBarNone ? renderWeightSelect : renderWeightManual;
      case 'plates':
        return isBarNone ? renderWeightSelect : renderWeightPlates;
      default:
        return null;
    }
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
            <div
              className={
                showNameFeedback ? 'input-group required' : 'input-group'
              }>
              <label htmlFor='name'>
                Name{showNameFeedback && renderFeedbackIcon}
              </label>
              <Input
                type='text'
                id='name'
                maxLength='20'
                onChange={nameChangeHandler}
              />
            </div>
            <div
              className={
                showGroupFeedback ? 'input-group required' : 'input-group'
              }>
              <label htmlFor='group'>
                Muscle Groups{showGroupFeedback && renderFeedbackIcon}
              </label>
              <select id='group' defaultValue='' onChange={groupChangeHandler}>
                <option value='' disabled></option>
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div
              className={
                showBarFeedback ? 'input-group required' : 'input-group'
              }>
              <label htmlFor='bar'>
                Bar{showBarFeedback && renderFeedbackIcon}
              </label>
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
          <div className='weight-select'>{renderWeight()}</div>
          <h2>
            Total workout weight: {totalWeight.bar + totalWeight.plates} kg
          </h2>
          <div className='control-container'>
            <button
              disabled={false}
              onMouseOver={() => setShowFeedback(true)}
              onMouseLeave={() => setShowFeedback(false)}
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
