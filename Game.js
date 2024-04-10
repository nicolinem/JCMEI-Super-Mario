class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.ctx.imageSmoothingEnabled = false;
    this.handleLevelCompletion = this.handleLevelCompletion.bind(this);
    this.resetLevel = this.resetLevel.bind(this);
    this.animationFrameId = null;
    this.isRunning = false;
  }

  startGameLoop() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    const step = () => {
      if (!this.isRunning) return;
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

  handleLevelCompletion(score) {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;

    setTimeout(() => {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas
      this.ctx.fillStyle = "#000";
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        `Score: ${score}`,
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
      this.resetLevel
    );
    this.map.mountObjects();

    this.directionInput.init(this.map.gameObjects.mario);
    this.startGameLoop();
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
      this.resetLevel
    );
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init(this.map.gameObjects.mario);

    this.startGameLoop();
  }
}
