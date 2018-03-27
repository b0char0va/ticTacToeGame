$(document).ready( function () {

    $("#one").click(function () {
        $(".players").addClass("hide");
        $(".XO").removeClass("hide");
        $(".single").removeClass("hide");
        $("#back").removeClass("hide");
    });
    $("#two").click(function () {
        $(".players").addClass("hide");
        $(".XO").removeClass("hide");
        $(".double").removeClass("hide");
        $("#back").removeClass("hide");
    });
    $("#back").click(function(){
        $(".players").removeClass("hide");
        $(".XO").addClass("hide");
        $(".single").addClass("hide");
        $(".double").addClass("hide");
        $("#back").addClass("hide");
    });
    $(".XO").click(function () {
        $(".table").removeClass("hide");
        $(".score").removeClass("hide");
        $(".single").addClass("hide");
        $(".double").addClass("hide");
        $(".players").addClass("hide");
        $(".XO").addClass("hide");
        $("#back").addClass("hide");
    })
});