module.exports = function(app) {

  var api = require('etherscan-api').init('BWGS94RAXBYFGWE3EUW66H52TA56SN78NZ');
  var priceFetcher = require('./price_fetcher');

  app.post('/getEthAmtFromAddress', (req, res) => {
    console.log(req)
    var balance = api.account.balance(req.body.address);

    balance.then(data => {
      var weiToETH = data.result / 1e18;

      priceFetcher.fetchCoinPrice(req.body.coinName)
        .then(response => {
          var totalAmt = (response * weiToETH).toFixed(2);
          var result = {"worth": totalAmt, "balance": weiToETH.toFixed(2)}
          res.json(result)
        })
    })

  })

};
