import React, { useContext } from 'react';
import SettingsContext from '../../../store/settings/settingsContext';
import SettingsGroup from './SettingsGroup';
import CenteredCard from '../../styles/CenteredCard.styled';
import SectionContainer from '../../styles/SectionContainer.styled';

const Settings = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <CenteredCard>
      <SectionContainer>
        <h2>Application Settings</h2>
        <SettingsGroup group='Bars' data={settings.bars} />
        <SettingsGroup group='Weights' data={settings.weights} />
      </SectionContainer>
    </CenteredCard>
  );
};

export default Settings;
