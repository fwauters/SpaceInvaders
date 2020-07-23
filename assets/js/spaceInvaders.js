// Variables---------------------------------------------------------------------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let shipHeight = 10;
let shipWidth = 40;
// Starting x position of the ship
let shipXPosOne = (canvas.width - shipWidth) / 2;
let shipXPosTwo = (canvas.width / 2) - (shipWidth / 4);

let rightPressed = false;
let leftPressed = false;

// Keys--------------------------------------------------------------------------------------------------------------------------

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Functions---------------------------------------------------------------------------------------------------------------------

function keyDownHandler(e) {
    // When left or right key is pressed --> corresponding variable = true
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    // When left or right key stop to be pressed --> corresponding variable = false
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function startMessage() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    // Define and position text(text, xPos, yPos)
    ctx.fillText("Welcome in my version of Space Invaders.", 80, 50);
    ctx.fillText("Use the arrow keys left and right to move", 84, 80);
    ctx.fillText("and the spacebar to shoot.", 130, 110);
    ctx.fillText("When you're ready, press the button Play to start the game.", 30, 200);
}

function drawShip() {
    ctx.beginPath();
    // Define rectangle(pos x from topLeft, pos y from topLeft, width, height)
    ctx.rect(shipXPosOne, canvas.height - shipHeight, shipWidth, shipHeight);
    ctx.rect(shipXPosTwo, canvas.height - (shipHeight * 2), shipWidth / 2, shipHeight * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShip();

    if (rightPressed) {
        shipXPosOne += 7;
        shipXPosTwo += 7;
        if (shipXPosOne + shipWidth > canvas.width) {
            shipXPosOne = canvas.width - shipWidth;
            shipXPosTwo = (canvas.width - shipWidth) + 10;
        }
    }
    else if (leftPressed) {
        shipXPosOne -= 7;
        shipXPosTwo -= 7;
        if (shipXPosOne < 0) {
            shipXPosOne = 0;
            shipXPosTwo = 10;
        }
    }
}

// Execution---------------------------------------------------------------------------------------------------------------------

startMessage();

document.getElementById("btn").addEventListener("click", () => {
    // Use draw function every 10ms
    interval = setInterval(draw, 10);
});