class Tile {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.tileSize = config.tileSize || 16;
    this.type = config.type;
    this.image = new Image();
    this.image.src = "/images/tiles2transp6.png";
    this.imageSizeX = 16;
    this.imageSizeY = 16;
    this.imageLoaded = false;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.tileSize,
      height: this.tileSize,
    };
  }

  draw(ctx) {
    if (!this.imageLoaded) return; // Only draw if the image is loaded

    const tileSizeWithSpacing = 17;
    const sx = this.type[0] * tileSizeWithSpacing;
    const sy = this.type[1] * tileSizeWithSpacing;

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

    // ctx.strokeStyle = "red"; // Set the color of the bounding box line
    // ctx.lineWidth = 0.5; // Set the line width of the bounding box
    // ctx.strokeRect(this.x, this.y, this.tileSize, this.tileSize);
  }
}
