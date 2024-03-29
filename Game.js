class Game {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.ctx.imageSmoothingEnabled = false;
  }

  startGameLoop() {
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
          goombas: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Goomba
          ),
          powerups: Object.values(this.map.gameObjects).filter(
            (obj) => obj instanceof Mushroom
          ),
        });
      });

      // Draw Background
      this.map.drawBackgroundImage(this.ctx); // Updated to drawBackgroundImage

      // Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx);
      });

      // Removed drawUpperImage call

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    const mapConfig = {
      lowerSrc: "/images/bg.png",
      gameObjects: {
        mario: new Mario({
          isPlayerControlled: true,
          x: 4 * 16,
          y: 5 * 16,
          src: "/images/characters/mario-sprites.png",
        }),
        goomba: new Goomba({
          isPlayerControlled: false,
          x: 18 * 16,
          y: 7 * 16,
          src: "/images/enemies/goomba.png",
        }),
      },
    };

    this.map = new GameLevel(mapConfig);
    this.map.mountObjects();

    this.directionInput = new DirectionInput();
    this.directionInput.init(this.map.gameObjects.mario);

    this.startGameLoop();
  }
}
