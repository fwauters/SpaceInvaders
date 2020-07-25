// Variables---------------------------------------------------------------------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let shipHeight = 10;
let shipWidth = 40;

let shipXPosOne = (canvas.width - shipWidth) / 2;
let shipXPosTwo = (canvas.width / 2) - (shipWidth / 4);

let laserXPos = shipXPosTwo + 7.5;
let laserYPos = canvas.height;

let interval;

// Keys--------------------------------------------------------------------------------------------------------------------------

let rightPressed = false;
let leftPressed = false;
//let spacePressed = false;

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);

// Functions---------------------------------------------------------------------------------------------------------------------

function keyDownHandler(e) {
    switch(e.keyCode) {
        case 39: rightPressed = true;
        break;
        case 37: leftPressed = true;
        break;
        //case 32: spacePressed = true;
        //break;
    }
}

function keyUpHandler(e) {
    switch(e.keyCode) {
        case 39: rightPressed = false;
        break;
        case 37: leftPressed = false;
        break;
        //case 32: spacePressed = false;
        //break;
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

function moveRight() {
    shipXPosOne += 3;
    shipXPosTwo += 3;
    laserXPos = shipXPosTwo + 7.5;
    if (shipXPosOne + shipWidth > canvas.width) {
        shipXPosOne = canvas.width - shipWidth;
        shipXPosTwo = (canvas.width - shipWidth) + 10;
    }
}

function moveLeft() {
    shipXPosOne -= 3;
    shipXPosTwo -= 3;
    laserXPos = shipXPosTwo + 7.5;
    if (shipXPosOne < 0) {
        shipXPosOne = 0;
        shipXPosTwo = 10;
    }
}

function drawLaser() {
    ctx.beginPath();
    ctx.rect(laserXPos, laserYPos, 5, 5);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

//function shootLaser() {
    
//}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShip();
    drawLaser();

    /*if (spacePressed) {
        shootLaser();
    }*/
    if (rightPressed) {
        moveRight();
    }
    if (leftPressed) {
        moveLeft();
    }
}

// Execution---------------------------------------------------------------------------------------------------------------------

startMessage();

document.getElementById("btn").addEventListener("click", () => {
    // Use draw function every 10ms
    interval = setInterval(draw, 10);
});