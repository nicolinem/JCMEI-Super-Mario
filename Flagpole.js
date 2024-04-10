class Flagpole extends GameObject {
  constructor(config) {
    super(config);
    this.height = 140;

    this.sprite = new Sprite({
      gameObject: this,
      imageSizeX: 26,
      imageSizeY: 165,
      imageRenderX: 24,
      imageRenderY: 140,
      pushY: -124,
      src: "/images/flagpole.png",
    });
  }

  update(state) {}

  calculateScore(mario) {
    const marioBox = mario.getBoundingBox();
    const baseY = this.y + this.height;
    const heightReached = baseY - (marioBox.y + marioBox.height);
    const percentageHeightReached = heightReached / this.height;

    const score = Math.round(percentageHeightReached * SCORES.FLAGPOLE_BASE);
    return score;
  }

  getBoundingBox() {
    return {
      x: this.x + 14,
      y: this.y - this.height,
      width: 4,
      height: this.height,
    };
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
