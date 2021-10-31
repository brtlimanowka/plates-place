import React, { useContext } from 'react';
import styled from 'styled-components';
import WorkoutContext from '../../../store/workout/workoutContext';
import SettingsContext from '../../../store/settings/settingsContext';
import CenteredCard from '../../styles/CenteredCard.styled';
import Input from '../../styles/Input';

const Container = styled.div`
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
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
`;
const InputGroup = styled.div`
  display: flex;
  label {
    min-width: 150px;
    flex-basis: 10%;
  }
  margin: 7px 0;
`;
const WideInput = styled(Input)`
  width: 100%;
`;
const Menu = styled.select`
  width: 100%;
`;

const WorkoutNew = () => {
  const workoutContext = useContext(WorkoutContext);
  const settingsContext = useContext(SettingsContext);

  const bars = settingsContext.settings.bars;

  const workoutSubmitHandle = (event) => {
    event.preventDefault();
  };

  return (
    <CenteredCard>
      <Container>
        <header>
          <h3>New Workout</h3>
          <i className='fas fa-times-circle' title='Close'></i>
        </header>
        <form onSubmit={workoutSubmitHandle}>
          <InputGroup>
            <label htmlFor='name'>Name</label>
            <WideInput type='text' id='name' maxLength='20' autoFocus />
          </InputGroup>
          <InputGroup>
            <label htmlFor='group'>Group</label>
            <Menu id='group' defaultValue=''>
              <option value='' disabled></option>
              <option value='push'>Push</option>
              <option value='pull'>Pull</option>
              <option value='legs'>Legs</option>
              <option value='other'>Other</option>
            </Menu>
          </InputGroup>
          <InputGroup>
            <label htmlFor='bar'>Bar</label>
            <Menu id='bar' defaultValue=''>
              <option value='' disabled></option>
              {bars.map((bar) => (
                <option key={bar._id} value={bar}>
                  {`${bar.name} (${bar.weight} kg)`}
                </option>
              ))}
            </Menu>
          </InputGroup>
          <InputGroup>
            <label htmlFor='weights'>Weights</label>
            <WideInput
              type='number'
              min='0'
              id='weights'
              placeholder='Total plate weight'
            />
          </InputGroup>
        </form>
      </Container>
    </CenteredCard>
  );
};

export default WorkoutNew;
