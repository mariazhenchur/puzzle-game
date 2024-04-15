const rows = 5;
const columns = 5;

let currTile;
let otherTile;

let turns = 0;

let initialState = [];
for (let i = 1; i <= rows * columns; i++) {
    initialState.push(i.toString());
}

function displayWellDoneMessage() {
    let wellDoneMessage = document.createElement("div");
    wellDoneMessage.textContent = "WELL DONE!!";
    wellDoneMessage.style.fontSize = "24px";
    wellDoneMessage.style.fontWeight = "bold";
    wellDoneMessage.style.marginBottom = "20px";

    let puzzleContainer = document.getElementById("board").parentNode;
    puzzleContainer.insertBefore(wellDoneMessage, document.getElementById("board"));
}

function checkIfSolved() {
    let currentTiles = [];
    document.querySelectorAll('#board img').forEach(tile => {
        currentTiles.push(tile.src.substring(tile.src.lastIndexOf('/') + 1, tile.src.lastIndexOf('.')));
    });

    for (let i = 0; i < initialState.length; i++) {
        if (initialState[i] !== currentTiles[i]) {
            return false;
        }
    }
    return true;
}

window.onload = function () {

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".png";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    if (checkIfSolved()) {
        displayWellDoneMessage();
    }
}