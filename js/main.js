class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.rectangles = [];
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


init = (n) => {
    for (i = 0; i < n; i++) {
        general.rectangles.push(new Rectangle(
        {x: random(60, 400), y: random(60, 400)},
        {x: random(1, 5), y: random(1, 5)},
        {w: 50, h: 50}));
    }
}

Main = {
    main: (rectangleArray) => {
        rectangleArray.forEach(rectangle => {
            rectangle.update();
            Cursor.pressed(rectangle);
            rectangle.hitWall();
            rectangle.connectRectangle(rectangleArray);
            rectangle.draw();
            Cursor.changeColor(rectangle);
        });
    }
}

draw = () => {
    background("#2D4959");
    Main.main(general.rectangles);
    Cursor.drawCircle();
}