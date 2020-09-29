module.exports = function(app) {

  var blockexplorer = require('blockchain.info/blockexplorer')
  var priceFetcher = require('./price_fetcher');

  app.post('/getBtcAmtFromAddress', (req, res) => {
    var balance = blockexplorer.getAddress(req.body.address)

    balance.then(data => {
      var satsToBTC = data.final_balance / 1e8;

      console.log(data.final_balance);
      priceFetcher.fetchCoinPrice(req.body.coinName)
        .then(response => {
          var totalAmt = (response * satsToBTC).toFixed(2);
          var result = {"worth": totalAmt, "balance": satsToBTC.toFixed(2)}

          res.json(result)
        })
    })
  })

};
