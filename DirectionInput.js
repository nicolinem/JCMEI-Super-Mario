class DirectionInput {
  constructor() {
    this.heldDirections = [];
    this.jumping = false;

    this.map = {
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  get jump() {
    return this.jumping;
  }

  get direction() {
    return this.heldDirections[0];
  }

  init(gameInstance) {
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.jumping = true;
      }
      if (e.code === "Digit1") {
        gameInstance.switchWorld(1);
      }
      if (e.code === "Digit2") {
        gameInstance.switchWorld(2);
      }
      if (e.code === "KeyM") {
        gameInstance.map.gameObjects.mario.transformToSuper();
      }
      if (e.code === "KeyN") {
        gameInstance.map.gameObjects.mario.transformToNormal();
      }
      if (e.code === "KeyG") {
        gameInstance.map.gameObjects.mario.transformToStar();
      }

      // Existing transformations and speed changes
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        gameInstance.map.gameObjects.mario.increaseSpeed();
      }
      // More code here for other transformations...
    });

    document.addEventListener("keyup", (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.jumping = false;
      }
      // Reset speed on key up, etc.
    });
  }
}
