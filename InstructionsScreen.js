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
      "Become Star: Press L",
      "Change World: Press '1' for World 1, '2' for World 2",
      "",
      "Click 'Back' to return to the title screen.",
    ];

    // Draw each line of instructions
    instructions.forEach((line, index) => {
      this.ctx.fillText(line, 10, 20 + index * 20);
    });

    // Draw the back button
    this.ctx.font = "14px Arial";
    this.ctx.fillStyle = "#FF0000"; // Red color for the back button
    this.ctx.fillText("Back", this.canvas.width - 50, this.canvas.height - 20);
  }

  addEventListeners() {
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check if the click is within the "Back" button area
      if (x >= this.canvas.width - 60 && y >= this.canvas.height - 30) {
        this.onBackClicked();
      }
    });
  }

  init() {
    this.draw();
    this.addEventListeners();
  }

  clear() {
    // Clear the canvas when leaving the instructions page
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
