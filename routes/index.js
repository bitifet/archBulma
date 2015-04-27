var express = require('express');
var router = express.Router();


var Bulma = require("../db/bulma.js");

for (var b in Bulma) {
    router.get(Bulma[b][0], Bulma[b][1]);
};

module.exports = router;
