class Rectangle{
    constructor(Location, Velocity, Dim) {
        this.x = Location.x;
        this.y = Location.y;
        this.w = Dim.w;
        this.h = Dim.h
        this.velocity = Velocity;
        this.bounceCount = 0;
        this.color = "rgba(69, 150, 160, 0.40)";
        this.currentColor = "rgba(69, 150, 160, 0.40)";
        this.hitColor = "rgba(22, 253, 161, 0.45)";
        this.time = 0;
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
        tint(this.currentColor); 
        image(general.logoImg, this.x, this.y);
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