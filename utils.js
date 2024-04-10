const utils = {
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return { x, y };
  },
};

const SCORES = {
  COIN: 200,
  GOOMBA: 100,
  KOOPA: 150,
  MUSHROOM: 300,
  STAR: 500,
  BREAK_BLOCK: 50,
  FLAGPOLE_BASE: 1000, // Base score for reaching the flagpole
};
