class InstructionsPage {
  constructor(canvas, onBackClicked) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.onBackClicked = onBackClicked; // Callback for when the back button is clicked
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Instruction text settings
    this.ctx.font = "12px Arial";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.textAlign = "left";
    let instructions = [
      "Controls:",
      "Move: Arrow keys or WASD",
      "Run: Hold Shift",
      "Become Normal: Press N",
      "Become Super: Press M",
      "Become Star: Press G",
      "Change World: Press '1' for World 1, '2' for World 2",
      "",
      "Click anywhere to return to the title screen.",
    ];

    // Draw each line of instructions
    instructions.forEach((line, index) => {
      this.ctx.fillText(line, 10, 20 + index * 20);
    });
  }

  init() {
    this.draw();
    this.canvas.addEventListener("click", this.onBackClicked, {
      once: true,
    });
    document.addEventListener("keydown", this.onBackClicked, {
      once: true,
    });
  }

  clear() {
    // Clear the canvas when leaving the instructions page
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
