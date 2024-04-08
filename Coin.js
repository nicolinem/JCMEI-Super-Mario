class Coin extends GameObject {
  constructor(config) {
    super(config);
    this.src = "/images/coin_.png";
    this.sprite = new Sprite({
      gameObject: this,
      imageSizeX: 16,
      imageSizeY: 16,
      imageRenderX: 16,
      imageRenderY: 16,
      src: this.src,
      animations: {
        "idle-right": [
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
        ],
      },
      animationFrameLimit: config.animationFrameLimit || 8,
    });
  }

  update() {
    // Implement common update logic here if any
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: 16,
      height: 16,
    };
  }
}
