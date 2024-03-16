class GameLevel {
  constructor(config) {
    this.gameObjects = config.gameObjects || {};
    this.backgroundImage = new Image();
    this.backgroundImage.src = config.lowerSrc;

    this.tileSize = config.tileSize || 16;

    this.maps = {
      1: {
        part2: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        ],
        part1: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
          [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 5, 0, 0, 0, 0, 0, 12],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        // Add more parts as needed
      },
      // Add more maps as needed
    };

    this.loadMap(1);
  }

  loadMap(mapId) {
    const mapParts = this.maps[mapId];
    if (!mapParts) {
      console.error("Map data not found for mapId:", mapId);
      return;
    }
    this.tiles = [];
    let xOffset = 0; // Initialize the horizontal offset

    // Use an ordered list of map part keys if ordering is important
    const partKeys = Object.keys(mapParts).sort(); // This ensures parts are processed in order
    partKeys.forEach((partKey) => {
      const mapData = mapParts[partKey];
      this.spawnBlocks(mapData, xOffset);
      xOffset += mapData[0].length * this.tileSize; // Increase xOffset by the width of the current part
    });
  }

  spawnBlocks(mapData, xOffset) {
    mapData.forEach((row, rowIndex) => {
      row.forEach((tileCode, colIndex) => {
        const x = xOffset + this.tileSize * colIndex; // Adjust the x-coordinate with xOffset
        const y = this.tileSize * rowIndex;
        if (tileCode !== 0) {
          // Your existing logic to spawn tiles based on their code
          if (tileCode === 10) {
            this.tiles.push(
              new AnimatedTile({
                x: x,
                y: y,
                tileSize: this.tileSize,
                type: tileTypes[tileCode].spriteCoordinates,
                isAnimated: true,
                map: this,
                item: "mushroom",
              })
            );
          } else if (tileCode === 11) {
            this.tiles.push(
              new AnimatedTile({
                x: x,
                y: y,
                tileSize: this.tileSize,
                type: tileTypes[tileCode].spriteCoordinates,
                isAnimated: true,
                map: this,
                item: "star",
              })
            );
          } else if (tileCode === 12) {
            this.tiles.push(
              new AnimatedTile({
                x: x,
                y: y,
                tileSize: this.tileSize,
                type: tileTypes[tileCode].spriteCoordinates,
                isAnimated: true,
                map: this,
              })
            );
          } else if (tileTypes[tileCode]) {
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

  moveGoomba(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Goomba) {
        obj.x += x;
      }
    });
  }

  movePowerUps(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Mushroom || obj instanceof Star) {
        obj.x += x;
      }
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
