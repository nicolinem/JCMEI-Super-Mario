class TitleScreen {
  constructor(canvas, onSelectionDone) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.onSelectionDone = onSelectionDone; // Callback for when a selection is made
    this.options = [
      {
        label: "Level 1",
        description: "Start the adventure in the mushroom world.",
      },
      {
        label: "Level 2",
        description: "Explore the harsh desert and find the oasis.",
      },
      {
        label: "Instructions",
        description: "Learn how to play and control your character.",
      },
    ];
    this.currentOptionIndex = 0; // Tracks the current selected menu option
  }

  drawMenu() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Super Game Title", this.canvas.width / 2, 30);

    this.options.forEach((option, index) => {
      this.ctx.fillStyle =
        this.currentOptionIndex === index ? "#FFD700" : "#FFFFFF";
      this.ctx.fillText(option.label, this.canvas.width / 2, 70 + index * 30);
    });

    // Draw the description of the current option
    this.ctx.font = "12px Arial";
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(
      this.options[this.currentOptionIndex].description,
      this.canvas.width / 2,
      this.canvas.height - 30
    );
  }

  navigate(direction) {
    if (direction === "up") {
      this.currentOptionIndex =
        (this.currentOptionIndex - 1 + this.options.length) %
        this.options.length;
    } else if (direction === "down") {
      this.currentOptionIndex =
        (this.currentOptionIndex + 1) % this.options.length;
    }
    this.drawMenu();
  }

  selectOption() {
    const option = this.options[this.currentOptionIndex];
    this.onSelectionDone(option.label);
  }

  removeEventListeners() {
    if (this.keydownEventListener) {
      document.removeEventListener("keydown", this.keydownEventListener);
    }
  }

  addEventListeners() {
    this.keydownEventListener = (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.navigate("up");
          break;
        case "ArrowDown":
          this.navigate("down");
          break;
        case "Enter":
          this.selectOption();
          break;
      }
    };

    document.addEventListener("keydown", this.keydownEventListener);
  }

  init() {
    this.drawMenu();
    this.addEventListeners();
  }
}
