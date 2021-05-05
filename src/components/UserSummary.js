import React from 'react';
import styled from '@emotion/styled';
import { Caption } from '../styles/TextStyles';
import currency from 'currency.js';
import creditCard from '../assets/cc.svg';

const SummaryCard = styled.div`
  position: relative;
`;

const CreditCard = styled.img`
  margin-top: -50px;
  width: 90%;
  height: auto;
`;

const DisplayTotal = styled(Caption)`
  background: #fa8072;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  opacity: 0.9;
  font-size: 24px;
  padding: 10px 10px;
  border-radius: 5px;
  position: absolute;
  top: 45px;
  right: 10px;
`;

const DisplayTotalTransactions = styled(Caption)`
  background: #fa8072;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  opacity: 0.9;
  font-size: 24px;
  padding: 10px 10px;
  border-radius: 20px;
  position: absolute;
  top: 5px;
  right: 10px;
`;

const DisplayId = styled(Caption)`
  background: #949ca8;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  font-size: 24px;
  width: 450px;
  height: 45px;
  padding: 10px 10px;
  border-radius: 5px;
  position: absolute;
  top: 250px;
  left: 120px;
`;

export const UserSummary = (props) => {
  const { total, userCardId, numberOfTransactions } = props;

  return (
    <SummaryCard>
      <CreditCard src={creditCard} alt='Card' />
      <DisplayTotal>Total Spent: {currency(total).format()}</DisplayTotal>
      <DisplayTotalTransactions>
        {numberOfTransactions.length}
      </DisplayTotalTransactions>
      <DisplayId>Card ID: {userCardId}</DisplayId>
    </SummaryCard>
  );
};
