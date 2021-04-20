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
    noCursor()
    general.logoImg = loadImage("./img/logo.png");
    createCanvas(general.width, general.height);
    textSize(20);
    init(50);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

class Square{
    constructor(Location, Velocity, Dim) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.bounceCount = 0;
        this.color = {r: 0, g: 0, b: 0}
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    is_hit(x, y) {
        return ((y <= 0 || y + this.h >= general.height) ||
            (x <= 0 || x + this.w >= general.width));
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
        this.hit(this.is_hit(this.x, this.y));
        tint("rgba(69, 150, 160, 0.40)"); 
        image(general.logoImg, this.x, this.y);
        fill("rgba(0, 0, 0, 0.50)");
        text(`${this.bounceCount}`, this.x + 20, this.y - 17);
    }
    connectRectangle(rectangleArray) {
        rectangleArray.forEach(rectangle => {
        if (dist(this.x, this.y, rectangle.x, rectangle.y) < 250) {
            stroke("rgba(69, 127, 160, 0.20)");
            line(this.x, this.y, rectangle.x, rectangle.y);
        }
    });
    }
}

init = (n) => {
    for (i = 0; i < n; i++) {
        general.rectangles.push(new Square(
        {x: random(60, 400), y: random(60, 400)}, 
        {x: random(1, 5), y: random(1, 5)},
        {w: 50, h: 50}));
    }
}

// Control cursor
Cursor = {
    radius: 300,
    color: {r: 255, g: 255, b: 255},
    drawCircle: () => {
        noStroke();
        fill(`rgba(${Cursor.color.r},${Cursor.color.g},${Cursor.color.b}, 0.25)`);
        circle(mouseX, mouseY, Cursor.radius);
    },
    repulsive: (rectangle) => {
        if (dist(rectangle.x, rectangle.y, mouseX, mouseY) < Cursor.radius) {
            pos = createVector(rectangle.x + rectangle.velocity.x * 5, rectangle.y + rectangle.velocity.y * 5);
            if (!rectangle.is_hit(pos.x, pos.y)) {
                rectangle.x = pos.x;
                rectangle.y = pos.y;
            }
        }
    },
    changeColor: (color) => {
        color.r = Math.floor(random(256));
        color.g = Math.floor(random(256));
        color.b = Math.floor(random(256));
    },
    pressed: (rectangle) => {
        if (!mouseIsPressed) return;
        Cursor.repulsive(rectangle);
    }
}

mouseClicked = () => {
    Cursor.changeColor(Cursor.color);
}

// Control rectangles
Rectangle = {
    drawTotalBounce: () => {
        textAlign(CENTER, TOP);
        fill("rgba(255, 255, 255, 0.40)");
        text(`${general.totalBounce}`, 0, 25, width);
    },
    runSquares: (rectangleArray) => {
        rectangleArray.forEach(rectangle => {
            rectangle.update();
            Cursor.pressed(rectangle);
            rectangle.hitWall();
            rectangle.connectRectangle(rectangleArray);
            rectangle.draw();
            //Rectangle.drawTotalBounce();
        });
    }
}

draw = () => {
    background("#2D4959");
    Rectangle.runSquares(general.rectangles);
    Cursor.drawCircle();
}