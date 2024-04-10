class BreakableTile extends Tile {
  constructor(config) {
    super(config);
    this.image.src = "/images/breakable.png";
    this.map = config.map;
    this.imageSizeX = 16;
    this.imageSizeY = 16;
  }

  interact(state) {
    if (state === "normal") return;
    this.map.removeTile(this);
    this.map.increaseScore(SCORES.BREAK_BLOCK);
  }

  draw(ctx) {
    super.draw(ctx);
  }
}
