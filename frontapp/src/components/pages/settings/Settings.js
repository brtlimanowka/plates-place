import React, { useContext } from 'react';
import SettingsContext from '../../../store/settings/settingsContext';
import SettingsGroup from './SettingsGroup';
import CenteredCard from '../../styles/CenteredCard.styled';
import PageContainer from '../../styles/PageContainer.styled';

const Settings = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <CenteredCard>
      <PageContainer>
        <h2>Application Settings</h2>
        <SettingsGroup group='Bars' data={settings.bars} />
        <SettingsGroup group='Weights' data={settings.weights} />
      </PageContainer>
    </CenteredCard>
  );
};

export default Settings;
