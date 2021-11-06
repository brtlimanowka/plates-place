import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import Button from '../../styles/Button';
import SectionContainer from '../../styles/SectionContainer.styled';
import SettingsItem from './SettingsItem';
import SettingsNewItem from './SettingsNewItem';
import ResetPasswordForm from '../auth/ResetPasswordForm';

const SettingsContainer = styled(SectionContainer)`
  header:hover {
    background-color: ${(props) => props.theme.colors.buttonPrimaryBackground};
    color: ${(props) => props.theme.colors.buttonFont};
    cursor: pointer;
  }
`;
const HeaderIcon = styled.i`
  padding-top: 3px;
  margin: 0 10px 0 5px;
  color: ${(props) => props.theme.colors.buttonSecondaryBackground};
`;
const ItemsContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  line-height: 24px;
  li {
    list-style: none;
  }
`;
const NewItemContainer = styled.div`
  background-color: ${(props) =>
    props.show && props.theme.colors.backgroundLighter};
  border-radius: ${(props) => props.show && '10px'};
  padding: ${(props) => props.show && '20px 30px'};
  margin-top: 10px;
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 810px) {
    width: 60%;
  }
`;
const AddItemButton = styled(Button)`
  width: 100%;
`;
const Icon = styled.i`
  margin: 0 10px;
  padding-top: 4px;
  &:hover {
    color: ${(props) =>
      props.action === 'edit'
        ? props.theme.colors.buttonPrimaryBackground
        : props.theme.colors.errorBackground};
  }
`;

const SettingsGroup = (props) => {
  const [showItems, setShowItems] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const sortedData = props.data.sort((a, b) => (a.weight > b.weight ? -1 : 1));
  const headerClickHandler = () => setShowItems(!showItems);
  const addNewClickHandler = () => setShowNew(true);
  const newItemSubmittedHandler = () => setShowNew(false);
  const newItemCancelHandler = () => setShowNew(false);
  const setHeaderIcon = showItems ? 'fas fa-angle-up' : 'fas fa-angle-down';

  const renderSettingsItems = (
    <Fragment>
      <ul>
        {sortedData &&
          sortedData.map((item) => (
            <SettingsItem key={item._id} data={item} type={props.group} />
          ))}
      </ul>
      {(props.group === 'Bars' || props.group === 'Weights') && (
        <NewItemContainer show={showNew}>
          {showNew && (
            <SettingsNewItem
              type={props.group}
              data={null}
              cancelNewItem={newItemCancelHandler}
              submitNewItem={newItemSubmittedHandler}
            />
          )}
          {!showNew && (
            <AddItemButton onClick={addNewClickHandler}>
              <Icon className='fas fa-plus'></Icon>Add New
            </AddItemButton>
          )}
        </NewItemContainer>
      )}
    </Fragment>
  );
  const renderSettingsAccount = <ResetPasswordForm />;

  return (
    <SettingsContainer>
      <header onClick={headerClickHandler}>
        <HeaderIcon className={setHeaderIcon}></HeaderIcon>
        {props.group}
      </header>
      <ItemsContainer show={showItems}>
        {props.data ? renderSettingsItems : renderSettingsAccount}
      </ItemsContainer>
    </SettingsContainer>
  );
};

export default SettingsGroup;
