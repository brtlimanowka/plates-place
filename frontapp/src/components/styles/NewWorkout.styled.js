import styled from 'styled-components';

const NewWorkoutContainer = styled.div`
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.9);
  background-color: ${(props) => props.theme.colors.background};
  width: 60%;
  padding: 20px;
  border-radius: 10px;
  h2 {
    font-size: 1.8rem;
  }
  header {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 30px;
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
  button {
    margin-top: 20px;
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
  div.fields-container {
    display: flex;
    justify-content: space-between;
  }
  div.weight-select {
    margin-bottom: 20px;
    font-size: 1.6rem;
    min-height: 10rem;
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    div.plates-list {
      width: 100%;
      h3 {
        font-size: 1.6rem;
        text-align: center;
        margin-bottom: 10px;
      }
      ul {
        list-style: none;
        li {
          margin: 5px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          label {
            text-align: right;
            flex-basis: 15%;
            margin-right: 20px;
          }
        }
      }
    }
    button {
      flex-basis: 35%;
      &.disabled {
        i {
          color: ${(props) => props.theme.colors.font};
        }
      }
      i {
        display: block;
        font-size: 2rem;
        color: ${(props) => props.theme.colors.buttonPrimaryBackground};
      }
    }
  }
  div.input-group {
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label {
      display: flex;
      justify-content: space-between;
      font-size: 1.4rem;
      margin: 5px 0;

      @media (min-width: 810px) {
        margin: 0 0 5px 0;
      }
    }
    &.required {
      color: ${(props) => props.theme.colors.errorBackground};
    }
  }
  div.control-container {
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
  }
`;

export default NewWorkoutContainer;
