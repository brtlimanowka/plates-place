import styled from 'styled-components';

const Authentication = styled.main`
  text-align: center;
  padding-top: 25px;
  height: 550px;
  width: 500px;
  border-radius: 25px;
  background-color: #333;
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
      background-color: #333;
      color: #ddd;
      &:hover {
        cursor: pointer;
        background-color: #b3ecff;
        color: #242527;
      }
    }
    p {
      padding: 0 20px;
    }
  }
  .form-error p {
    font-size: 24px;
    line-height: 48px;
    background-color: #df4e00;
  }
  .form-success p {
    font-size: 22px;
    line-height: 36px;
    color: #242527;
    background-color: #66d9ff;
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
      background-color: #df4e00;
    }
  }
  .form-group input {
    font: inherit;
    border-radius: 4px;
    border: none;
    width: 90%;
    background-color: #ddd;
    color: #222;
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
      background-color: #66d9ff;
      color: #242527;
      padding: 10px;
      margin-bottom: 10px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      &[type='button'] {
        background-color: #333;
        color: #ddd;
      }
      &:hover {
        cursor: pointer;
        background-color: #b3ecff;
        color: #242527;
      }
    }
  }
  .form-invalid {
    cursor: not-allowed !important;
    background-color: #bbb !important;
  }

  @media (min-width: 810px) {
    .form-label span {
      min-width: 350px;
    }
  }
`;

export default Authentication;
