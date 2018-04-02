var game;
var symbol;
var compSymbol;
var freecells = 9;

var m = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

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

        $(".table").removeClass("disabled hide");
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
        m = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];
        freecells = 9;
        $("#result").empty();
        $("#result").addClass("hide");
        $("#win").addClass("hide");
        $("#draw").addClass("hide");
        $(".cell").empty();
        $(".cell").removeClass("disabledCell");
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
        var comp;
        var opponent;
        freecells--;
        if (symbol === "X") {
            opponent = 1;      // if player chooses to play with X, player is 1
            comp = 0;            //computer is "O" and O is 0
            compSymbol = "O";
        } else {
            opponent = 0;       //if player chooses to play with O, player is 0
            comp = 1;             //comptuer is "X" and X is 1
            compSymbol = "X";
        }
        $(this).html(symbol);
        $(this).addClass("disabledCell");
        var cellId = parseInt($(this).attr("id"));
        playerMatrixMove(cellId, opponent, comp, compSymbol);
    })
});

function analyzeMoves(m, player, depth) {
    if (checkWinner(m, +!player)) {
        return {score: player === 1 ? 10 - depth : depth - 10}
    }

    var possibleMoves = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            // is cell i,j empty?
            if (m[i][j] !== -1) {
                continue;
            }
            m[i][j] = player;
            var stats = analyzeMoves(m, +!player, depth + 1);
            possibleMoves.push({i: i, j: j, score: stats.score});
            m[i][j] = -1;
        }
    }

    if (possibleMoves.length === 0) {
        return {score: 0}
    }

    var bestMove, l;
    if (player === 0) {
        var max = Number.NEGATIVE_INFINITY;
        for (l in possibleMoves) {
            if (possibleMoves[l].score > max) {
                bestMove = possibleMoves[l];
                max = possibleMoves[l].score;
            }
        }
    } else {
        var min = Number.POSITIVE_INFINITY;
        for (l in possibleMoves) {
            if (possibleMoves[l].score < min) {
                bestMove = possibleMoves[l];
                min = possibleMoves[l].score;
            }
        }
    }
    return bestMove;
}

function checkWinner(m, p) {
    for (var i = 0; i < 3; i++) {
        if (m[i][0] === p && m[i][1] === p && m[i][2] === p) {
            return true;
        }
        if (m[0][i] === p && m[1][i] === p && m[2][i] === p) {
            return true;
        }
    }

    if (m[0][0] === p && m[1][1] === p && m[2][2] === p) {
        return true;
    }

    if (m[2][0] === p && m[1][1] === p && m[0][2] === p) {
        return true;
    }

    return false;
}

function playerMatrixMove(cellId, opponent, comp, compSymbol) {
    var i = Math.floor((cellId - 1) / 3);
    var j = Math.floor((cellId - 1) % 3);
    m[i][j] = opponent;
    compMatrixMove(m, opponent, comp, compSymbol); //passing updated matrix, computer's playing symbol value, and number of free cells
}

function compMatrixMove(m, opponent, player, compSymbol) {
    if (checkWinner(m, opponent)) {
        $("#result").removeClass("hide");
        $("#result").text("You won!!");
        $(".table").addClass("disabled");
    } else if (freecells === 0 && !playerWin) {
        $("#result").removeClass("hide");
        $("#result").text("It's draw!!");
        $(".table").addClass("disabled");
    } else {
        var gameStats = analyzeMoves(m, player, 0);
        var i = gameStats.i;
        var j = gameStats.j;
        var cellId = (i * 3) + 1 + j;
        m[i][j] = player;
        $("#" + cellId).text(compSymbol);
        $("#" + cellId).addClass("disabledCell");
        freecells--;
        var playerWin = checkWinner(m, player);
        if (checkWinner(m, player)) {
            $("#result").removeClass("hide");
            $("#result").text("You lost!!");
            $(".table").addClass("disabled");
        } else if (freecells === 0 && !playerWin) {
            $("#result").removeClass("hide");
            $("#result").text("It's draw!!");
            $(".table").addClass("disabled");
        }
    }
}

