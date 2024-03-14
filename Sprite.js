class Sprite {
  constructor(config) {
    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.imageSizeX = config.imageSizeX || 32;
    this.imageSizeY = config.imageSizeY || 48;
    this.imageRenderX = config.imageRenderX || 16;
    this.imageRenderY = config.imageRenderY || 24;
    this.pushY = config.pushY || 0;

    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-left": [[8, 0]],
      "walk-right": [
        [1, 0],
        [0, 0],
      ],
      "idle-right": [[0, 0]],
      "dead-ish": [[13, 0]],
      "walk-left": [
        [9, 0],
        [8, 0],
      ],
      "super-idle-left": [[8, 2]],
      "super-walk-right": [
        [1, 2],
        [0, 2],
      ],
      "super-idle-right": [[0, 2]],
      "super-dead-ish": [[13, 2]],
      "super-walk-left": [
        [9, 2],
        [8, 2],
      ],
    };

    this.currentAnimation = "idle-right";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    const frames = this.animations[this.currentAnimation];
    if (!frames || this.currentAnimationFrame >= frames.length) {
      console.error(
        `Invalid frame access: Animation ${this.currentAnimation} does not exist or frame ${this.currentAnimationFrame} is out of bounds.`
      );
      return [0, 0];
    }
    return frames[this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.animations[key] && this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;

    // Move to the next frame
    this.currentAnimationFrame += 1;

    // Ensure currentAnimationFrame wraps around correctly
    if (
      this.currentAnimationFrame >=
      this.animations[this.currentAnimation].length
    ) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    // Simplify frame calculation based on the currentAnimation and currentAnimationFrame
    const [frameX, frameY] =
      this.animations[this.currentAnimation][this.currentAnimationFrame];

    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        frameX * this.imageSizeX,
        frameY * this.imageSizeY,
        this.imageSizeX,
        this.imageSizeY,
        Math.round(this.gameObject.x),
        Math.round(this.gameObject.y) + this.pushY,
        this.imageRenderX,
        this.imageRenderY
      );
    }

    this.updateAnimationProgress();
  }
}
