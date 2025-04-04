
var rows = 3;
var columns = 3;

var currTile;
var otherTile; // blank tile

var turns = 0;

//var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["5", "4", "2", "9", "7", "1", "3", "8", "6"];


window.onload = function() {
    for (let r=0; r < rows; r++) {
        for(let c=0; c < columns; c++) {

            //<img id="0-0" src="1.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./imgs/" + imgOrder.shift() + ".png";

            //DRAG FUNCTION
            tile.addEventListener("dragstart", dragStart); //click image to drag
            tile.addEventListener("dragover", dragOver);   //moving the inmage
            tile.addEventListener("dragenter", dragEnter); //dragging the image
            tile.addEventListener("dragleave", dragLeave); //dragged image leaveing another image
            tile.addEventListener("drop", dragDrop);       //drag an image over another image
            tile.addEventListener("dragend", dragEnd);     //after drag drop, swap images

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; //this + img being dragged
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
    otherTile = this; //this = img being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("1.png")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }


}