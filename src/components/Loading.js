import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const bouncedelay = keyframes`
    0% {
      bottom: 0;
      background-color: #03a9f4;
    }
    16.66% {
      bottom: 40px;
      background-color: #fb6542;
    }
    33.33% {
      bottom: 0px;
      background-color: #fb6542;
    }
    50% {
      bottom: 40px;
      background-color: #ffbb00;
    }
    66.66% {
      bottom: 0px;
      background-color: #ffbb00;
    }
    83.33% {
      bottom: 40px;
      background-color: #03a9f4;
    }
    100% {
      bottom: 0;
      background-color: #03a9f4;
    }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: #f5f5f5;

  .circles {
    margin: 0 auto;
    width: 70px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 45%;
  }

  .circles .ball {
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: inline-block;
    animation: ${bouncedelay} 2s infinite cubic-bezier(0.62, 0.28, 0.23, 0.99)
      both;
  }

  .circles .ball1 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .circles .ball2 {
    -webkit-animation-delay: -0.08s;
    animation-delay: -0.08s;
  }
`;

export const Loading = () => {
  return (
    <Wrapper>
      <div className='circles'>
        <div className='ball ball1'></div>
        <div className='ball ball2'></div>
        <div className='ball ball3'></div>
      </div>
    </Wrapper>
  );
};
