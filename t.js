var m = [
    [1, 0, 1],
    [-1, 0, -1],
    [-1, -1, 1]
];


function printMatrix(m) {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            process.stdout.write(m[i][j] + " ")
        }
        process.stdout.write("\n")
    }
    process.stdout.write("\n")
}

function analyzeMoves(m, player, depth) {
    if (checkWinner(m, +!player)) {
        return {score: player === 1 ? 10 - depth: depth - 10}
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

// m[0][0] = 1;
// m[1][1] = 0;
// m[2][2] = 1;
r = analyzeMoves(m, 0, 0); // begin with X and empty matrix
console.log(r);
// printMatrix(r.bestMove.p);
//s = r.oWins + r.xWins + r.draws;
//console.log(r.oWins / s, r.xWins / s, r.draws / s);
