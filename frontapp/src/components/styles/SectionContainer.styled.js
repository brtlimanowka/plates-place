import styled from 'styled-components';

const SectionContainer = styled.div`
  width: 100%;
  header {
    background-color: ${(props) => props.theme.colors.backgroundLighter};
    display: flex;
    border-radius: 10px;
    font-size: 1.8rem;
    padding: 10px;
    margin: 10px;
  }
`;

export default SectionContainer;
