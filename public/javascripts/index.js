
$("body").on("click", "div.post-preview a.showMore", function(e){
    e.preventDefault();
    var me = $(e.target);
    if (me.data("handled")) {
        return;
    };
    me.data("handled", true);
    var url = me.attr("href");
    var heading = me.closest(".post-subtitle");
    var container = $("<div></div>")
        .css({width: "100%"})
        .text("Loading...")
        .insertAfter(heading)
    ;


    $.ajax({
        url: url,
        success: function loadAbstract(data){
            container.html(data);
            me.text("(-)");
            var open = true;
            me.on("click", function abstractToggle(){
                container.fadeToggle();
                open = ! open;
                me.text(open
                    ? "(-)"
                    : "(+)"
                );
            });

        },
    });





});
