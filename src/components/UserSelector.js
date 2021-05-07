import React from 'react';
import styled from '@emotion/styled';
import { H4 } from '../styles/TextStyles';

const Selector = styled.select`
  width: auto;
  font-size: 24px;
  border: none;
  float: right;
  margin-left: 5px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.5);

  /* option {
    color: black;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  } */
`;

const SelectorLabel = styled.label``;

export const UserSelector = ({ users, handleChange }) => {
  return (
    <SelectorLabel htmlFor='users'>
      <H4 style={{ float: 'left', margin: `-60px 0 0 175px` }}>
        Overview for
        <Selector onChange={handleChange}>
          <option disabled selected value>
            {' '}
            -- select a user --{' '}
          </option>
          {users?.map((user, idx) => (
            <option value={user.cardId} key={idx}>
              {user.firstName + ' ' + user.lastName}
            </option>
          ))}
        </Selector>
      </H4>
    </SelectorLabel>
  );
};
