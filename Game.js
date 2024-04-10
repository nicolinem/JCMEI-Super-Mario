class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.ctx.imageSmoothingEnabled = false;
    this.handleLevelCompletion = this.handleLevelCompletion.bind(this);
    this.handleDeath = this.handleDeath.bind(this);
    this.resetLevel = this.resetLevel.bind(this);
    this.animationFrameId = null;
    this.isRunning = false;
    this.timer = 300;
    this.lastTime = Date.now();
    this.MarioLives = 3;
  }

  startGameLoop() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    const step = () => {
      if (!this.isRunning) return;

      const currentTime = Date.now();
      const deltaTime = (currentTime - this.lastTime) / 1000; // Convert ms to seconds
      this.lastTime = currentTime; // Update lastTime to the current time

      if (this.timer <= 0) {
        this.handleGameOver();
        return;
      }

      this.timer -= deltaTime;

      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          jumping: this.directionInput.jump,
          map: this.map,
          goombas: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Goomba
          ),
          koopas: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Koopa
          ),
          powerups: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Mushroom
          ),
          coins: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Coin
          ),
        });
      });

      // Draw Background
      this.map.drawBackgroundImage(this.ctx);

      // Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx);
      });

      this.map.drawScore(this.ctx);
      this.drawTimer();
      this.drawLives();

      this.animationFrameId = requestAnimationFrame(step);
    };
    step();
  }

  showTitleScreen() {
    if (this.titleScreen) {
      this.titleScreen.removeEventListeners();
    }

    const startTitle = () => {
      this.titleScreen = new TitleScreen(this.canvas, (selectedOption) => {
        if (selectedOption === "Instructions") {
          this.showInstructions();
        } else {
          console.log(`${selectedOption} selected. Starting game...`);
          this.init(selectedOption === "Level 1" ? 1 : 2);
        }
      });
      this.titleScreen.init();
    };

    startTitle();
  }

  showInstructions() {
    const instructionsPage = new InstructionsPage(this.canvas, () => {
      instructionsPage.clear(); // Clear instructions page
      this.showTitleScreen();
    });
    instructionsPage.init();
  }

  handleLevelCompletion() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;

    const timeBonus = Math.ceil(this.timer) * 3;
    this.map.score += timeBonus;

    setTimeout(() => {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
      this.ctx.fillStyle = "#000";
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        `Score: ${this.map.score}`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );

      this.ctx.fillText(
        "Press any key or click to return to the title screen",
        this.canvas.width / 2,
        this.canvas.height / 2 + 30
      );

      const returnToTitleScreenHandler = () => {
        this.canvas.removeEventListener("click", returnToTitleScreenHandler);
        document.removeEventListener("keydown", returnToTitleScreenHandler);
        this.showTitleScreen();
      };

      this.canvas.addEventListener("click", returnToTitleScreenHandler, {
        once: true,
      });
      document.addEventListener("keydown", returnToTitleScreenHandler, {
        once: true,
      });
    }, 1000);
  }

  drawTimer() {
    const formattedTime = Math.ceil(this.timer);
    this.ctx.fillStyle = "#FFFFFF"; // Red color for the timer font
    this.ctx.font = "16px Arial"; // Set the font size and type
    this.ctx.textAlign = "left"; // Align text to the left
    this.ctx.fillText(`Time: ${formattedTime}`, 10, 40); // Position the timer below the score
  }

  drawLives() {
    this.ctx.fillStyle = "#FFFFFF"; // White color for the text
    this.ctx.font = "16px Arial"; // Font size and style
    this.ctx.textAlign = "left"; // Alignment of text
    this.ctx.fillText(`Lives: ${this.MarioLives}`, 10, 60); // Position the lives display below the timer
  }

  resetLevel() {
    this.map = new GameLevel(
      {
        lowerSrc: "/images/bg.png", // Adjust this path as necessary
        coins: 0,
        mapID: this.map.mapID, // Keep the current level ID or set as needed
        gameObjects: {
          mario: new Mario({
            isPlayerControlled: true,
            x: 4 * 16,
            y: 5 * 16,
            src: "/images/characters/mario-sprites.png",
          }),
        },
      },
      this.handleLevelCompletion,
      this.handleDeath
    );
    this.timer = 300;
    this.map.mountObjects();

    this.directionInput.init(this.map.gameObjects.mario);
    this.startGameLoop();
  }

  handleGameOver() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;

    // Display Game Over message
    this.ctx.fillStyle = "#FF0000";
    this.ctx.font = "24px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.canvas.addEventListener(
      "click",
      () => {
        this.showTitleScreen(); // Return to title screen on click
      },
      { once: true }
    );
  }

  handleDeath() {
    this.MarioLives -= 1;
    if (this.MarioLives === 0) {
      this.handleGameOver();
    } else {
      this.resetLevel();
    }
  }

  init(mapID) {
    if (this.titleScreen) {
      this.titleScreen.removeEventListeners();
    }

    const mapConfig = {
      lowerSrc: "/images/bg.png",
      coins: 0,
      mapID: mapID,
      gameObjects: {
        mario: new Mario({
          isPlayerControlled: true,
          x: 4 * 16,
          y: 5 * 16,
          src: "/images/characters/mario-sprites.png",
        }),
      },
    };

    this.map = new GameLevel(
      mapConfig,
      this.handleLevelCompletion,
      this.handleDeath
    );
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init(this.map.gameObjects.mario);

    this.startGameLoop();
  }
}
