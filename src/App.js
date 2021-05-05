import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { getMerchants, getTransactions, getUsers } from './utils/GraphQLData';
import { fetchCurrency } from './utils/FetchCurrency';
import { UserSelector } from './components/UserSelector';
import { Loading } from './components/Loading';
import { Header } from './components/Header';
import { UserSummary } from './components/UserSummary';
import currency from 'currency.js';
import { TransactionList } from './components/TransactionsList';
import { Background } from './components/Background';

const Content = styled.div`
  height: 100vh;
  width: 100vw;
`;

const animation = keyframes`
  from { opacity: 0; transform: translateX(-50px); filter: blur(10px); }
 to  { opacity: 1; transform: translateX(0px); filter: blur(0px); }
`;

const SelectorSummaryWrapper = styled.div`
  margin-top: 20vh;
  left: 100px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  column-gap: 100px;
  justify-content: space-between;
  grid-gap: 10%;
  max-height: 40vh;
  padding: 10px;
  margin-left: 5vw;
  max-width: 1000px;

  > * {
    opacity: 0;
    animation: ${animation} 1s forwards;
    :nth-child(1) {
      animation-delay: 0s;
    }
    :nth-child(2) {
      animation-delay: 0.2s;
    }
  }
`;

// const SummaryWrapper = styled.div`
//   margin-top: 22vh;
//   padding: 10px;
//   margin-left: 5vw;
//   min-width: 960px;
// `;

const TransactionsListWrapper = styled.div`
  padding: 10px;
  margin-left: 5vw;
  min-width: 300px;
`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    users: [],
    merchants: [],
    transactions: [],
    dollarToCAD: 0,
  });
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [userCardId, setUserCardId] = useState('');
  const [userTransactionData, setUserTransactionData] = useState({
    transactionData: [],
    totalUSD: undefined,
    totalCAD: undefined,
  });

  /**
   * Fetch and set all data needed to display the Transactions page
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    const usersData = await getUsers();
    const merchantsData = await getMerchants();
    const transactionsData = await getTransactions();
    const { rateUSDtoCAD } = await fetchCurrency();

    // const values = await Promise.all([
    //   usersData,
    //   merchantsData,
    //   transactionsData,
    //   rateUSDtoCAD,
    // ]).then((values) => {
    //   values.forEach((item) => console.log(item));
    // });

    setData({
      users: usersData,
      merchants: merchantsData,
      transactions: transactionsData,
      dollarToCAD: rateUSDtoCAD,
    });
    // console.log(usersData);
    // console.log(merchantsData);
    // console.log(transactionsData);
    // console.log(rateUSDtoCAD);
    setLoading(false);
  }, []);

  const handleUserChange = (event) => {
    setUserCardId(() => {
      getUserTransactionData(event.target.value);
      return event.target.value;
    });
  };

  const getUserTransactionData = useCallback(
    (cardId) => {
      if (
        cardId !== '' &&
        (Array.isArray(data.transactions) || data.transactions.length)
      ) {
        const currUserData = data.transactions.filter((transaction) => {
          return transaction.cardId.includes(cardId);
        });

        const totalTransactionUSDValue = currUserData.reduce(
          (price, transaction) => {
            const transactionPrice = currency(transaction.amountInUSDCents, {
              fromCents: true,
            });
            return currency(price).add(transactionPrice);
          }
        );

        const totalTransactionCADValue = totalTransactionUSDValue.multiply(
          data.dollarToCAD
        );

        currUserData.forEach((transaction) => {
          const merchant = data.merchants.find((merchant) => {
            return merchant.networkId === transaction.merchantNetworkId;
          });
          const usdCurrencyObj = currency(transaction.amountInUSDCents, {
            fromCents: true,
          });
          const cadCurrencyObj = usdCurrencyObj.multiply(data.dollarToCAD);
          transaction.merchant = merchant.name;
          transaction.merchantCurrency = merchant.currency;
          transaction.usdAmount = usdCurrencyObj.format();
          transaction.cadAmount = cadCurrencyObj.format();
        });

        console.log(currUserData, totalTransactionUSDValue.format());
        setUserTransactionData({
          transactionData: currUserData,
          totalUSD: totalTransactionUSDValue,
          totalCAD: totalTransactionCADValue,
        });
      }
    },
    [data.dollarToCAD, data.merchants, data.transactions]
  );

  useEffect(() => {
    // fetch all data on component mount
    const instantiate = async () => await fetchData();
    instantiate();
  }, [fetchData]);

  return (
    <Content>
      <Header
        defaultCurrency={defaultCurrency}
        setDefaultCurrency={setDefaultCurrency}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Background />
          <SelectorSummaryWrapper>
            <UserSummary
              userCardId={userCardId}
              numberOfTransactions={userTransactionData.transactionData}
              total={
                defaultCurrency === 'CAD'
                  ? userTransactionData.totalCAD
                  : userTransactionData.totalUSD
              }
            />
            <TransactionsListWrapper>
              <UserSelector
                users={data.users}
                handleChange={handleUserChange}
                setUserCardId={setUserCardId}
              />
              {userTransactionData.transactionData.length ? (
                <TransactionList
                  userTransactions={userTransactionData.transactionData}
                  defaultCurrency={defaultCurrency}
                />
              ) : (
                <></>
              )}
            </TransactionsListWrapper>
          </SelectorSummaryWrapper>
        </>
      )}
    </Content>
  );
}
