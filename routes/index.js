var express = require('express');
var router = express.Router();


var Bulma = require("../lib/bulma.js");

var map = Bulma.siteMap;
var ctrl = Bulma.controllers;

for (var view in map) {
    if (ctrl[view] === undefined) {
        console.error("Not routing unimplemented view: " + view);
    } else router.get(map[view].route, ctrl[view]);
};

module.exports = router;
