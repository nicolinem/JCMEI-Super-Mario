class Mario extends GameObject {
  constructor(config) {
    super(config);

    // New properties for gravity and jumping
    this.isOnGround = false;
    this.velocityY = 0; // Vertical velocity for gravity and jumps
    this.velocityX = 0; // Horizontal velocity for movement
    this.gravity = 0.4; // Gravity strength
    this.jumpPower = -5; // Jump strength (negative to move up)
    this.moveSpeed = 1; // Horizontal move speed
    this.respawnX = config.x;
    this.respawnY = config.y;

    this.lastDirection = "right";

    this.imageSizeX = 32;
    this.imageSizeY = 40;
    this.imageRenderX = 16;
    this.imageRenderY = 22;
    this.isJumping = false;

    this.directionUpdate = {
      left: -this.moveSpeed,
      right: this.moveSpeed,
    };
  }

  update(state) {
    // Apply gravity
    this.applyGravity();

    // Adjusted movement and jump handling based on DirectionInput
    const currentDirection = state.arrow; // Assuming you pass the directionInput instance to Mario's update state
    if (currentDirection) {
      console.log(currentDirection);
      this.startBehavior(state, {
        type: currentDirection === "up" && this.isOnGround ? "jump" : "move",
        direction: currentDirection,
      });
    }

    // Enhanced logic for stopping movement when no direction is held
    if (!currentDirection) {
      this.velocityX = 0;
    }

    this.checkGoombaCollisions(state.goombas);

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

  handleCollisionWithGoomba() {
    // Stop Mario's movement
    this.velocityX = 0;
    this.velocityY = 0;

    this.state = "dead-ish";

    // Temporarily disable input handling (assuming you have a method to do so)
    this.disableInput = true; // You need to implement logic that checks this flag before processing input

    // Call the respawn method after a delay
    setTimeout(() => {
      this.respawn();
    }, 2000);
  }

  startBehavior(state, behavior) {
    // For jumping, maintain horizontal movement
    if (behavior.type === "jump" && !this.isJumping && this.isOnGround) {
      this.velocityY = this.jumpPower;
      this.isOnGround = false;
      this.isJumping = true;
      // Maintain horizontal movement if moving left or right
      if (state.holdingLeft || state.holdingRight) {
        // You need to track these states based on user input
        this.velocityX = state.holdingLeft ? -this.moveSpeed : this.moveSpeed;
      }
    } else if (
      behavior.type === "move" &&
      this.directionUpdate[behavior.direction] !== undefined
    ) {
      this.velocityX = this.directionUpdate[behavior.direction];
    }
    if (behavior.type === "move") {
      this.lastDirection = behavior.direction;
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
    const nextXBox = { ...characterBox, x: proposedX };
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
    console.log(this.x, this.y);
    return {
      x: this.x,
      y: this.y,
      width: this.imageRenderX,
      height: this.imageRenderY - 1,
    };
  }

  respawn() {
    this.state = "alive";
    this.x = this.respawnX;
    this.y = this.respawnY;

    this.sprite.setAnimation("idle-right");

    this.disableInput = false;
  }

  updateSprite() {
    if (this.state === "dead-ish") {
      this.sprite.setAnimation("dead-ish");
      return;
    }
    if (this.velocityX !== 0) {
      let direction = this.velocityX < 0 ? "left" : "right";
      this.sprite.setAnimation(`walk-${direction}`);
    } else {
      this.sprite.setAnimation(`idle-${this.lastDirection}`);
    }
  }
}
