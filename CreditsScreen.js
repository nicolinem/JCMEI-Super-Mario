class CreditsScreen {
  constructor(canvas, onBackClicked) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.onBackClicked = onBackClicked; // Callback for when the back button is clicked
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#FFFFFF"; // White color for text
    this.ctx.textAlign = "center";

    // Title
    this.ctx.fillText("Game Credits", this.canvas.width / 2, 30);

    this.ctx.font = "12px Arial";

    // Credits
    const credits = [
      "By: Nicoline and Julius",
      "Audio: themushroomkingdom.net/media/smb/wav",
      "sprites: spriters-resource.com/nes/supermariobros",
      "Click anywhere to return to the title screen.",
    ];

    credits.forEach((line, index) => {
      this.ctx.fillText(line, this.canvas.width / 2, 60 + index * 30);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
