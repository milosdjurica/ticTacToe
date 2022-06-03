let button = document.querySelector("button").addEventListener("click", handleRestart)
let playerDisplay = document.querySelector(".display-player")
let announcer = document.querySelector(".announcer")

let cells = Array.from(document.querySelectorAll(".cell"))

let currentPlayer = "X"
let isGameOver = false

let winner

let board = ["", "", "", "", "", "", "", "", ""]
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index))
});






function handleClick(cell, index) {
    if (!isGameOver && !isClicked(cell)) {
        cell.innerText = currentPlayer
        cell.classList.add(`player${currentPlayer}`)
        updateBoard(index)
        handleResultValidation()
        changePlayer()
    }
}


function isClicked(cell) {
    if (cell.innerText == "") {
        return false
    }
    return true
}


function updateBoard(index) {
    board[index] = currentPlayer
}


function changePlayer() {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    playerDisplay.innerText = currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)
}




function handleResultValidation() {
    // 8 because of 8 winConditions
    for (let i = 0; i < 8; i++) {
        // taking one winCon, ex: [3,4,5]
        const winCondition = winConditions[i]
        // check board on indexes 3,4,5
        const a = board[winCondition[0]]
        const b = board[winCondition[1]]
        const c = board[winCondition[2]]

        // if at least one of them is empty,
        // winCon is not satisfied and we can go for next iteration with continue
        if (a === '' || b === '' || c === '') {
            continue
        }

        // if all 3 equal, win con satisfied and its gameOver
        if (a === b && b === c) {
            isGameOver = true;
            break
        }
    }

    if (isGameOver) {
        announce(currentPlayer === "X" ? "X" : "O");
    }

    // if there arent empty fields, then its TIED because we already checked for gameOver
    if (!board.includes('') && !isGameOver)
        announce("Tie");
}


function announce(winner) {
    if (winner == "X") {
        announcer.innerHTML = "Player <span class='playerX'>X</span> Won!"
    } else if (winner == "O") {
        announcer.innerHTML = "Player <span class='playerO'>O</span> Won!"
    } else {
        announcer.innerText = "TIED GAME!"
    }
    announcer.classList.remove("hide")
}


function handleRestart() {
    board = ["", "", "", "", "", "", "", "", ""]
    isGameOver = false

    if (currentPlayer == "O") {
        changePlayer()
    }
    announcer.classList.add("hide")

    cells.forEach(cell => {
        cell.innerText = ""
        cell.classList.remove("playerX")
        cell.classList.remove("playerO")
    })
}

