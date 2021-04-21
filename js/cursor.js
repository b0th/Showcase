Cursor = {
    radius: 300,
    drawCircle: () => {
        noStroke();
        fill(`rgba(255,255,255, 0.10)`);
        circle(mouseX, mouseY, Cursor.radius);
    },
    is_InCircle: (rectangle) => {
        return dist(mouseX, mouseY, rectangle.x, rectangle.y) < 200;
    },
    repulsive: (rectangle) => {
        if (!Cursor.is_InCircle(rectangle)) return;
        rectangle.time = Date.now();
        pos = createVector(rectangle.x + rectangle.velocity.x * 5, rectangle.y + rectangle.velocity.y * 5);
            if (!rectangle.is_hit(pos.x, pos.y)) {
                rectangle.x = pos.x;
                rectangle.y = pos.y;
            }
    },
    startTimer: (rectangle) => {
        if (!Cursor.is_InCircle(rectangle)) return;
        rectangle.time = Date.now();
        rectangle.img = general.hitlogoImg;
        
    },
    changeColor: (rectangle) => {
        rectangle.img = general.logoImg;
        if (Date.now() - rectangle.time < (1 * 1000))
            rectangle.img = general.hitlogoImg;
    },
    pressed: (rectangle) => {
        if (!mouseIsPressed) return;
        Cursor.repulsive(rectangle);
        Cursor.startTimer(rectangle);
    }
}