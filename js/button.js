class Buttons {
    constructor() {
        this.array = [];
    }
    
    addButton (Id, Location, Img, Callback) {
        this.array.push(new Button(Id, Location, Img, Callback));
    }

    funcForLopp () {
        this.array.forEach(button => {
            button.onClick(100);
            button.draw();
        });
    }

    hideButtons () {
        this.array.forEach(button => {
            button.hidden ^= true;
        });
    }
}

mouseReleased = (callback) => {
}

class Button {
    constructor(Id, Location, Img, Callback) {
        this.id = Id;
        this.x = Location.x;
        this.y = Location.y;
        this.img = Img;
        this.onClickCallback = Callback;
        this.cooldown = Date.now();
        this.hidden = false;
    }

    isCursorOn () {
        return (mouseX >= this.x && mouseX <= this.x + this.img.width)
        && (mouseY >= this.y && mouseY <= this.y + this.img.height);
    }

    onClick (cooldown) {
        if (!this.isCursorOn() || !mouseIsPressed || this.hidden) return;
        if (Date.now() - this.cooldown < cooldown) return;
        this.cooldown = Date.now();
        this.onClickCallback();
    }

    draw () {
        if (this.hidden) return;
        image(this.img, this.x, this.y);
    }
}