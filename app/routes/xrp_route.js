module.exports = function(app) {

  var priceFetcher = require('./price_fetcher');
  const RippleAPI = require('ripple-lib').RippleAPI;

  app.post('/getXrpAmtFromAddress', (req, res) => {

    const api = new RippleAPI({
      server: 'wss://s1.ripple.com' // Public rippled server
    });
    api.connect().then(() => {
      return api.getAccountInfo(req.body.address);

    }).then(info => {
      console.log(info.xrpBalance);
      console.log('getAccountInfo done');
      return info.xrpBalance
    }).then((balance) => {
      api.disconnect();
      return balance
    }).then((balance) => {
      console.log('done and disconnected.');
      console.log(balance)

      priceFetcher.fetchCoinPrice(req.body.coinName)
        .then(response => {
          console.log(balance)
          var totalAmt = (response * balance).toFixed(2);
          var result = {"worth": totalAmt, "balance": parseFloat(balance).toFixed(2)}
          res.json(result)
        })
    }).catch(console.error);

  })

};
