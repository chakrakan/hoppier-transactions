export const fetchCurrency = async () => {
  const rateUSDtoCAD = await fetch(
    'https://api.exchangerate.host/latest?symbols=CAD&base=USD'
  )
    .then((res) => res.json())
    .then((data) => {
      return data.rates.CAD;
    })
    .catch((err) => console.log(err));

  return rateUSDtoCAD;
};
