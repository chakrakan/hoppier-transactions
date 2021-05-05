import React from 'react';
import styled from '@emotion/styled';
import HoppierLogo from '../assets/hoppier_logo.svg';
import { MenuButton } from './MenuButton';

const Img = styled.img`
  height: 150px;
  width: 150px;
`;

const HeaderWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 100px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 90%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  z-index: 1000;
  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`;

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, auto);

  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`;

export const Header = (props) => {
  const { defaultCurrency, setDefaultCurrency } = props;
  return (
    <HeaderWrapper>
      <Img src={HoppierLogo} alt='Logo' />
      <MenuWrapper>
        <MenuButton
          title={defaultCurrency}
          active={false}
          onClick={() =>
            setDefaultCurrency(() => {
              if (defaultCurrency === 'USD') {
                return 'CAD';
              } else {
                return 'USD';
              }
            })
          }
        />
        <MenuButton title='Events' active={false} />
        <MenuButton title='Transactions' active={true} />
        <MenuButton title='Settings' active={false} />
      </MenuWrapper>
    </HeaderWrapper>
  );
};
