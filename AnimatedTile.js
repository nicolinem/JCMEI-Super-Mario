class AnimatedTile extends Tile {
  constructor(config) {
    super(config);
    this.isAnimated = config.isAnimated || false;
    this.image.src = "/images/eventBlock_.png";
    this.hasItem = true;
    this.item = config.item || "";
    this.animationFrames = config.animationFrames || [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      [11, 0],
      [12, 0],
      [13, 0],
    ];
    this.currentFrame = 0;
    this.frameCount = this.animationFrames.length;
    this.animationSpeed = config.animationSpeed || 2; // Number of draws between frame changes
    this.drawCounter = 0; // Counter to manage animation speed
    this.map = config.map;
    this.imageSizeX = 16;
    this.imageSizeY = 16;
  }

  interact() {
    super.interact();

    if (this.hasItem) {
      if (this.item === "mushroom") {
        this.spawnMushroom();
      }
      if (this.item === "star") {
        this.spawnStar();
      }
      this.hasItem = false;
      this.updateSpriteSheet();
    }

    return "eventBlock";
  }

  updateSpriteSheet() {
    this.image.src = "/images/elements.png";
    this.currentFrame = 0;
    this.animationFrames = [[6, 0]];
    this.isAnimated = false;
    this.imageSizeX = 32;
    this.imageSizeY = 32;
  }

  spawnMushroom() {
    const mushroom = new Mushroom({
      x: this.x,
      y: this.y - 16, // Position the mushroom above the tile
      src: "/images/powerups.png", // Specify the source of the mushroom sprite
    });

    // Assuming the game has a way to access and add new game objects dynamically
    // You may need to adjust this part based on your game architecture
    this.map.gameObjects[
      `mushroom_${Object.keys(this.map.gameObjects).length}`
    ] = mushroom;

    // If your GameObjects require a mount call to be fully initialized, do that here
    mushroom.mount(this.map);
  }

  spawnStar() {
    const star = new Star({
      x: this.x,
      y: this.y - 16, // Position the star above the tile
      src: "/images/powerups.png", // Specify the source of the star sprite
    });

    // Assuming the game has a way to access and add new game objects dynamically
    // You may need to adjust this part based on your game architecture
    this.map.gameObjects[`star_${Object.keys(this.map.gameObjects).length}`] =
      star;

    // If your GameObjects require a mount call to be fully initialized, do that here
    star.mount(this.map);
  }

  updateAnimation() {
    if (!this.isAnimated || this.frameCount <= 1) return;

    this.drawCounter++;
    if (this.drawCounter >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.drawCounter = 0;
    }
  }

  draw(ctx) {
    if (!this.imageLoaded) return; // Only draw if the image is loaded

    this.updateAnimation(); // Update the animation frame

    const tileSizeWithSpacing = 16;
    const frame = this.animationFrames[this.currentFrame];
    const sx = frame[0] * tileSizeWithSpacing;
    const sy = frame[1] * tileSizeWithSpacing;

    ctx.drawImage(
      this.image,
      sx,
      sy,
      this.imageSizeX,
      this.imageSizeY,
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }
}
