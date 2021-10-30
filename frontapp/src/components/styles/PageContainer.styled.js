import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 10px 0;
  }

  @media (min-width: 810px) {
    width: 60%;
  }
`;

export default PageContainer;
