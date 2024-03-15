class PowerUp extends GameObject {
  constructor(config) {
    super(config);
    this.isActive = false; // Assume all power-ups share this property
    this.sprite = new Sprite({
      gameObject: this,
      imageSizeX: 16,
      imageSizeY: 16,
      imageRenderX: 16,
      imageRenderY: 16,
      src: config.src || "/images/poewrups.png",
      animations: {
        "idle-right": [[0.2, 27]],
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

class Mushroom extends PowerUp {
  constructor(config) {
    super({
      ...config,
      src: config.src || "/images/poewrups.png",
    });
    this.sprite.animations = {
      "idle-right": [[0.2, 27]],
    };

  }


}

class Star extends PowerUp {
  constructor(config) {
    super({
      ...config,
      src: config.src || "/images/powerups.png",
    });
    this.sprite.animations = {
      "idle-right": [[4.45, 126]],
    };

  }


}
