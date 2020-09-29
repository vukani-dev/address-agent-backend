module.exports = function(app) {

  var ETCCHAIN = require('etcchain-node');
  var etcchainApi = new ETCCHAIN();

  var priceFetcher = require('./price_fetcher');

  app.post('/getEtcAmtFromAddress', (req, res) => {
    var balance = etcchainApi.getBalance(req.body.address);

    balance.then(data => {
      var amount = data.balance;

      priceFetcher.fetchCoinPrice(req.body.coinName)
        .then(response => {
          var totalAmt = (response * amount).toFixed(2);
          var result = {"worth": totalAmt, "balance": amount.toFixed(2)}
          res.json(result)
        })
    })

  })

};
