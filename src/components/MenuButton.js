import React from 'react';
import styled from '@emotion/styled';

const MenuItem = styled.div`
  color: ${(props) => (props.active ? 'white' : 'black')};
  align-items: center;
  padding: 10px;
  transition: 0.5s ease-out;
  cursor: pointer;
  border-radius: 10px;
  background: ${(props) => (props.active ? `rgba(50, 50, 50, 0.4)` : `none`)};
  :hover {
    color: white;
    background: rgba(50, 50, 50, 0.4);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;

export const MenuButton = (props) => {
  const { title, active, onClick } = props;
  return (
    <MenuItem title={title} active={active} onClick={onClick}>
      {title}
    </MenuItem>
  );
};
