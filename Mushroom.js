

// class Mushroom extends GameObject {
//   constructor(config) {
//     super(config);
//     this.isActive = false;
//     this.sprite = new Sprite({
//       gameObject: this,
//       imageSizeX: 16,
//       imageSizeY: 16,
//       imageRenderX: 16,
//       imageRenderY: 16,
//       src: config.src || "/images/enemies/goomba.png",
//       animations: {
//         "idle-right": [[0.2, 27]],
//       },
//       animationFrameLimit: config.animationFrameLimit || 8,
//     });
//   }

//   update() {}

//   getBoundingBox() {
//     return {
//       x: this.x,
//       y: this.y,
//       width: 16,
//       height: 16,
//     };
//   }
// }
