const CoinMarketCap = require('coinmarketcap-api')
const client = new CoinMarketCap()


exports.fetchCoinPrice = (coinName) => {
  return client.getTicker({
      currency: coinName
    })
    .then(response => {
      console.log(response[0].price_usd);
      return response[0].price_usd
    })
    .catch(console.error())
}
