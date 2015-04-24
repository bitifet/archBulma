var express = require('express');
var router = express.Router();


var Bulma = require("../db/bulma.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    Bulma.listArticles(
        {},
        function renderArticleList(data) {
            res.render(
                'index',
                {
                    title: 'Bulma',
                    data: data,
                }
            );
        },
        next
    );


});


router.get('/noticia/:id', function (req, res, next) {
    Bulma.renderArticle(
        req.params,
        function renderArticle(data) {
            res.render(
                'article',
                {
                    title: "Fixme!",
                    data: data,
                }
            );
        },
        next
    );
});


module.exports = router;
