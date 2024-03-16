const tileTypes = {
  1: {
    name: "Grass",
    spriteCoordinates: [25, 25], // Coordinates on the spritesheet
    solid: true, // Whether the tile is solid/collidable
  },
  2: {
    name: "Dirt",
    spriteCoordinates: [25, 26],
    solid: true,
  },
  3: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [39, 31],
    solid: false, // Example of a non-collidable tile
  },
  4: {
    name: "FloatingGrass",
    spriteCoordinates: [40, 31],
    solid: true,
  },
  5: {
    name: "FloatingGrassCornerRight",
    spriteCoordinates: [41, 31],
    solid: true,
  },
  6: {
    name: "GrassCornerLeft",
    spriteCoordinates: [40, 27],
    solid: true,
  },
  7: {
    name: "GrassCornerLRight",
    spriteCoordinates: [41, 27],
    solid: true,
  },
  8: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [44, 31],
    solid: true,
  },
  9: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [45, 31],
    solid: true,
  },
  10: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [0, 0],
    solid: true,
  },
  11: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [47, 31],
    solid: true,
  },
  12: {
    name: "FloatingGrassCornerLeft",
    spriteCoordinates: [47, 31],
    solid: true,
  },

  // More tile types can be added here as needed
};
