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
    /*
        Initializing 2 imgs because tint() sucks hard...
            > FPS drop (~60 -> ~20)
    */
    general.logoImg = loadImage("./img/logo.png");
    general.hitlogoImg = loadImage("./img/hitted_logo.png");
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
        {x: random(60, general.width - 100), y: random(60, general.height - 100)}, 
        {x: random(1, 5), y: random(1, 5)},
        {w: 50, h: 50}));
    }
}

Main = {
    runSquares: (rectangleArray) => {
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
    Main.runSquares(general.rectangles);
    Cursor.drawCircle();
}