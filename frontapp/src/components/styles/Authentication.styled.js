import styled from 'styled-components';

const Authentication = styled.main`
  text-align: center;
  padding-top: 25px;
  height: 550px;
  width: 500px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.backgroundLighter};
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.2);
  .form-container {
    margin-top: 35px;
    width: 100%;
    form h3 {
      margin: 0 20px;
      line-height: 28px;
    }
  }
  .form-error,
  .form-success {
    display: flex;
    flex-direction: column;
    button {
      width: 100%;
      border: none;
      padding: 10px;
      margin-top: 10px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      background-color: ${(props) => props.theme.colors.backgroundLighter};
      color: ${(props) => props.theme.colors.font};
      &:hover {
        cursor: pointer;
        background-color: ${(props) =>
          props.theme.colors.buttonSecondaryBackground};
        color: ${(props) => props.theme.colors.buttonFont};
      }
    }
    p {
      padding: 0 20px;
    }
  }
  .form-error p {
    font-size: 24px;
    line-height: 48px;
    background-color: ${(props) => props.theme.colors.errorBackground};
  }
  .form-success p {
    font-size: 22px;
    line-height: 36px;
    color: ${(props) => props.theme.colors.buttonFont};
    background-color: ${(props) => props.theme.colors.buttonPrimaryBackground};
  }
  .form-error_forbidden {
    font-size: 18px !important;
  }
  .form-label {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    line-height: 25px;
    font-weight: 700;
    margin-bottom: 0.5rem;
    label {
      margin-left: 22px;
    }
    span {
      min-width: 200px;
      border-radius: 4px 0 0 4px;
      background-color: ${(props) => props.theme.colors.errorBackground};
    }
  }
  .form-group input {
    font: inherit;
    border-radius: 4px;
    border: none;
    width: 90%;
    background-color: ${(props) => props.theme.colors.font};
    color: ${(props) => props.theme.colors.background};
    text-align: left;
    padding: 0.25rem;
  }
  .form-actions {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 92%;
      border-radius: 4px;
      border: none;
      background-color: ${(props) =>
        props.theme.colors.buttonPrimaryBackground};
      color: ${(props) => props.theme.colors.buttonFont};
      padding: 10px;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      &[type='button'] {
        background-color: ${(props) => props.theme.colors.backgroundLighter};
        color: ${(props) => props.theme.colors.font};
      }
      &:hover {
        cursor: pointer;
        background-color: ${(props) =>
          props.theme.colors.buttonSecondaryBackground};
        color: ${(props) => props.theme.colors.buttonFont};
      }
    }
  }
  .form-invalid {
    cursor: not-allowed !important;
    background-color: ${(props) => props.theme.colors.disabled} !important;
  }

  @media (min-width: 810px) {
    .form-label span {
      min-width: 350px;
    }
  }
`;

export default Authentication;
