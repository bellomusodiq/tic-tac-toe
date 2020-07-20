let turn = 'X';
let counter = 0;
document.getElementById("playerWin").style.display= 'none'


const board = document.getElementById("board");
const squares = board.children;

const vBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''] //
] // vBoard[i][j] = turn;

const mapBoard = id => {
    switch (id) {
        case '1':
            return [0, 0]
        case '2':
            return [0, 1]
        case '3':
            return [0, 2]
        case '4':
            return [1, 0]
        case '5':
            return [1, 1]
        case '6':
            return [1, 2]
        case '7':
            return [2, 0]
        case '8':
            return [2, 1]
        case '9':
            return [2, 2]
    }
}

const playGame = e => {
    let win = false;
    const square = e.target;
    const [X, Y] = mapBoard(square.getAttribute("id"));
    if (!vBoard[X][Y]) {
        vBoard[X][Y] = turn;
        counter++;
        // check for wins
        // horizontal wins
        // either (0,0 == 0,1 == 0,2) or (1,0 == 1,1 == 1,2) or (2,0 == 2,1 == 2,2)
        for (let i = 0; i < 3; i++) {
            if (vBoard[i][0] && (vBoard[i][0] === vBoard[i][1]) && (vBoard[i][1] === vBoard[i][2])) {
                win = true;
            }
        }
        // vertical wins
        // either (0,0 == 1,0 == 2,0) or (0,1 == 1,1 == 2,1) or (0,2 == 1,2 == 2,2)
        for (let i = 0; i < 3; i++) {
            if (vBoard[0][i] && (vBoard[0][i] === vBoard[1][i]) && (vBoard[1][i] === vBoard[2][i])) {
                win = true;
            }
        }
        // diagonal wins
        if (vBoard[0][0] && (vBoard[0][0] === vBoard[1][1]) && (vBoard[1][1] === vBoard[2][2])) {
            win = true;
        }
        if (vBoard[0][2] && (vBoard[0][2] === vBoard[1][1]) && (vBoard[1][1] === vBoard[2][0])) {
            win = true;
        }
        square.innerHTML = turn;
        if (win) {
            document.getElementById("board").style.display= 'none';
            document.getElementById("playerWin").style.display= 'block';
            document.getElementById("msg").innerHTML= `Player ${turn} Wins!!!`;
            setTimeout(() => {
                window.location.reload();
            }, 1100);
        }
        if (counter === 9) {
            document.getElementById("board").style.display= 'none';
            document.getElementById("playerWin").style.display= 'block';
            document.getElementById("msg").innerHTML= `Ended in A Draw!!!`;
            setTimeout(() => {
                window.location.reload();
            }, 1100)
        }
        turn = turn === 'X' ? 'O' : 'X';
    }
}


for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    square.addEventListener("click", e => {
        playGame(e)
    })
}




