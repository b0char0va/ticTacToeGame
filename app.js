var game;
var symbol;
var compSymbol;
var array = [];
var centerMoveArray = [1, 3, 7, 9];
var clicks = 0;


$(document).ready(function () {
    $("#one").click(function () {
        game = 1;
        $(".players").addClass("hide");
        $(".XO").removeClass("hide");
        $(".single").removeClass("hide");
        $("#back").removeClass("hide");
    });
    $("#two").click(function () {
        game = 2;
        $(".players").addClass("hide");
        $(".XO").removeClass("hide");
        $(".double").removeClass("hide");
        $("#back").removeClass("hide");
    });
    $("#back").click(function () {
        $(".players").removeClass("hide");
        $(".XO").addClass("hide");
        $(".single").addClass("hide");
        $(".double").addClass("hide");
        $("#back").addClass("hide");
    });
    $(".XO").click(function () {
        symbol = $(this).text();
        $(".table").removeClass("hide");
        $(".score").removeClass("hide");
        if (game === 1) {
            $("#scoreComp").removeClass("hide");
        } else {
            $("#score2").removeClass("hide");
        }
        $(".single").addClass("hide");
        $(".double").addClass("hide");
        $(".players").addClass("hide");
        $(".XO").addClass("hide");
        $("#back").addClass("hide");
    });
    $("#Reset").click(function () {
        $(".cell").empty();
        $(".table").addClass("hide");
        $(".score").addClass("hide");
        $("#score2").addClass("hide");
        $("#scoreComp").addClass("hide");
        $(".players").removeClass("hide");
        $(".XO").addClass("hide");
        $(".single").addClass("hide");
        $(".double").addClass("hide");
        $("#back").addClass("hide");
    });
    $(".cell").click(function () {
        clicks++;
        $(this).html(symbol);
        var cellId = $(this).attr("id");
        array.push(cellId);
        console.log(array);
        play(cellId);
    })
});

