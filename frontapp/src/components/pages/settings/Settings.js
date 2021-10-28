import React, { useContext } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
import SettingsGroup from './SettingsGroup';
import CenteredCard from '../../styles/CenteredCard.styled';

const Container = styled.div`
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

const Settings = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <CenteredCard>
      <Container>
        <h2>Application Settings</h2>
        <SettingsGroup group='Bars' data={settings.bars} />
        <SettingsGroup group='Weights' data={settings.weights} />
      </Container>
    </CenteredCard>
  );
};

export default Settings;
