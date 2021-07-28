class Buttons {
    constructor() {
        this.array = [];
    }
    
    addButton (Id, Location, Img, Callback) {
        this.array.push(new Button(Id, Location, Img, Callback));
    }

    funcForLopp () {
        this.array.forEach(button => {
            button.onClick();
            button.draw();
        });
    }
}

class Button {
    constructor(Id, Location, Img, Callback) {
        this.id = Id;
        this.x = Location.x;
        this.y = Location.y;
        this.img = Img;
        this.onClickCallback = Callback;
        this.cooldown = Date.now();
    }
    isCursorOn () {
        return (mouseX >= this.x && mouseX <= this.x + this.img.width)
        && (mouseY >= this.y && mouseY <= this.y + this.img.height);
    }
    onClick () {
        if (!this.isCursorOn() || !mouseIsPressed) return;
        if (Date.now() - this.cooldown < 20) return;
        this.cooldown = Date.now();
        this.onClickCallback();
    }
    draw () {
        image(this.img, this.x, this.y);
    }
}