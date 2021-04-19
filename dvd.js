let width = window.innerWidth;
let height = window.innerHeight;
let rectangles = [];
let DVDImage;
let totalBounce = 0;

// Create rgba function

preload = () => {
    DVDImage = loadImage("./img/dvd.png")
}

setup = () => {
    createCanvas(width, height);
    textSize(12);
    init(100);
}

class Square {
    constructor(Location, Velocity, Dim) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.bounceCount = 0;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
  
    is_hit() {
        return ((this.y <= 0 || this.y + this.h >= height) ||
            (this.x <= 0 || this.x + this.w >= width));
    }

    hit(hitted) {
        if (hitted) {
            //tint(random(256), random(256), random(256));
            this.bounceCount++;
            totalBounce++;
        }
    }

    hitWall() {
        if (this.y <= 0 || this.y + this.h >= height) this.velocity.y *= -1;
        if (this.x <= 0 || this.x + this.w >= width) this.velocity.x *= -1;
    }

    draw() {
        this.hit(this.is_hit());
        image(DVDImage, this.x, this.y);
        text(`${this.bounceCount}`, this.x + 20, this.y - 17);
        fill(255, 255, 255);
    }
}

randRange = (start, end) => {
    return Math.floor((Math.random() * 100000)) % (end - (start - 1)) + start
}

init = (n) => {
    for (i = 0; i < n; i++) {
        rectangles.push(new Square(
        {x: randRange(60, 400), y: randRange(60, 400)}, {x: randRange(1, 5), y: randRange(1, 5)},
        {w: 50, h: 25}));
    }
}

drawTotalBounce = () => {
    textAlign(CENTER, TOP);
    text(`Total bounces: ${totalBounce}`, 0, 12, width);
    fill(255, 255, 255);
}

runSquares = (rectangleArray) => {
    for (var rectangle of rectangleArray) {
        rectangle.update();
        rectangle.hitWall();
        rectangle.draw();
        drawTotalBounce();
    }
}

draw = () => {
    background(0);
    runSquares(rectangles);
}