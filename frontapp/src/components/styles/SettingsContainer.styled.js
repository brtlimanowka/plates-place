import styled from 'styled-components';

const SettingsContainer = styled.div`
  width: 100%;
  header {
    background-color: ${(props) => props.theme.colors.backgroundLighter};
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    padding: 10px;
    margin: 10px;
    &:hover {
      background-color: ${(props) =>
        props.theme.colors.buttonPrimaryBackground};
      color: ${(props) => props.theme.colors.buttonFont};
      cursor: pointer;
    }
  }
`;

export default SettingsContainer;
