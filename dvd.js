let width = 500;
let height = 500;
let squares = [];

// Create rgba function

class Square {
    constructor(Location, Velocity, Dim, Color) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.color = Color;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
  
    hitWall() {
        if (this.y <= 0 || this.y >= height) this.velocity.y *= -1;
        if (this.x <= 0 || this.x >= width) this.velocity.x *= -1;
    }
  
    draw() {
        rect(this.x, this.y, this.w, this.h);
    }
}

init = (n) => {
    for (i=0; i < n; i++) {
        squares.push(new Square(
        {x: 10, y: 10}, {x: 8, y: 5},
        {w: 100, h: 100}, 255));
    }
}

runSquares = (squareArray) => {
    for (var square of squareArray) {
        square.update();
        square.hitWall();
        square.draw();
    }
}

function setup() {
    createCanvas(500, 500);
    init(50);
}

function draw() {
    background(220);
    runSquares(squares);
}