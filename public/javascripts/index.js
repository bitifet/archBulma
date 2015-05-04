
$("body").on("click", "div.post-preview a.showMore", function(e){
    e.preventDefault();
    var me = $(e.target);
    if (me.data("handled")) {
        return;
    };
    me.data("handled", true);
    var url = me.attr("href");
    var insertPoint = $(".post-meta", me.closest(".post-preview"));
    var placeHolder = $("<div></div>")
        .text("Loading...")
        .insertBefore(insertPoint)
    ;


    $.ajax({
        url: url,
        success: function loadAbstract(data){
            placeHolder.html(data);
            me.text("(-)");
            var open = true;
            me.on("click", function abstractToggle(){
                placeHolder.fadeToggle();
                open = ! open;
                me.text(open
                    ? "(-)"
                    : "(+)"
                );
            });

        },
    });





});
