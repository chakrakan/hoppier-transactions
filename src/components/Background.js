import React from 'react';
import styled from '@emotion/styled';
import WaveImg from '../assets/wave.svg';
import WaveImg2 from '../assets/wave2.svg';
import WaveImg3 from '../assets/wave5.svg';

export const Background = () => {
  return (
    <Wrapper>
      <Wave src={WaveImg} style={{ top: '250px' }} />
      <Wave src={WaveImg2} style={{ top: '350px' }} />
      <Wave src={WaveImg3} style={{ top: '400px' }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const Wave = styled.img`
  position: absolute;
  z-index: -1;
  @media (min-width: 1440px) {
    width: 100%;
  }
`;
