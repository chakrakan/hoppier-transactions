import React from 'react';
import styled from '@emotion/styled';

const ToggleWrapper = styled.div`
  height: 100px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 10px 20px -8px #c5d6d6;
  border-radius: 4px;
`;

const Toggle = styled.input``;
const Slider = styled.span``;

export function CurrencyToggle({ currency }) {
  return (
    <ToggleWrapper>
      <Toggle type='checkbox'></Toggle>
      <Slider />
    </ToggleWrapper>
  );
}
