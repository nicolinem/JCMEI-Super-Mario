class Mario extends GameObject {
  constructor(config) {
    super(config);
    this.isOnGround = false;
    this.velocity = { x: 0, y: 0 };
    this.gravity = 0.4;
    this.jumpPower = -6.2;
    this.respawnPosition = { x: config.x, y: config.y };
    this.sizeState = "normal";
    this.lastDirection = "right";
    this.baseMoveSpeed = 3;
    this.boxSize = { x: 16, y: 22 };
    this.isJumping = false;
    this.sprite.pushY = -4;
    this.speedMultiplier = 1;
    this.moveSpeed = this.baseMoveSpeed * this.speedMultiplier;
    console.log(this.baseMoveSpeed, this.moveSpeed);
  }

  update(state) {
    if (this.state === "flagpole" || this.state === "dead-ish") return;
    this.applyGravity();

    this.handleInput(state);

    this.checkGoombaCollisions(state.goombas);

    this.checkKoopaCollisions(state.koopas);

    this.checkCoinCollision();
    this.checkPowerUpCollisions();
    this.checkFlagCollisions();

    this.updatePosition(state.map);

    this.updateSprite();
  }

  handleInput(state) {
    const direction = state.arrow;
    const jumping = state.jumping;

    if (direction) this.lastDirection = direction;

    // Horizontal movement handling
    if (!direction) this.velocity.x = 0;
    if (direction === "left" || direction === "right") {
      this.move(direction);
    }
    if (jumping) {
      this.jump();
    }
  }

  jump() {
    if (!this.isJumping && this.isOnGround) {
      this.velocity.y = this.jumpPower;
      this.isOnGround = false;
      this.isJumping = true;
    }
  }
  bounce() {
    this.velocity.y = this.jumpPower;
    this.isOnGround = false;
    this.isJumping = true;
  }

  move(direction) {
    this.velocity.x = direction === "left" ? -this.moveSpeed : this.moveSpeed;
    this.lastDirection = direction;
  }

  checkGoombaCollisions(goombas) {
    goombas.forEach((goomba) => {
      if (this.checkCollision(this.getBoundingBox(), goomba.getBoundingBox())) {
        this.handleCollisionWithGoomba(goomba);
      }
    });
  }

  checkKoopaCollisions(koopas) {
    koopas.forEach((koopa) => {
      if (this.checkCollision(this.getBoundingBox(), koopa.getBoundingBox())) {
        this.handleCollisionWithKoopa(koopa);
      }
    });
  }

  checkCoinCollision() {
    Object.keys(this.map.gameObjects).forEach((key) => {
      const obj = this.map.gameObjects[key];
      if (obj instanceof Coin) {
        if (this.checkCollision(this.getBoundingBox(), obj.getBoundingBox())) {
          this.handleCollisionWithCoin(obj, key);
        }
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

  checkFlagCollisions() {
    Object.keys(this.map.gameObjects).forEach((key) => {
      const obj = this.map.gameObjects[key];
      if (obj instanceof Flagpole) {
        if (this.checkCollision(this.getBoundingBox(), obj.getBoundingBox())) {
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.state = "flagpole";
          this.map.levelComplete();
        }
      }
    });
  }

  checkFlagCollisions() {
    Object.keys(this.map.gameObjects).forEach((key) => {
      const obj = this.map.gameObjects[key];
      if (obj instanceof Flagpole) {
        if (this.checkCollision(this.getBoundingBox(), obj.getBoundingBox())) {
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.state = "flagpole";
          this.map.levelComplete();
        }
      }
    });
  }

  handleCollisionWithGoomba(goomba) {
    const goombaBox = goomba.getBoundingBox();
    const characterBox = this.getBoundingBox();
    let proposedY = this.y + this.velocity.y;
    const nextYBox = { ...characterBox, y: proposedY };

    if (this.checkCollision(nextYBox, goombaBox)) {
      const willKill =
        proposedY > this.y &&
        characterBox.y + characterBox.height - goombaBox.y <= 10;

      if (willKill) {
        this.isOnGround = true;
        this.bounce();
      } else {
        this.die();
      }
    }
  }

  handleCollisionWithKoopa(koopa) {
    const koopaBox = koopa.getBoundingBox();
    const characterBox = this.getBoundingBox();
    let proposedY = this.y + this.velocity.y;
    const nextYBox = { ...characterBox, y: proposedY };

    if (this.checkCollision(nextYBox, koopaBox)) {
      const willKill =
        proposedY > this.y &&
        characterBox.y + characterBox.height - koopaBox.y <= 20;
      console.log(characterBox.y, characterBox.height, koopaBox.y);

      if (willKill) {
        this.isOnGround = true;
        this.bounce();
      } else {
        this.velocity.x = 0;
        this.velocity.y = 0;

        this.state = "dead-ish";

        // Temporarily disable input handling
        this.disableInput = true;

        setTimeout(() => {
          this.die();
        }, 2000);
      }
    }
  }

  handleCollisionWithCoin(obj, key) {
    this.map.coins += 1;
    delete this.map.gameObjects[key];
  }

  handleCollisionWithPowerUp(powerUp, key) {
    this.velocity.x = 0;
    this.velocity.y = 0;
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

  updatePosition(map) {
    let proposedX = this.x + this.velocity.x;
    let proposedY = this.y + this.velocity.y;
    let canMoveX = true;
    let canMoveY = true;

    const characterBox = this.getBoundingBox();
    const nextXBox = { ...characterBox, x: proposedX };
    const nextYBox = { ...characterBox, y: proposedY };
    this.isOnGround = false;

    map.tiles.forEach((tile) => {
      const tileBox = tile.getBoundingBox();

      if (this.checkCollision(nextXBox, tileBox)) {
        canMoveX = false;
      }
      if (this.checkCollision(nextYBox, tileBox)) {
        const isHittingCeiling = proposedY < this.y && this.velocity.y < 0;
        const isLanding =
          proposedY > this.y &&
          characterBox.y + characterBox.height <= tileBox.y;

        if (isLanding) {
          this.isOnGround = true;
          this.velocity.y = 0;
          canMoveY = false;
        } else if (isHittingCeiling) {
          tile.interact();
          this.velocity.y = 0;
          canMoveY = false;
        }
        // No else; we don't set canMoveY to false for side collisions
      }
    });

    if (proposedX < 0) {
      canMoveX = false;
      proposedX = 0;
    }

    if (proposedY > 200) {
      console.log("Mario fell off the map");
      this.die();
    }

    if (this.x >= 352 / 2 && this.lastDirection === "right" && canMoveX) {
      // Shift the world left instead of moving Mario right
      const shiftX = Math.round(this.velocity.x);
      this.map.updatePosition(shiftX);
    } else {
      if (canMoveX) this.x = proposedX;
    }

    if (canMoveY) this.y = proposedY;
    if (this.isOnGround) {
      this.isJumping = false;
    }
  }

  getBoundingBox() {
    return {
      x: Math.round(this.x),
      y: Math.round(this.y),
      width: this.boxSize.x,
      height: this.sprite.imageRenderY + this.sprite.pushY,
    };
  }

  die() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.state = "dead-ish";
    this.sprite.setAnimation("dead-ish");

    setTimeout(() => {
      this.map.resetLevel();
    }, 2000);
  }

  transformSize(state, config) {
    if (this.sizeState !== state) {
      this.sizeState = state;

      if (config) {
        this.sprite.imageSizeY = config.imageSizeY || this.sprite.imageSizeY;
        this.sprite.imageRenderY =
          config.imageRenderY || this.sprite.imageRenderY;
        this.sprite.pushY =
          config.pushY !== undefined ? config.pushY : this.sprite.pushY;
        this.y += config.yAdjust || 0;
      }

      this.updateSprite();
    }
  }

  transformToSuper() {
    const config =
      this.sizeState === "normal"
        ? { imageSizeY: 56, imageRenderY: 28, pushY: 0, yAdjust: -8 }
        : null;
    this.transformSize("super", config);
  }

  transformToStar() {
    const config =
      this.sizeState === "normal" || this.sizeState === "super"
        ? { imageSizeY: 56, imageRenderY: 28, pushY: 0, yAdjust: -8 }
        : null;
    this.transformSize("star", config);
  }

  transformToNormal() {
    if (this.sizeState === "super" || this.sizeState === "star") {
      this.transformSize("normal", {
        imageSizeY: 48,
        imageRenderY: 24,
        pushY: -4,
        yAdjust: 4,
      });
    }
  }

  updateSprite() {
    if (this.state === "dead-ish") {
      this.sprite.setAnimation("dead-ish");
      return;
    } else if (this.state === "flagpole") {
      this.sprite.setAnimation("flagpole");
      return;
    }
    const statePrefix = this.sizeState === "normal" ? "" : `${this.sizeState}-`;

    // Exclude "down" from affecting sprite animation
    let direction = this.lastDirection;
    if (direction === "up") {
      direction = "idle-" + this.lastDirection; // Use the last non-down direction if down is detected
    }

    if (this.velocity.x !== 0) {
      let direction = this.velocity.x < 0 ? "left" : "right";
      this.sprite.setAnimation(`${statePrefix}walk-${direction}`);
    } else {
      this.sprite.setAnimation(`${statePrefix}idle-${this.lastDirection}`);
    }
  }

  applyGravity() {
    if (!this.isOnGround) {
      this.velocity.y += this.gravity;
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

  increaseSpeed() {
    this.speedMultiplier = 1.5; // Adjust multiplier as needed
    this.moveSpeed = this.baseMoveSpeed * this.speedMultiplier;
  }

  resetSpeed() {
    this.speedMultiplier = 1; // Reset multiplier
    this.moveSpeed = this.baseMoveSpeed * this.speedMultiplier;
  }
}
