class Global {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.buttons = new Buttons();
        this.piRepr;
        this.pi;
    }
}

let general = new Global();

setup = () => {
    //noCursor()
    createCanvas(general.width, general.height);
    general.back = loadImage("./img/back.png");
    general.hideDigit = loadImage("./img/show.png");
    general.piRepr = new PiElements(PiSquare, {w: 20, h: 20});
    general.piRepr.init_();
    textSize(general.piRepr.elementSize.w / 2);

    // Buttons
    general.buttons.addButton("back-to-index", {x: 20, y: 20}, general.back, () => {
        window.location.href = "/Showcase";
    });
    general.buttons.addButton("show-digits", {x: 20, y: 110}, general.hideDigit, () => {
        general.piRepr.showDigits ^= true;
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

class PiElements {
    constructor(Class, ElementSize) {
        this.colorPalette = [
            "#80ffdb64", "#72efdd64", 
            "#64dfdf64", "#56cfe164", 
            "#48bfe364", "#4ea8de64", 
            "#5390d964", "#5e60ce64", 
            "#6930c364", "#7400b864"
        ];
        this.class = Class;
        this.elementSize = ElementSize;
        this.array = [];
        this.showDigits = false;
    }
    
    init_ () {
        let n = PiElement.howMany(this.elementSize.w, this.elementSize.h, general.width, general.height);
        let x = 0;
        let y = 0;

        general.pi = getPi(Math.round(n)).toString();
        for (let i = 0; i < n; i++) {
            this.addElement(x, y, general.pi[i])
            x += this.elementSize.w;
            if (x + this.elementSize.w > general.width) {
                x = 0; y += this.elementSize.h;
            }
        }
    }

    addElement (x, y, digit) {
        this.array.push(new this.class(
            {x: x, y: y}, 
            {w: this.elementSize.w, h: this.elementSize.h}, 
            digit, color(this.colorPalette[digit])
        ));
    }

    funcForLopp () {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].draw();
            if (this.showDigits)
                this.array[i].drawDigit();
        }
    }
}

class PiElement {
    constructor(Location, Size, Digit, Color) {
        this.x = Location.x;
        this.y = Location.y;
        this.size = Size
        this.digit = Digit;
        this.color = Color;
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

    drawDigit () {
        fill("rgba(0, 0, 0, 0.70)");
        text(`${this.digit}`, this.x, this.y + this.size.h);
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

draw = () => {
    background("#2D4959");
    general.piRepr.funcForLopp();
    general.buttons.funcForLopp();
}