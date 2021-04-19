class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.rectangles = [];
        this.totalBounce = 0;
    }
}

let general = new Global();

setup = () => {
    general.DVDImage = loadImage("./img/dvd.png");
    createCanvas(general.width, general.height);
    textSize(20);
    init(50);
}

class Square{
    constructor(Location, Velocity, Dim) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.bounceCount = 0;
        this.color = {r: random(256), g: random(256), b: random(256)}
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    is_hit() {
        return ((this.y <= 0 || this.y + this.h >= general.height) ||
            (this.x <= 0 || this.x + this.w >= general.width));
    }
    hit(hitted) {
        if (hitted) {
            this.bounceCount++;
            general.totalBounce++;
        }
    }
    hitWall() {
        if (this.y <= 0 || this.y + this.h >= general.height) this.velocity.y *= -1;
        if (this.x <= 0 || this.x + this.w >= general.width) this.velocity.x *= -1;
    }
    draw() {
        this.hit(this.is_hit());
        image(general.DVDImage, this.x, this.y);
        fill(this.color.r, this.color.g, this.color.b);
        text(`${this.bounceCount}`, this.x + 20, this.y - 17);
    }
    connectRectangle(rectangleArray) {
        rectangleArray.forEach(rectangle => {
        if (dist(this.x, this.y, rectangle.x, rectangle.y) < 250) {
            stroke('rgba(255, 255, 255, 0.25)');
            line(this.x, this.y, rectangle.x, rectangle.y);
        }
        })
    }
}

init = (n) => {
    for (i = 0; i < n; i++) {
        general.rectangles.push(new Square(
        {x: random(60, 400), y: random(60, 400)}, 
        {x: random(1, 5), y: random(1, 5)},
        {w: 50, h: 25}));
    }
}

// Control cursor
Cursor = {
    radius: 200,
    drawCircle: () => {
        noStroke();
        fill('rgba(255,255,255, 0.10)');
        circle(mouseX, mouseY, Cursor.radius);
    },
    repulsive: (rectangle) => {
        if (dist(rectangle.x, rectangle.y, mouseX, mouseY) < Cursor.radius) {
            rectangle.x += rectangle.velocity.x * 5;
            rectangle.y += rectangle.velocity.y * 5;
        }
    }
}

// Control rectangles
Rectangle = {
    drawTotalBounce: () => {
        textAlign(CENTER, TOP);
        fill(255, 255, 255);
        text(`Total bounces: ${general.totalBounce}`, 0, 12, width);
    },
    runSquares: (rectangleArray) => {
        rectangleArray.forEach(rectangle => {
            rectangle.update();
            rectangle.hitWall();
            Cursor.repulsive(rectangle);
            rectangle.connectRectangle(rectangleArray);
            rectangle.draw();
            Rectangle.drawTotalBounce();
        });
    }
}

draw = () => {
    background(0);
    Rectangle.runSquares(general.rectangles);
    Cursor.drawCircle();
}