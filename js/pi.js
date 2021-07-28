class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.square = []
        this.buttons = new Buttons();
        this.pi;
    }
}

let general = new Global();

setup = () => {
    //noCursor()
    createCanvas(general.width, general.height);
    textSize(20);
    general.back = loadImage("./img/back.png");
    general.square = _init(PiSquare, {w: 10, h: 10});

    // Buttons
    general.buttons.addButton("back-to-index", {x: 20, y: 20}, general.back, () => {
        window.location.href = "/";
    });
}

getPi = (digits) => {
    let i = 1n;
    let x = 3n * (10n ** (BigInt(digits) + 20n));
    let pi = x;

    while (x > 0) {
        x = x * i / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
    }
    return pi / (10n ** 20n);
}

colorPalette = [
    "#80ffdb64", "#72efdd64", 
    "#64dfdf64", "#56cfe164", 
    "#48bfe364", "#4ea8de64", 
    "#5390d964", "#5e60ce64", 
    "#6930c364", "#7400b864"
]

class PiElement {
    constructor(Location, Size, Digit) {
        this.x = Location.x;
        this.y = Location.y;
        this.size = Size
        this.digit = Digit;
        this.color = colorPalette[Digit];
    }

    static howManyOnX (w, maxX) { return Math.floor(maxX / w)}
    static howManyOnY (h, maxY) { return Math.floor(maxY / h)}
    // Circle is calculated as a square
    static howMany (w, h, maxX, maxY) { return this.howManyOnX(w, maxX) * this.howManyOnY(h, maxY) }

    // Check for element out of the windows
    isOut (maxX, maxY) {
        return (this.x + this.w > maxX)     ||
                (this.y + this.h > maxY)    ||
                (this.x < 0)                ||
                (this.y < 0);
    }
}

class PiSquare extends PiElement {
    draw () {
        fill(color(this.color));
        noStroke();
        rect(this.x, this.y, this.size.w, this.size.h);
    }
}

class PiCircle extends PiElement {
    draw () {
        fill(color(this.color));
        noStroke();
        circle(this.x, this.y, this.size.w);
    }
}

_init = (Class, size) => {
    let n = PiElement.howMany(size.w, size.h, general.width, general.height);
    let x = 0;
    let y = 0;
    var ret = []

    general.pi = getPi(Math.round(n)).toString();
    for (let i = 0; i < n; i++) {
        ret.push(new Class({x: x, y: y}, {w: size.w, h: size.h}, Number(general.pi[i])));
        x += size.w;
        if (x + size.w > general.width) {
            x = 0; y += size.h;
        }
    };
    return ret;
}

Main = {
    runPiSquare : (squareArray) => {
        for (let i = 0; i < squareArray.length; i++) {
            squareArray[i].draw();
        }
    }
}

draw = () => {
    background("#2D4959");
    Main.runPiSquare(general.square);
    general.buttons.funcForLopp()
}