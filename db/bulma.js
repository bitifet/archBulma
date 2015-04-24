
var Bulma = require("mysql").createPool({
    connectionLimit: 10,
    host: "localhost",
    database: "bulma",
    user: "root",
});

var Flt = {
    title: function filterArticleTitle(html) {
        return html;
    },
};

var Fmt = {
    artListEntry: function articleListEntryFormatter(input) {
        return {
            id: input.id_noticia,
            title: Flt.title(input.titulo_noticia),
            abstract: input.resumen_noticia,
        };

    },
    article: function articleFormater(input) {
        return {
            id: input.id_noticia,
            title: Flt.title(input.titulo_noticia),
            abstract: input.resumen_noticia,
        };
    },
};

module.exports = {
    listArticles: function listArticles(prm, successFn, errFn) {
        Bulma.query (
            "select * from bul_tbl_noticias",
            ///[prm.user, prm.cat], // FIXME
            function getArticleList(err, results, fields) {
                if (err) {
                    errFn(err);
                } else {
                    successFn(results.map(Fmt.artListEntry));
                };
            }
        );

    },
    renderArticle: function renderArticle(prm, successFn, errFn) {
        Bulma.query (
            "select * from bul_tbl_noticias where id_noticia = ?",
            [prm.id],
            function getArticle(err, results, fields) {
                if (err) {
                    errFn(err);
                } else {
                    successFn(Fmt.article(results[0]));
                };
            }
        );

    },

};

