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

  init(mario) {
    document.addEventListener("keydown", (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.jumping = true;
      }

      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        mario.increaseSpeed();
      }

      if (e.code === "KeyM") {
        mario.transformToSuper();
      }
      if (e.code === "KeyN") {
        mario.transformToNormal();
      }
      if (e.code === "KeyL") {
        mario.transformToStar();
      }
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

      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        mario.resetSpeed();
      }
    });
  }
}
