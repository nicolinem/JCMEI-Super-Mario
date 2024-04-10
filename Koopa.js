class Koopa extends GameObject {
    constructor(config) {
      super(config);
  
      // Set the sprite for the Koopa
      this.sprite = new Sprite({
        gameObject: this,
        imageSizeX: 16,
        imageSizeY: 32,
        imageRenderX: 16,
        imageRenderY: 28,
        pushY: 3,
        pushX: 0,
        src: config.src || "/images/enemies/koopas.png",
        animations: {
          "walk-left": [
            [0, 160],
            [1.1, 160],
          ],
          "idle-shell": [
            [16.5, 160]
          ],
          "spin-shell": [
            [16.5, 160],
            [17.7, 160],
            [18.8, 160]
          ]
        },
        animationFrameLimit: config.animationFrameLimit || 8,
        });
  
      // Movement
      this.moveSpeed = -0.5; // Koopa moves to the left
      this.velocityX = this.moveSpeed;
      this.velocityY = 0;
      this.gravity = 0.3;
  
      this.isOnGround = false;
    }
  
    applyGravity() {
      if (!this.isOnGround) {
        this.velocityY += this.gravity;
      }
    }
  
    updatePosition(map) {
      let proposedX = this.x + this.velocityX;
      let proposedY = this.y + this.velocityY;
      let canMoveX = true;
      let canMoveY = true;
  
      const koopaBox = this.getBoundingBox();
      const nextXBox = { ...koopaBox, x: proposedX };
      const nextYBox = { ...koopaBox, y: proposedY };
  
      this.isOnGround = false; // Assume not on ground until proven otherwise
  
      map.tiles.forEach((tile) => {
        if (this.checkCollision(nextXBox, tile.getBoundingBox())) {
          canMoveX = false;
        }
        if (this.checkCollision(nextYBox, tile.getBoundingBox())) {
          canMoveY = false;
          this.isOnGround = true;
          this.velocityY = 0;
        }
      });
  
      if (canMoveX) this.x = proposedX;
      if (canMoveY) this.y = proposedY;
    }
  
    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    }

    kill(){
      this.velocityX = 0;
      this.isDead = true;
      this.sprite.setAnimation("idle-shell");
    }

    spin(direction) {
      // Assuming `direction` is either 'left' or 'right'
      this.velocityX = direction === 'left' ? -2 : 2; // Adjust speed as necessary
      this.sprite.setAnimation("spin-shell")
      this.isSpinning = true;
  }
  
    update(state) {
      if (!this.isDead && !this.isSpinning) { // Only apply gravity and movement if not dead
        this.sprite.setAnimation("walk-left");
      }
      this.applyGravity();
      this.updatePosition(state.map);
    }
  
    getBoundingBox() {
      return {
        x: this.x,
        y: this.y,
        width: 16,
        height: 28,
      };
    }
  }