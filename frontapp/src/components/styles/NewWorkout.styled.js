import styled from 'styled-components';

const NewWorkoutContainer = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  background-color: ${(props) => props.theme.colors.background};
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  header {
    font-size: 1.6rem;
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
  div.input-group {
  }
  div.control-container {
    display: flex;
    justify-content: space-evenly;
    button {
      margin-top: 10px;
      border: none;
      border-radius: 3px;
      text-transform: uppercase;
      line-height: 24px;
      letter-spacing: 0.8px;
      font-weight: 700;
      color: ${(props) => props.theme.colors.font};
      background-color: ${(props) => props.theme.colors.backgroundLighter};
      &:hover {
        cursor: pointer;
        background-color: ${(props) =>
          props.theme.colors.buttonSecondaryBackground};
        color: ${(props) => props.theme.colors.buttonFont};
      }
      flex-basis: 40%;
      &.disabled {
        cursor: not-allowed;
        background-color: ${(props) => props.theme.colors.disabled};
        &:hover {
          color: ${(props) => props.theme.colors.font};
        }
      }
    }
  }
`;

export default NewWorkoutContainer;
