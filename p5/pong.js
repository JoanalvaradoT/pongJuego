let ball;
let leftPaddle, rightPaddle;
let leftScore = 0, rightScore = 0;
let ballSpeedIncrease = 0.1;
const winningScore = 1;

function setup() {
    createCanvas(800, 400);
    ball = new Ball();
    leftPaddle = new Paddle(true);
    rightPaddle = new Paddle(false);
}

function draw() {
    background(0);
    drawCenterLine();
    
    // Mostrar puntuación
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text(leftScore, width / 4, 20);
    text(rightScore, (3 * width) / 4, 20);

    // Movimiento y dibujo de objetos
    ball.update();
    ball.checkCollision(leftPaddle, rightPaddle);
    ball.show();

    leftPaddle.update();
    rightPaddle.update();
    leftPaddle.show();
    rightPaddle.show();
    
    // Verificar si alguien gana
    if (leftScore >= winningScore || rightScore >= winningScore) {
        textSize(50);
        text("¡Juego Terminado!", width / 2, height / 2);
        noLoop();
    }
}

function keyPressed() {
    if (key === 'W' || key === 'w') leftPaddle.move(-10);
    if (key === 'S' || key === 's') leftPaddle.move(10);
    if (keyCode === UP_ARROW) rightPaddle.move(-10);
    if (keyCode === DOWN_ARROW) rightPaddle.move(10);
}

function keyReleased() {
    if (key === 'W' || key === 'w' || key === 'S' || key === 's') leftPaddle.move(0);
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) rightPaddle.move(0);
}

class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.size = 15;
        this.xSpeed = random([-4, 4]);
        this.ySpeed = random(-3, 3);
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }

        if (this.x < 0) {
            rightScore++;
            this.reset();
        } else if (this.x > width) {
            leftScore++;
            this.reset();
        }
    }

    checkCollision(leftPaddle, rightPaddle) {
        if (this.x - this.size / 2 < leftPaddle.x + leftPaddle.w &&
            this.y > leftPaddle.y && this.y < leftPaddle.y + leftPaddle.h) {
            this.xSpeed *= -1.1; // Rebote y aumento de velocidad
        }

        if (this.x + this.size / 2 > rightPaddle.x &&
            this.y > rightPaddle.y && this.y < rightPaddle.y + rightPaddle.h) {
            this.xSpeed *= -1.1; // Rebote y aumento de velocidad
        }
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}

class Paddle {
    constructor(isLeft) {
        this.w = 10;
        this.h = 80;
        this.y = height / 2 - this.h / 2;
        this.x = isLeft ? 10 : width - 20;
        this.speed = 0;
    }

    move(speed) {
        this.speed = speed;
    }

    update() {
        this.y += this.speed;
        this.y = constrain(this.y, 0, height - this.h);
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
}

function drawCenterLine() {
    stroke(255);
    strokeWeight(2);
    for (let i = 0; i < height; i += 20) {
        line(width / 2, i, width / 2, i + 10);
    }
}
