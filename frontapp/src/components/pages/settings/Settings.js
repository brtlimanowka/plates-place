import React, { useContext } from 'react';
import styled from 'styled-components';
import SettingsContext from '../../../store/settings/settingsContext';
import SettingsGroup from './SettingsGroup';
import CenteredCard from '../../styles/CenteredCard.styled';

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin: 10px 0;
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
        <SettingsGroup group='Account' data={null} />
      </Container>
    </CenteredCard>
  );
};

export default Settings;
