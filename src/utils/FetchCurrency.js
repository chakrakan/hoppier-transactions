import { exchangeRates } from 'exchange-rates-api';

export const fetchCurrency = async () => {
  const rateUSDtoCAD = await exchangeRates()
    .latest()
    .base('USD')
    .fetch()
    .then((res) => res.CAD)
    .catch((err) => console.log(err));

  return rateUSDtoCAD;
};
