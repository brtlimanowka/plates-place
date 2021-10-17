import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  div.property {
    flex-basis: 20%;
    display: inline-flex;
  }
`;

const SettingsItem = (props) => {
  return (
    <Item>
      <div className='property'>{props.data.name}</div>
      <div className='property'>{props.data.weight}</div>
      <div className='property'>
        {props.type === 'Bars' ? props.data.barType : props.data.count}
      </div>
    </Item>
  );
};

export default SettingsItem;
