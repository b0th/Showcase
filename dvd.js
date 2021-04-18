let width = 500;
let height = 500;
let rectangles = [];

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
        if (this.y <= 0 || this.y + this.h >= height) this.velocity.y *= -1;
        if (this.x <= 0 || this.x + this.w >= width) this.velocity.x *= -1;
    }
  
    draw() {
        rect(this.x, this.y, this.w, this.h);
    }
}

randRange = (start, end) => {
    return Math.floor((Math.random() * 100)) % (end - (start - 1)) + start
}

init = (n) => {
    for (i=0; i < n; i++) {
        rectangles.push(new Square(
        {x: 10, y: 10}, {x: randRange(1, 10), y: randRange(1, 10)},
        {w: randRange(10, 50), h: randRange(10, 50)}, 255));
    }
}

runSquares = (rectangleArray) => {
    for (var rectangle of rectangleArray) {
        rectangle.update();
        rectangle.hitWall();
        rectangle.draw();
    }
}

setup = () => {
    createCanvas(500, 500);
    init(50);
}

draw = () => {
    background(220);
    runSquares(rectangles);
}