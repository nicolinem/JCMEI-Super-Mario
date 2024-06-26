class GameLevel {
  constructor(config, completionCallback, deathCallback) {
    this.mapID = config.mapID || 1;
    this.gameObjects = config.gameObjects || {};
    this.backgroundImage = new Image();
    this.backgroundImage.src = config.lowerSrc;
    this.tileSize = config.tileSize || 16;
    this.completionCallback = completionCallback;
    this.deathCallback = deathCallback;
    this.audioManager = config.audioManager;

    this.score = 0;

    this.maps = {
      1: {
        part5: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 14, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        part4: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 3],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1],
          [3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        part3: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 30, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 4, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 4],
          [0, 0, 0, 2, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        part2: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 13, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 6, 7, , 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
          [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
          [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
        ],
        part1: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 30, 10, 30, 30, 0, 0, 0, 14],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        ],
        // Add more parts as needed
      },
      2: {
        part3: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 13, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 26, 25, 25, 25, 25, 25, 25, 27, , 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0],
          [0, 0, 0, 23, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21],
          [0, 0, 0, 28, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
        ],
        part2: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 23, 21, 21, 21, 21, 21, 21, 21, 21, 24],
          [0, 0, 0, 0, 0, 23, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29],
          [
            0, 0, 23, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
            29,
          ],
        ],
        part1: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 13, 13, 13, 13, 13, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 26, 25, 25, 25, 27, , 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [
            21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 24,
            0,
          ],
          [
            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29,
            0,
          ],
          [
            22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 29,
            0,
          ],
        ],
        // Add more parts as needed
      },
      // Add more maps as needed
    };

    this.loadMap(this.mapID);
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

  removeOutOfBoundTiles() {
    this.tiles = this.tiles.filter((tile) => tile.x + tile.tileSize > 0);
  }

  removeTile(tile) {
    this.tiles = this.tiles.filter((t) => t !== tile);
  }

  updatePosition(shiftX) {
    // Shift all tiles when Mario reaches the middle of the screen
    this.tiles.forEach((tile) => (tile.x -= shiftX));
    this.removeOutOfBoundTiles(); // Remove tiles out of bounds after shifting
    this.movePowerUps(shiftX);
    this.moveGoomba(shiftX);
    this.moveKoopa(shiftX);
    this.moveCoins(shiftX);
    this.moveFlagpole(shiftX);
  }

  spawnBlocks(mapData, xOffset) {
    mapData.forEach((row, rowIndex) => {
      row.forEach((tileCode, colIndex) => {
        const x = xOffset + this.tileSize * colIndex; // Adjust the x-coordinate with xOffset
        const y = this.tileSize * rowIndex;

        if (tileCode !== 0) {
          switch (tileCode) {
            case 10:
              this.tiles.push(
                new AnimatedTile({
                  x: x,
                  y: y,

                  map: this,
                  item: "mushroom",
                })
              );
              break;
            case 11:
              this.tiles.push(
                new AnimatedTile({
                  x: x,
                  y: y,

                  map: this,
                  item: "star",
                })
              );
              break;
            case 12:
              this.tiles.push(
                new AnimatedTile({
                  x: x,
                  y: y,
                  map: this,
                })
              );
              break;
            case 13:
              this.gameObjects[`coin_${x}_${y}`] = new Coin({
                x: x,
                y: y,
              });
              break;
            case 14:
              this.gameObjects[`goomba_${x}_${y}`] = new Goomba({
                x: x,
                y: y,
              });
              break;
            case 15:
              this.gameObjects[`koopa_${x}_${y}`] = new Koopa({
                x: x,
                y: y,
              });
              break;
            case 16:
              this.gameObjects[`flagpole`] = new Flagpole({
                x: x,
                y: y,
              });
              break;
            case 30:
              this.tiles.push(
                new BreakableTile({
                  x: x,
                  y: y,
                  tileSize: this.tileSize,
                  type: [6, 0],
                  map: this,
                })
              );
              break;
            default:
              if (tileTypes[tileCode]) {
                this.tiles.push(
                  new Tile({
                    x: x,
                    y: y,
                    tileSize: this.tileSize,
                    type: tileTypes[tileCode].spriteCoordinates,
                  })
                );
              }
              break;
          }
        }
      });
    });
  }

  moveGoomba(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Goomba) {
        obj.x -= x;
      }
    });
  }

  moveKoopa(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Koopa) {
        obj.x -= x;
      }
    });
  }

  moveCoins(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Coin) {
        obj.x -= x;
      }
    });
  }

  movePowerUps(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Mushroom || obj instanceof Star) {
        obj.x -= x;
      }
    });
  }

  moveFlagpole(x) {
    Object.values(this.gameObjects).forEach((obj) => {
      if (obj instanceof Flagpole) {
        obj.x -= x;
      }
    });
  }

  levelComplete() {
    this.score += this.gameObjects[`flagpole`].calculateScore(
      this.gameObjects.mario
    );
    this.audioManager.playSound("level_clear");
    this.completionCallback();
  }

  death() {
    this.deathCallback();
  }

  increaseScore(score) {
    this.score += score;
  }

  drawScore(ctx) {
    ctx.fillStyle = "#FFFFFF"; // White color for the score font
    ctx.font = "16px Arial"; // Set the font size and type
    ctx.textAlign = "left"; // Align text to the left
    ctx.fillText(`Score: ${this.score}`, 10, 20); // Position the score at x=10, y=20
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
