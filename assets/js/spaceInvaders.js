// Classes-----------------------------------------------------------------------------------------------------------------------

class AlienOne {
    constructor(ctx, x = null, y = null) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
    drawAlienOne(ctx, x, y) {
        ctx.beginPath();
        ctx.rect(x+10, y, 5, 5);
        ctx.rect(x+40, y, 5, 5);
        ctx.rect(x+15, y+5, 5, 5);
        ctx.rect(x+35, y+5, 5, 5);
        ctx.rect(x+10, y+10, 35, 5);
        ctx.rect(x+5, y+15, 10, 5);
        ctx.rect(x+20, y+15, 15, 5);
        ctx.rect(x+40, y+15, 10, 5);
        ctx.rect(x, y+20, 55, 5);
        ctx.rect(x, y+25, 5, 10);
        ctx.rect(x+10, y+25, 35, 5);
        ctx.rect(x+50, y+25, 5, 10);
        ctx.rect(x+10, y+30, 5, 5);
        ctx.rect(x+15, y+35, 10, 5);
        ctx.rect(x+30, y+35, 10, 5);
        ctx.rect(x+40, y+30, 5, 5);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

class AlienTwo {
    constructor(ctx, x = null, y = null) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
    drawAlienTwo(ctx, x, y) {
        ctx.beginPath();
        ctx.rect(x+20, y, 15, 5);
        ctx.rect(x+10, y+5, 35, 5);
        ctx.rect(x+5, y+10, 45, 5);
        ctx.rect(x, y+15, 10, 5);
        ctx.rect(x+20, y+15, 15, 5);
        ctx.rect(x+45, y+15, 10, 5);
        ctx.rect(x, y+20, 55, 5);
        ctx.rect(x+15, y+25, 10, 5);
        ctx.rect(x+30, y+25, 10, 5);
        ctx.rect(x+10, y+30, 10, 5);
        ctx.rect(x+25, y+30, 5, 5);
        ctx.rect(x+35, y+30, 10, 5);
        ctx.rect(x, y+35, 10, 5);
        ctx.rect(x+45, y+35, 10, 5);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

// Variables---------------------------------------------------------------------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let aliensOne = [];
let aliensTwo = [];

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
   
    for (let i = 0; i < 6; i++) {
        aliensOne[i] = new AlienOne();
        aliensOne[i].drawAlienOne(ctx, 10 + (i*65), 10);
    }

    for (let i = 0; i < 6; i++) {
        aliensTwo[i] = new AlienTwo();
        aliensTwo[i].drawAlienTwo(ctx, 10 + (i*65), 60);
    }

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