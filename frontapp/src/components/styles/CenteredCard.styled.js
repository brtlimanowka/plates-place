import styled from 'styled-components';

const CenteredCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height};
`;

export default CenteredCard;
