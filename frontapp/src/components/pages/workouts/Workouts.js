import React from 'react';
import WorokutsTable from './WorokutsTable';
import CenteredCard from '../../styles/CenteredCard.styled';
import PageContainer from '../../styles/PageContainer.styled';

const Workouts = () => {
  return (
    <CenteredCard>
      <PageContainer>
        <h2>Workouts</h2>
        <WorokutsTable />
      </PageContainer>
    </CenteredCard>
  );
};

export default Workouts;
