class GameLevel {
  constructor(config) {
    this.gameObjects = config.gameObjects || {};
    this.backgroundImage = new Image();
    this.backgroundImage.src = config.lowerSrc;
    this.loadMap(1);
    this.tileSize = config.tileSize || 16;
  }

  loadMap(mapId) {
    var map = {
      1: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 10, 10, 3, 5, 0, , 0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 6, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
    };

    const mapData = map[mapId];
    if (!mapData) {
      console.error("Map data not found for mapId:", mapId);
      return;
    }
    this.tiles = [];
    this.spawnBlocks(mapData);
  }

  spawnBlocks(mapData) {
    mapData.forEach((row, rowIndex) => {
      row.forEach((tileCode, colIndex) => {
        const x = 16 * colIndex;
        const y = 16 * rowIndex;
        if (tileCode !== 0) {
          if (tileCode === 10) {
            // Check if this is an animated event block
            this.tiles.push(
              new AnimatedTile({
                x: x,
                y: y,
                tileSize: this.tileSize,
                type: tileTypes[tileCode].spriteCoordinates,
                isAnimated: true,
                animationFrames: [
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
                ], // Example frame coordinates
                animationSpeed: 2, // Adjust as necessary
              })
            );
          } else if (tileTypes[tileCode]) {
            // Regular tile
            this.tiles.push(
              new Tile({
                x: x,
                y: y,
                tileSize: this.tileSize,
                type: tileTypes[tileCode].spriteCoordinates,
              })
            );
          }
        }
      });
    });
  }

  // filling the canvas with bg-image
  drawBackgroundImage(ctx) {
    // Calculate the best fit size for the canvas while keeping the image's aspect ratio
    const canvasAspectRatio = ctx.canvas.width / ctx.canvas.height;
    const imgAspectRatio =
      this.backgroundImage.width / this.backgroundImage.height;
    let drawWidth, drawHeight;

    if (imgAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas
      drawHeight = ctx.canvas.height;
      drawWidth =
        this.backgroundImage.width * (drawHeight / this.backgroundImage.height);
    } else {
      // Image is taller than canvas or has the same aspect ratio
      drawWidth = ctx.canvas.width;
      drawHeight =
        this.backgroundImage.height * (drawWidth / this.backgroundImage.width);
    }

    // Calculate the position to start drawing (center the image on the canvas)
    const x = (ctx.canvas.width - drawWidth) / 2;
    const y = (ctx.canvas.height - drawHeight) / 2;

    ctx.drawImage(this.backgroundImage, x, y, drawWidth, drawHeight);
    this.tiles.forEach((tile) => tile.draw(ctx));
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((o) => {
      o.mount(this);
    });
  }
}
