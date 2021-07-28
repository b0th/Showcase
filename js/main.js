class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.rectangles = [];
    }
}

let general = new Global();

setup = () => {
    //noCursor()
    /*
        Initializing multiple imgs because tint() sucks hard...
            > FPS drop (~60 -> ~20)
    */
    general.logoImg = loadImage("./img/logo.png");
    general.hitlogoImg = loadImage("./img/hitted_logo.png");
    general.logoReset = loadImage("./img/logo_to_chart.png");
    general.boostHits = loadImage("./img/boost_hits.png");
    general.hide = loadImage("./img/hide.png");
    general.pi = loadImage("./img/pi_button.png");
    general.buttons = new Buttons();
    createCanvas(general.width, general.height);
    textSize(20);
    init(50);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight) }

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
    general.buttons.addButton("hide-panel", {x: 20, y: 20}, general.hide, () => {
        document.getElementById("toggle-hide").hidden ^= 1;
    });
    general.buttons.addButton("pi", {x: 20, y: 110}, general.pi, () => {
        window.location.href = "/Showcase/pi.html";
    });
}

runRectangles = (rectangleArray) => {
    rectangleArray.forEach(rectangle => {
        rectangle.update();
        Cursor.pressed(rectangle);
        Cursor.callbackSpecial(rectangle);
        rectangle.hitWall();
        rectangle.connectRectangle(rectangleArray);
        rectangle.draw();
        Cursor.changeColor(rectangle);
    });
}

draw = () => {
    background("#2D4959");
    runRectangles(general.rectangles);
    Cursor.drawCircle();
    general.buttons.funcForLopp();
}