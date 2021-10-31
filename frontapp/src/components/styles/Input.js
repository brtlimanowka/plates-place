import styled from 'styled-components';

const Input = styled.input`
  border-radius: 2px;
  padding: 0 2px;
  line-height: 20px;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.colors.font};
  color: ${(props) => props.theme.colors.background};
`;

export default Input;
