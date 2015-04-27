
var Bulma = require("mysql").createPool({
    connectionLimit: 10,
    host: "localhost",
    database: "bulma",
    user: "root",
});

var Flt = {
    title: function filterArticleTitle(html) {//{{{
        return html;
    },//}}}
};

var Fmt = {
    artListEntry: function articleListEntryFormatter(input) {//{{{
        return {
            id: input.id_noticia,
            title: Flt.title(input.titulo_noticia),
            abstract: input.resumen_noticia,
        };

    },//}}}
    article: function articleFormater(input) {//{{{
        return {
            id: input.id_noticia,
            title: Flt.title(input.titulo_noticia),
            abstract: input.resumen_noticia,
        };
    },//}}}
};


module.exports = {
    listArticles: ["/", function listArticles(req, res, next) {//{{{
        Bulma.query (
            "select * from bul_tbl_noticias",
            function getArticleList(err, results, fields) {
                if (err) {
                    next(err);
                } else {
                    res.render(
                        'index',
                        {
                            title: 'Bulma',
                            data: results.map(Fmt.artListEntry),
                        }
                    );
                };
            }
        );

    }],//}}}
    renderArticle: ["/noticia/:id", function renderArticle(req, res, next) {//{{{

        Bulma.query (
            "select * from bul_tbl_noticias where id_noticia = ?",
            [req.params.id],
            function getArticle(err, results, fields) {
                if (err) {
                    next(err);
                } else {
                    res.render(
                        'article',
                        {
                            title: "FIXME!!",
                            data: Fmt.article(results[0]),
                        }
                    );
                };
            }
        );

    }],//}}}
};

