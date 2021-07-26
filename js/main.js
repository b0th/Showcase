class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.rectangles = [];
        this.buttons = [];
        this.totalBounce = 0;
    }
}

let general = new Global();

randRange = (min, max) => { 
    return Math.floor(Math.random() * (max - min) + min);
} 

setup = () => {
    noCursor()
    /*
        Initializing multiple imgs because tint() sucks hard...
            > FPS drop (~60 -> ~20)
    */
    general.logoImg = loadImage("./img/logo.png");
    general.hitlogoImg = loadImage("./img/hitted_logo.png");
    general.logoReset = loadImage("./img/logo_to_chart.png");
    general.boostHits = loadImage("./img/boost_hits.png");
    general.hide = loadImage("./img/hide.png");
    createCanvas(general.width, general.height);
    textSize(20);
    init(50);
}

class Button {
    constructor(Id, Location, Img, Callback) {
        this.id = Id;
        this.x = Location.x;
        this.y = Location.y;
        this.img = Img;
        this.onClickCallback = Callback;
        this.clicked = false;
    }
    is_InCircle () {
        return dist(mouseX, mouseY, this.x, this.y) < Cursor.radius / 2;
    }
    onClick () {
        if (!this.is_InCircle() || !mouseIsPressed) return;
        this.onClickCallback();
        this.clicked ^= true;
    }
    draw () {
        image(this.img, this.x, this.y);
    }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

getSpecialRectangle = (Img, Callback, w, h) => {
    return new Rectangle(
        {x: random(w + 10, general.width - 100), y: random(h + 10, general.height - 100)}, 
        {x: 8, y: random(1, 8)}, {w: w, h: h}, Img, Callback);
}

init = (n) => {
    // Rectangles
    for (i = 0; i < n; i++) {
        general.rectangles.push(new Rectangle(
        {x: random(60, general.width - 100), y: random(60, general.height - 100)}, 
        {x: random(1, 5), y: random(1, 5)},
        {w: 50, h: 50}));
    }

    // Special rectangles
    general.rectangles.push(getSpecialRectangle(general.logoReset, RectangleSpecial.Reset, 70, 70));
    general.rectangles.push(getSpecialRectangle(general.boostHits, RectangleSpecial.boostHit, 70, 70));

    // Buttons
    general.buttons.push(new Button("hide-panel", {x: 20, y: 20}, general.hide, () => {
        document.getElementById("toggle-hide").hidden ^= 1
    }));
}

Main = {
    runRectangles: (rectangleArray) => {
        rectangleArray.forEach(rectangle => {
            rectangle.update();
            Cursor.pressed(rectangle);
            Cursor.callbackSpecial(rectangle);
            rectangle.hitWall();
            rectangle.connectRectangle(rectangleArray);
            rectangle.draw();
            Cursor.changeColor(rectangle);
        });
    },
    runButtons: (buttonsArray) => {
        buttonsArray.forEach(button => {
            button.onClick();
            button.draw();
        });
    }
}

draw = () => {
    background("#2D4959");
    Main.runRectangles(general.rectangles);
    Main.runButtons(general.buttons);
    Cursor.drawCircle();
}