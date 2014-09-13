var pubs, request, _;

request = require('request');

_ = require('lodash');

pubs = {
  'hashigo': 1,
  'lbq': 2,
  'vagabond': 3,
  'socro': 4,
  'greenman': 5,
  'fork&brewer': 6,
  'malthouse': 7,
  'bin44': 8,
  'd4': 9,
  'hopgarden': 10,
  'establishment': 11,
  'bruhaus': 12,
  'brew-on-quay': 13
};

module.exports = function(robot) {
  return robot.hear(/.*(whats on tap at)(.*)/i, function(msg) {
    var beers, pub, url;
    pub = msg.match[2].trim();
    if (!pubs.hasOwnProperty(pub)) {
      msg.send("Please select from one of the following pubs " + (Object.keys(pubs).join(', ')));
    }
    url = "http://maltlist.com/api/products.json?local_business_id=" + pubs[pub];
    beers = [];
    return request(url, function(error, response, body) {
      var beer, info, offer, _i, _j, _len, _len1, _ref, _ref1;
      if (!error && response.statusCode === 200) {
        info = JSON.parse(body);
        _ref = info.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          beer = _ref[_i];
          _ref1 = beer.offers;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            offer = _ref1[_j];
            if (offer.category === 'tap') {
              if (beer.name !== 'On the Hand-pull') {
                beers.push("" + beer.name + " " + beer.abv + "%");
              }
            }
          }
        }
      }
      return msg.send(_.unique(beers).join('\n'));
    });
  });
};
