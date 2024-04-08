class GameObject {
  constructor(config) {
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/elements.png",
    });
  }

  mount(map) {
    this.map = map;
    this.isMounted = true;
  }

  unmount() {
    this.isMounted = false;
  }

  update() {}
}
