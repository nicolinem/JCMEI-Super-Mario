class Mario extends GameObject {
  constructor(config) {
    super(config);

    this.isOnGround = false;
    this.velocityY = 0;
    this.velocityX = 0;
    this.gravity = 0.4;
    this.jumpPower = -5;
    this.moveSpeed = 3;
    this.respawnX = config.x;
    this.respawnY = config.y;
    this.sizeState = "normal";

    this.lastDirection = "right";

    this.boxSizeX = 16;
    this.boxSizeY = 24;
    this.isJumping = false;
    this.sprite.pushY = -4;

    this.directionUpdate = {
      left: -this.moveSpeed,
      right: this.moveSpeed,
    };
  }

  update(state) {
    // Apply gravity
    this.applyGravity();

    const currentDirection = state.arrow;
    if (currentDirection) {
      this.startBehavior(state, {
        type: currentDirection === "up" && this.isOnGround ? "jump" : "move",
        direction: currentDirection,
      });
    }

    if (!currentDirection) {
      this.velocityX = 0;
    }

    this.checkGoombaCollisions(state.goombas);

    this.checkPowerUpCollisions();

    this.updatePosition(state.map);

    this.updateSprite();
  }

  checkGoombaCollisions(goombas) {
    goombas.forEach((goomba) => {
      if (this.checkCollision(this.getBoundingBox(), goomba.getBoundingBox())) {
        this.handleCollisionWithGoomba();
      }
    });
  }

  checkPowerUpCollisions() {
    Object.keys(this.map.gameObjects).forEach((key) => {
      const obj = this.map.gameObjects[key];
      if (obj instanceof Mushroom || obj instanceof Star) {
        if (this.checkCollision(this.getBoundingBox(), obj.getBoundingBox())) {
          this.handleCollisionWithPowerUp(obj, key);
        }
      }
    });
  }

  handleCollisionWithGoomba() {
    this.velocityX = 0;
    this.velocityY = 0;

    this.state = "dead-ish";

    // Temporarily disable input handling
    this.disableInput = true; // We need to implement logic that checks this flag before processing input

    setTimeout(() => {
      this.respawn();
    }, 2000);
  }

  handleCollisionWithPowerUp(powerUp, key) {
    this.velocityX = 0;
    this.velocityY = 0;
    if (powerUp instanceof Mushroom) {
      this.transformToSuper();
    } else if (powerUp instanceof Star) {
      this.transformToStar();
    }
    this.disableInput = true;

    // Remove the power-up from the gameObjects map
    delete this.map.gameObjects[key];

    setTimeout(() => {
      this.disableInput = false;
    }, 1000);
  }

  startBehavior(state, behavior) {
    if (behavior.type === "jump" && !this.isJumping && this.isOnGround) {
      this.velocityY = this.jumpPower;
      this.isOnGround = false;
      this.isJumping = true;
      // Maintain horizontal movement if moving left or right
      if (state.holdingLeft || state.holdingRight) {
        this.velocityX = state.holdingLeft ? -this.moveSpeed : this.moveSpeed;
      }
    } else if (
      behavior.type === "move" &&
      this.directionUpdate[behavior.direction] !== undefined
    ) {
      this.velocityX = this.directionUpdate[behavior.direction];
    }
    if (behavior.type === "move") {
      if (behavior.direction !== "up") {
        this.lastDirection = behavior.direction;
      }
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  updatePosition(map) {
    let proposedX = this.x + this.velocityX;
    let proposedY = this.y + this.velocityY;
    let canMoveX = true;
    let canMoveY = true;

    const characterBox = this.getBoundingBox();
    const nextXBox = { ...characterBox, x: proposedX + 2 };
    const nextYBox = { ...characterBox, y: proposedY };

    this.isOnGround = false;

    map.tiles.forEach((tile) => {
      const tileBox = tile.getBoundingBox();

      if (this.checkCollision(nextXBox, tileBox)) {
        canMoveX = false;
      }
      if (this.checkCollision(nextYBox, tileBox)) {
        // Determine if collision is from above or below
        const isHittingCeiling = proposedY < this.y && this.velocityY < 0;
        const isLanding = proposedY > this.y;

        if (isLanding) {
          this.isOnGround = true;
          this.velocityY = 0; // Stop vertical movement
        } else if (isHittingCeiling) {
          tile.interact();
          this.velocityY = 0; // Stop vertical movement, but do not set isOnGround
        }

        canMoveY = false;
      }
    });

    if (canMoveX) this.x = proposedX;
    if (canMoveY) this.y = proposedY;

    // Reset jump flag only if on the ground
    if (this.isOnGround) {
      this.isJumping = false;
    }
  }

  applyGravity() {
    if (!this.isOnGround) {
      this.velocityY += this.gravity;
    }
  }

  getBoundingBox() {
    return {
      x: Math.round(this.x) + 2,
      y: Math.round(this.y),
      width: this.boxSizeX - 4,
      height: this.sprite.imageRenderY + this.sprite.pushY,
    };
  }

  respawn() {
    this.state = "alive";
    this.x = this.respawnX;
    this.y = this.respawnY;

    this.sprite.setAnimation("idle-right");

    this.disableInput = false;
  }

  transformToSuper() {
    if (this.sizeState === "normal") {
      this.sizeState = "super";
      this.sprite.imageSizeY = 56;
      this.sprite.imageRenderY = 28;
      this.y -= 8;
      this.sprite.pushY = 0;
      this.updateSprite();
    } else if (this.sizeState === "star") {
      this.sizeState = "super";
      this.updateSprite();
    }
  }

  transformToStar() {
    if (this.sizeState === "normal") {
      this.sizeState = "star";
      this.sprite.imageSizeY = 56;
      this.sprite.imageRenderY = 28;
      this.y -= 8;
      this.sprite.pushY = 0;
      this.updateSprite();
    } else if (this.sizeState === "super") {
      this.sizeState = "star";
      this.updateSprite();
    }
  }

  transformToNormal() {
    if (this.sizeState === "super" || this.sizeState === "star") {
      this.sizeState = "normal";
      this.sprite.imageSizeY = 48;
      this.sprite.imageRenderY = 24;
      this.sprite.pushY = -4;
      this.y += 4;
      this.updateSprite();
    }
  }

  updateSprite() {
    if (this.state === "dead-ish") {
      this.sprite.setAnimation("dead-ish");
      return;
    }
    const statePrefix = this.sizeState === "normal" ? "" : `${this.sizeState}-`;

    // Exclude "down" from affecting sprite animation
    let direction = this.lastDirection;
    if (direction === "up") {
      direction = "idle-" + this.lastDirection; // Use the last non-down direction if down is detected
    }

    if (this.velocityX !== 0) {
      let direction = this.velocityX < 0 ? "left" : "right";
      this.sprite.setAnimation(`${statePrefix}walk-${direction}`);
    } else {
      this.sprite.setAnimation(`${statePrefix}idle-${this.lastDirection}`);
    }
  }
}
