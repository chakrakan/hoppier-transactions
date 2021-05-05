export const fetchCurrency = async () => {
  const rateUSDtoCAD = await fetch(
    'https://api.exchangeratesapi.io/latest?base=USD&symbols=CAD'
  )
    .then((res) => res.json())
    .then((data) => {
      return data.rates.CAD;
    })
    .catch((err) => console.log(err));

  //   const rateCADtoUSD = await fetch(
  //     'https://api.exchangeratesapi.io/latest?base=CAD&symbols=USD'
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data.rates.USD;
  //     })
  //     .catch((err) => console.log(err));

  return { rateUSDtoCAD };
};
