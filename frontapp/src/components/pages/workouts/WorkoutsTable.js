import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import WorkoutContext from '../../../store/workout/workoutContext';
import Modal from '../../ui/Modal';
import WorkoutNew from './WorkoutNew';
import SectionContainer from '../../styles/SectionContainer.styled';

const TypeFilter = styled.div`
  display: flex;
`;
const Controls = styled.div`
  display: flex;
  i {
    margin: 0 2px;
    padding: 4px 5px 2px 5px;
    font-size: 0.8rem;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.background};
    background-image: linear-gradient(
      ${(props) => props.theme.colors.backgroundLighter},
      ${(props) => props.theme.colors.background}
    );
    &:hover {
      cursor: pointer;
      background-image: linear-gradient(
        ${(props) => props.theme.colors.background},
        ${(props) => props.theme.colors.backgroundLighter}
      );
    }
  }
`;
const Types = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin-left: 10px;
  li {
    width: 50px;
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.background};
    background-image: linear-gradient(
      ${(props) => props.theme.colors.backgroundLighter},
      ${(props) => props.theme.colors.background}
    );
    text-align: center;
    font-size: 0.8rem;
    text-transform: uppercase;
    &.active {
      background: ${(props) => props.theme.colors.buttonPrimaryBackground};
      color: ${(props) => props.theme.colors.buttonFont};
      font-weight: 700;
      &:hover {
        cursor: default;
        background-image: none;
      }
    }
    &:hover {
      cursor: pointer;
      background-image: linear-gradient(
        ${(props) => props.theme.colors.background},
        ${(props) => props.theme.colors.backgroundLighter}
      );
    }
  }
`;

const WorkoutsTable = () => {
  const workoutContext = useContext(WorkoutContext);
  const types = ['All', 'Push', 'Pull', 'Legs', 'Other'];
  const [active, setActive] = useState(types[0]);
  const [showNewWorkout, setShowNewWorkout] = useState(false);

  const typeClickHandler = (type) => {
    setActive(type);
    if (type === 'All') {
      workoutContext.clearFilter();
    } else {
      workoutContext.filterWorkout(type);
    }
  };
  const newWorkoutClickHandler = () => {
    setShowNewWorkout(true);
  };
  const closeModalHandler = () => {
    setShowNewWorkout(false);
  };

  return (
    <SectionContainer>
      <header style={{ justifyContent: 'space-between' }}>
        <TypeFilter>
          Show:
          <Types>
            {types.map((type) => (
              <li
                key={type}
                className={active === type ? 'active' : ''}
                onClick={() => typeClickHandler(type)}>
                {type}
              </li>
            ))}
          </Types>
        </TypeFilter>
        <Controls>
          <i
            className='fas fa-plus'
            title='New Workout'
            onClick={newWorkoutClickHandler}></i>
          <i className='fas fa-tasks' title='View Options'></i>
        </Controls>
      </header>
      <Modal open={showNewWorkout} closeModal={closeModalHandler}>
        <WorkoutNew />
      </Modal>
    </SectionContainer>
  );
};

export default WorkoutsTable;
