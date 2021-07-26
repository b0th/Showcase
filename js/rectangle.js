class Rectangle {
    constructor(Location, Velocity, Dim, 
        ImgObject=general.logoImg, Special=undefined) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.bounceCount = 0;
        this.time = 0;
        this.original = ImgObject;
        this.img = ImgObject;
        this.special = Special;
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
        image(this.img, this.x, this.y);
        fill("rgba(0, 0, 0, 0.40)");
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

RectangleSpecial = {
    Reset: {
        callback: () => general.rectangles.forEach(rectangle => {
            rectangle.bounceCount = 0;
        })
    },
    boostHit: {
        callback: () => general.rectangles.forEach(rectangle => {
            Cursor.startTimer(rectangle, true);
            Cursor.repulsive(rectangle, true);
            rectangle.bounceCount++
        })
    }
}