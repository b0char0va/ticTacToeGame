var symbol;                // X or O symbol used by player1
var compSymbol;          // X or O symbol used by computer
var freecells = 9;
var comp;               //computer
var opponent;           //player1
var pScore = 0;
var cScore = 0;

var m = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
];

$(document).ready(function () {
    $(".XO").click(function () {
        symbol = $(this).text();
        $("#compTurn").slideUp(1000);
        $("#playerTurn").slideDown(1000);
        $(".table").removeClass("disabled hide");
        $(".score").html("Player:" + pScore + " | Computer:" + cScore);
        $(".XO").addClass("hide");
        $("#reset").removeClass("hide");
    });
    $("#reset").click(function () {
        m = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ];
        freecells = 9;
        $("#compTurn").slideUp();
        $("#playerTurn").slideUp();
        $("#reset").addClass("hide");
        $("#result").empty();
        $("#result").addClass("hide");
        $(".cell").empty();
        $(".cell").removeClass("disabledCell");
        $(".table").addClass("hide");
        $(".XO").removeClass("hide");
        $(".score").empty();
        pScore=0;
        cScore=0;
    });
    $(".cell").click(function () {
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
        $(".table").addClass("disabledTable");
        var cellId = parseInt($(this).attr("id"));
        playerMatrixMove(cellId);
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

function playerMatrixMove(cellId) {
    var i = Math.floor((cellId - 1) / 3);
    var j = Math.floor((cellId - 1) % 3);
    m[i][j] = opponent;
    var playerWin = checkWinner(m, comp);
    if (playerWin) {
        pScore++;
        $("#playerTurn").slideUp(1000);
        setTimeout(function () {
            $("#result").removeClass("hide");
            $("#result").text("You won!!");
            $(".table").addClass("disabled");
        }, 1000);
        setTimeout(function () {
            resetGamePlayerTurn();
        }, 2000);
    } else if (freecells === 0 && !playerWin) {
        $("#playerTurn").slideUp(1000);
        setTimeout(function () {
            $("#result").removeClass("hide");
            $("#result").text("It's a draw!!");
            $(".table").addClass("disabled");
        }, 1000);
        setTimeout(function () {
            resetGamePlayerTurn();
        }, 2000);
    } else {
        $("#compTurn").slideDown(1000);
        $("#playerTurn").slideUp(1000);
        setTimeout(function () {
            compMatrixMove(m)
        }, 2000); //passing updated matrix, computer's playing symbol value, and number of free cells
    }
}

function compMatrixMove(m) {
    var gameStats = analyzeMoves(m, comp, 0);
    var i = gameStats.i;
    var j = gameStats.j;
    var cellId = (i * 3) + 1 + j;
    m[i][j] = comp;
    $("#" + cellId).text(compSymbol);
    $("#" + cellId).addClass("disabledCell");
    freecells--;
    var compWin = checkWinner(m, comp);
    if (compWin) {
        cScore++;
        $("#compTurn").slideUp(1000);
        setTimeout(function () {
            $("#result").removeClass("hide");
            $("#result").text("You lost!!");
            $(".table").addClass("disabled");
        }, 1000);
        setTimeout(function () {
            resetGameCompTurn();
        }, 2000);

    } else if (freecells === 0 && !compWin) {
        $("#compTurn").slideUp(1000);
        setTimeout(function () {
            $("#result").removeClass("hide");
            $("#result").text("It's draw!!");
            $(".table").addClass("disabled");
        }, 1000);
        setTimeout(function () {
            resetGameCompTurn();
        }, 2000);
    } else {
        $("#compTurn").slideUp(1000);
        $("#playerTurn").slideDown(1000);
        $(".table").removeClass("disabledTable");
    }
}

function resetGameCompTurn() {
    m = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    freecells = 9;
    $("span.score").html("Player:" + pScore + " | Computer:" + cScore);
    $("#result").empty();
    $("#result").addClass("hide");
    $(".cell").empty();
    $(".cell").removeClass("disabledCell");
    $(".table").removeClass("disabled hide");
    $("#compTurn").slideDown(1000);
    $("#playerTurn").slideUp(1000);
    setTimeout(function () {
        compMatrixMove(m);
    }, 2000);
}

function resetGamePlayerTurn() {
    m = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ];
    freecells = 9;
    $("span.score").html("Player:" + pScore + " | Computer:" + cScore);
    $("#result").empty();
    $("#result").addClass("hide");
    $(".cell").empty();
    $(".cell").removeClass("disabledCell");
    $(".table").removeClass("disabled disabledTable hide");
    $("#compTurn").slideUp(1000);
    $("#playerTurn").slideDown(1000);
}



