import faker from 'faker';

const seed = 20201222;

// Change this to get the test a new set of data
faker.seed(seed);

const currencies = ['USD', 'CAD'];
const arrayOfLength = (n, mapFunction) => Array.from(Array(n)).map(mapFunction);
const randomArrayElement = (array) =>
  array[faker.datatype.number({ min: 0, max: array.length - 1 })];

const merchants = arrayOfLength(
  faker.datatype.number({ min: 5, max: 13 }),
  () => ({
    currency: randomArrayElement(currencies),
    name: faker.company.companyName(),
    networkId: `${faker.datatype.number({ min: 100000, max: 700000 })}`,
  })
);

const users = arrayOfLength(
  faker.datatype.number({ min: 10, max: 18 }),
  () => ({
    id: faker.datatype.number({ min: 3, max: 150 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    cardId: `sk_${faker.datatype.number({ min: 100000000, max: 700000000 })}`,
  })
);

const transactions = arrayOfLength(
  faker.datatype.number({ min: 100, max: 180 }),
  () => ({
    id: `${faker.datatype.number({ min: 100000, max: 700000 })}`,
    amountInUSDCents: faker.datatype.number({ min: 100, max: 10000 }),
    date: faker.date.recent(10),
    merchantNetworkId: randomArrayElement(merchants).networkId,
    cardId: randomArrayElement(users).cardId,
  })
);

const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));
const randomNetworkDelay = async (result) => {
  await wait(faker.datatype.number({ min: 1200, max: 3000 }));
  return result;
};

export const getMerchants = () => randomNetworkDelay(merchants);
export const getTransactions = () => randomNetworkDelay(transactions);
export const getUsers = () => randomNetworkDelay(users);
