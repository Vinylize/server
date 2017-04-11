import braintree from 'braintree';

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '2nyfk7tb5ckwqwsx',
  publicKey: '5fq7rhmfhcfz9zsz',
  privateKey: '85a3bfeed173fc494799ece8c15f28f2'
});

export default gateway;
