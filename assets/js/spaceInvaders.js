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

class Ship {
    constructor(ctx, shipXPos = null) {
        this.ctx = ctx;
        this.shipXPos = shipXPos;
    }
    drawShip() {
        ctx.beginPath();
        ctx.rect(shipXPos+5, canvas.height-15, 15, 5);
        ctx.rect(shipXPos+35, canvas.height-15, 15, 5);
        ctx.rect(shipXPos, canvas.height-20, 55, 5);
        ctx.rect(shipXPos+5, canvas.height-25, 15, 5);
        ctx.rect(shipXPos+25, canvas.height-25, 5, 5);
        ctx.rect(shipXPos+35, canvas.height-25, 15, 5);
        ctx.rect(shipXPos+10, canvas.height-30, 10, 5);
        ctx.rect(shipXPos+35, canvas.height-30, 10, 5);
        ctx.rect(shipXPos+15, canvas.height-35, 10, 5);
        ctx.rect(shipXPos+30, canvas.height-35, 10, 5);
        ctx.rect(shipXPos+20, canvas.height-45, 15, 10);
        ctx.rect(shipXPos+25, canvas.height-50, 5, 5);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

// Variables---------------------------------------------------------------------------------------------------------------------

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let aliens = [];

let shipWidth = 55;
let shipHeight = 40;
let shipXPos = (canvas.width/2) - (shipWidth/2);

let laserXPos = shipXPos + (shipWidth/2) - 2.5;
let laserYPos = canvas.height - shipHeight - 5;

let interval;

// Keys--------------------------------------------------------------------------------------------------------------------------

//let spacePressed = false;
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);

// Functions---------------------------------------------------------------------------------------------------------------------

function keyDownHandler(e) {
    switch(e.keyCode) {
        //case 32: spacePressed = true;
        //break;
        case 37: leftPressed = true;
        break;
        case 39: rightPressed = true;
        break;
    }
}

function keyUpHandler(e) {
    switch(e.keyCode) {
        //case 32: spacePressed = false;
        //break;
        case 37: leftPressed = false;
        break;
        case 39: rightPressed = false;
        break;
    }
}

function startMessage() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    // Define and position text(text, xPos, yPos)
    // !!! DON'T FORGET TO REPOSITION THE TEXT !!!
    ctx.fillText("Welcome in my version of Space Invaders.", 80, 50);
    ctx.fillText("Use the arrow keys left and right to move", 84, 80);
    ctx.fillText("and the spacebar to shoot.", 130, 110);
    ctx.fillText("When you're ready, press the button Play to start the game.", 30, 200);
}

function moveLeft() {
    shipXPos -= 5;
    laserXPos = shipXPos + (shipWidth/2) - 2.5;
    if (shipXPos < 10) {
        shipXPos = 10;
    }
}

function moveRight() {
    shipXPos += 5;
    laserXPos = shipXPos + (shipWidth/2) - 2.5;
    if (shipXPos + shipWidth > canvas.width - 10) {
        shipXPos = canvas.width - shipWidth - 10;
    }
}

function drawLaser() {
    ctx.beginPath();
    ctx.rect(laserXPos, laserYPos, 5, 10);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

//function shootLaser() {
    
//}

function drawAliens() {
    for (let c = 0; c < 6; c++) {
        aliens[c] = [];
        for (let r = 0; r < 4; r++) {
            if (r === 0 || r === 2) {
                aliens[c][r] = new AlienOne();
                aliens[c][r].drawAlienOne(ctx, 10 + (c*65), 10 + (r*50));
            }
            else {
                aliens[c][r] = new AlienTwo();
                aliens[c][r].drawAlienTwo(ctx, 10 + (c*65), 10 + (r*50));
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAliens();

    let ship = new Ship();
    ship.drawShip(ctx, shipXPos);

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