function play(id) {

    if (symbol === "X") {
        compSymbol = "O";
    } else {
        compSymbol = "X";
    }
    if (clicks === 1 && id === "5") {
        var compMove = centerMoveArray[Math.floor((Math.random() * 3))];
        if (compMove !== id) {
            $("#" + compMove).html(compSymbol);
            array.push(compMove);
        }
        return;
    } else if (clicks === 1 && id !== "5") {
        $("#5").html(compSymbol);
        array.push("5");
        return;
    }

    if ((($("#1").text() === symbol && $("#2").text() === symbol) || ($("#1").text() === compSymbol && $("#2").text() === compSymbol)) && $("#3").text() === "") {
        $("#3").html(compSymbol);
        array.push("3");
        return;
    }
    if ((($("#2").text() === symbol && $("#3").text() === symbol) || ($("#2").text() === compSymbol && $("#3").text() === compSymbol)) && $("#1").text() === "") {
        $("#1").html(compSymbol);
        array.push("1");
        return;
    }
    if ((($("#4").text() === symbol && $("#5").text() === symbol) || ($("#4").text() === compSymbol && $("#5").text() === compSymbol)) && $("#6").text() === "") {
        $("#6").html(compSymbol);
        array.push("6");
        return;
    }
    if ((($("#5").text() === symbol && $("#6").text() === symbol) || ($("#5").text() === compSymbol && $("#6").text() === compSymbol)) && $("#4").text() === "") {
        $("#4").html(compSymbol);
        array.push("4");
        return;
    }
    if ((($("#7").text() === symbol && $("#8").text() === symbol) || ($("#7").text() === compSymbol && $("#8").text() === compSymbol)) && $("#9").text() === "") {
        $("#9").html(compSymbol);
        array.push("9");
        return;
    }
    if ((($("#8").text() === symbol && $("#9").text() === symbol) || ($("#8").text() === compSymbol && $("#9").text() === compSymbol)) && $("#7").text() === "") {
        $("#7").html(compSymbol);
        array.push("7");
        return;
    }
    if ((($("#1").text() === symbol && $("#4").text() === symbol) || ($("#1").text() === compSymbol && $("#4").text() === compSymbol)) && $("#7").text() === "") {
        $("#7").html(compSymbol);
        array.push("7");
        return;
    }
    if ((($("#4").text() === symbol && $("#7").text() === symbol) || ($("#4").text() === compSymbol && $("#7").text() === compSymbol)) && $("#1").text() === "") {
        $("#1").html(compSymbol);
        array.push("1");
        return;
    }
    if ((($("#2").text() === symbol && $("#5").text() === symbol) || ($("#2").text() === compSymbol && $("#5").text() === compSymbol)) && $("#8").text() === "") {
        $("#8").html(compSymbol);
        array.push("8");
        return;
    }
    if ((($("#5").text() === symbol && $("#8").text() === symbol) || ($("#5").text() === compSymbol && $("#8").text() === compSymbol)) && $("#2").text() === "") {
        $("#2").html(compSymbol);
        array.push("2");
        return;
    }
    if ((($("#3").text() === symbol && $("#6").text() === symbol) || ($("#3").text() === compSymbol && $("#6").text() === compSymbol)) && $("#9").text() === "") {
        $("#9").html(compSymbol);
        array.push("9");
        return;
    }
    if ((($("#6").text() === symbol && $("#9").text() === symbol) || ($("#6").text() === compSymbol && $("#9").text() === compSymbol)) && $("#3").text() === "") {
        $("#3").html(compSymbol);
        array.push("3");
        return;
    }
    if ((($("#1").text() === symbol && $("#5").text() === symbol) || ($("#1").text() === compSymbol && $("#5").text() === compSymbol)) && $("#9").text() === "") {
        $("#9").html(compSymbol);
        array.push("9");
        return;
    }
    if ((($("#5").text() === symbol && $("#9").text() === symbol) || ($("#5").text() === compSymbol && $("#9").text() === compSymbol)) && $("#1").text() === "") {
        $("#1").html(compSymbol);
        array.push("1");
        return;
    }
    if ((($("#3").text() === symbol && $("#5").text() === symbol) || ($("#3").text() === compSymbol && $("#5").text() === compSymbol)) && $("#7").text() === "") {
        $("#7").html(compSymbol);
        array.push("7");
        return;
    }
    if ((($("#5").text() === symbol && $("#7").text() === symbol) || ($("#5").text() === compSymbol && $("#7").text() === compSymbol)) && $("#3").text() === "") {
        $("#3").html(compSymbol);
        array.push("3");
        return;
    }
    if ((($("#1").text() === symbol && $("#3").text() === symbol) || ($("#1").text() === compSymbol && $("#3").text() === compSymbol)) && $("#2").text() === "") {
        $("#2").html(compSymbol);
        array.push("2");
        return;
    }
    if ((($("#4").text() === symbol && $("#6").text() === symbol) || ($("#4").text() === compSymbol && $("#6").text() === compSymbol)) && $("#5").text() === "") {
        $("#5").html(compSymbol);
        array.push("5");
        return;
    }
    if ((($("#7").text() === symbol && $("#9").text() === symbol) || ($("#7").text() === compSymbol && $("#9").text() === compSymbol)) && $("#8").text() === "") {
        $("#8").html(compSymbol);
        array.push("8");
        return;
    }
    if ((($("#1").text() === symbol && $("#7").text() === symbol) || ($("#1").text() === compSymbol && $("#7").text() === compSymbol)) && $("#4").text() === "") {
        $("#4").html(compSymbol);
        array.push("4");
        return;
    }
    if ((($("#2").text() === symbol && $("#8").text() === symbol) || ($("#2").text() === compSymbol && $("#8").text() === compSymbol)) && $("#5").text() === "") {
        $("#5").html(compSymbol);
        array.push("5");
        return;
    }
    if ((($("#3").text() === symbol && $("#9").text() === symbol) || ($("#3").text() === compSymbol && $("#9").text() === compSymbol)) && $("#6").text() === "") {
        $("#6").html(compSymbol);
        array.push("6");
        return;
    }
    if ((($("#1").text() === symbol && $("#9").text() === symbol) || ($("#1").text() === compSymbol && $("#9").text() === compSymbol)) && $("#5").text() === "") {
        $("#5").html(compSymbol);
        array.push("5");
        return;
    }
    if ((($("#3").text() === symbol && $("#7").text() === symbol) || ($("#3").text() === compSymbol && $("#7").text() === compSymbol)) && $("#5").text() === "") {
        $("#5").html(compSymbol);
        array.push("5");
        return;
    }
    randomMove();
}

function randomMove() {
    var compMove = centerMoveArray[Math.ceil((Math.random() * 8))];
    if (!array.includes(compMove)) {
        $("#" + compMove).html(compSymbol);
        console.log(compMove);
    } else {
        randomMove();
    }
}