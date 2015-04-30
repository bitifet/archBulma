

var cfg = {
    debug: true,
    briefLength: 50,
};


var Bulma = require("mysql").createPool({
    connectionLimit: 10,
    host: "localhost",
    database: "bulma",
    user: "root",
});


var siteMap = {//{{{
    home: {
        route: "/",
        rootUrl: '',
        url: "",
    },
    article: {
        route: "/noticia/:id",
        rootUrl: '../',
        url: "noticia/"
    },
    abstract: {
        route: "/resumen/:id",
        rootUrl: '../',
        url: "resumen/",
    },
    author: {
        route: "/autor/:id",
        rootUrl: '../',
        url: "autor/",
    },
};//}}}



var Flt = {
    title: function filterArticleTitle(html) {//{{{
        return html;
    },//}}}
    brief: function filterArticleBrief(html) {
        // FIXME: Strip html tags!!
        return {
            text: html.substring(0, cfg.briefLength),
            more: html.length > cfg.briefLength ? '(...)' : '',
        };
    },
    abstract: function filterAbstract(html) {
        return html;
    },
    timestamp: function filterTimestamp(str) {
        return str;
    },
};

var Fmt = {
    artListEntry: function articleListEntryFormatter(input) {//{{{
        return {
            id: input.id_noticia,
            title: Flt.title(input.titulo_noticia),
            abstract: Flt.brief(input.resumen_noticia),
            author: {
                id: input.id_autor,
                name: input.authname,
            },
            mtime: Flt.timestamp(input.fecha_modificacion_noticia),
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
    siteMap: siteMap,
    controllers: {
        home: function listArticles(req, res, next) {//{{{
            var sql = "select n.*, auth.apodo_autor as authname from bul_tbl_noticias as n"
                + " join bul_tbl_autores as auth using (id_autor)"
                + " order by fecha_alta_noticia desc"
            ;
            if (cfg.debug) sql += " limit 10";
            Bulma.query (
                sql, 
                function getArticleList(err, results, fields) {
                    if (err) {
                        next(err);
                    } else {
                        res.render(
                            'index',
                            {
                                title: 'Bulma',
                                siteMap: siteMap,
                                data: results.map(Fmt.artListEntry),
                            }
                        );
                    };
                }
            );

        },//}}}
        article: function renderArticle(req, res, next) {//{{{
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

        },//}}}
        abstract: function renderAbstract(req, res, next) {//{{{
            Bulma.query (
                "select resumen_noticia from bul_tbl_noticias where id_noticia = ?",
                [req.params.id],
                function getArticle(err, results, fields) {
                    if (err) {
                        next(err);
                    } else {
                        res.send(Flt.abstract(results[0].resumen_noticia));
                    };
                }
            );

        },//}}}
    },
};

