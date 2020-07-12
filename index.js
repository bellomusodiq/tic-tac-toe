let turn = 'X' // or 'O'
let gameEnd = false;
counter = 0;

const vBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

const board = document.getElementById("board");

const squares = board.children;

const boardMap = id => {
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

const checkBoard = () => {
    // check horizontal vBoard[i][1]
    let win = false;
    for (let i = 0; i < 3; i++) {
        if (vBoard[i][0] && (vBoard[i][0] === vBoard[i][1]) && (vBoard[i][1] === vBoard[i][2])) {
            win = true;
        }
    }
    // check vertical vBoard[1][i]
    for (let i = 0; i < 3; i++) {
        if (vBoard[0][i] && (vBoard[0][i] === vBoard[1][i]) && (vBoard[1][i] === vBoard[2][i])) {
            win = true;
        }
    }
    // check diagonal
    if (vBoard[0][0] && (vBoard[0][0] === vBoard[1][1]) && (vBoard[1][1] === vBoard[2][2])) {
        win = true;
    }
    if (vBoard[0][2] && (vBoard[0][2] === vBoard[1][1]) && (vBoard[1][1] === vBoard[2][0])) {
        win = true;
    }
    return win;
}

const placeToBoard = (id, square) => {
    if (!gameEnd) {

        const coordinates = boardMap(id); // [0,1]
        // coordinates[0] = 0
        // coordinates[1] = 1
        // if there is either X or O on the square, don't do anythin
        if (!vBoard[coordinates[0]][coordinates[1]]) {

            vBoard[coordinates[0]][coordinates[1]] = turn;
            counter++;
            if (checkBoard()) {
                alert(`${turn} wins`);
                gameEnd = true;
            }
            // double for loop
            // counter = 0
            // for (let i=0; i<vBoard.length; i++) {
            //     for (let j=0; j<vBoard[i]; j++) {
            //         if (vBoard[i][j]) {
            //             counter++;
            //         }
            //     }
            // } -> O(1) > O(n) > O(n2)
            if (counter === 9) {
                alert('game ended in a draw');
            }
            square.innerHTML = turn;
            turn = turn === 'X' ? 'O' : 'X';
        }
    }
}

for (let square of squares) {
    square.addEventListener('click', (e) => {
        const id = square.getAttribute('id'); // 1 => vBoard[0][0]
        placeToBoard(id, square);
    })
}

