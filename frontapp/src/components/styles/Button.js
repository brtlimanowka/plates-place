import styled from 'styled-components';

const Button = styled.button`
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
`;

export default Button;
