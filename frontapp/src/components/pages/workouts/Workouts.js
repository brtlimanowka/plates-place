import React from 'react';
import WorkoutsTable from './WorkoutsTable';
import CenteredCard from '../../styles/CenteredCard.styled';
import PageContainer from '../../styles/PageContainer.styled';

const Workouts = () => {
  return (
    <CenteredCard>
      <PageContainer>
        <h2>Workouts</h2>
        <WorkoutsTable />
      </PageContainer>
    </CenteredCard>
  );
};

export default Workouts;
