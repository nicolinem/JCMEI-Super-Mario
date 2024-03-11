class AnimatedTile extends Tile {
  constructor(config) {
    super(config);
    this.isAnimated = config.isAnimated || false;
    this.image.src = "/images/eventBlock_.png";
    this.animationFrames = config.animationFrames || [
      [this.type[0], this.type[1]],
    ];
    this.currentFrame = 0;
    this.frameCount = this.animationFrames.length;
    this.animationSpeed = config.animationSpeed || 10; // Number of draws between frame changes
    this.drawCounter = 0; // Counter to manage animation speed
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
      16,
      16,
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }
}
