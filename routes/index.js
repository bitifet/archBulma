var express = require('express');
var router = express.Router();
var Url = require("url");


var Bulma = require("../lib/bulma.js");

var siteMap = Bulma.siteMap;
var ctrl = Bulma.controllers;



router.use(function(req, res, next) {
    if (req.model === undefined) req.model = {};
    var model = req.model;

    function rootPath() { // FIXME: Build local sitemap generator.
        var url = req.route.path;
        var c = url.split("/").length - 1;
        return (new Array(c)).join("../");
    };
    
    model.Url = {};

    model.Url.path = function getPath(pageId) {
        var pg = siteMap[pageId];
        if (typeof pg == "object") pg = pg.url;
        if (! pg.length) pg = pageId;
        var path = rootPath() + pg;
        return path;

    };



    next();
});



for (var view in siteMap) {
    if (ctrl[view] === undefined) {
        console.error("Not routing unimplemented view: " + view);
    } else {
        if (typeof siteMap[view] === "string") {
            siteMap[view] = { // Shorthand for single static url listing.
                url: siteMap[view],
            };
        } else if (typeof ctrl[view] === "function") {
            router.get(siteMap[view].route, ctrl[view]);
        };
    };
};

module.exports = router;
