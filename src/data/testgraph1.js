// Every graph node must have a matching position for the A* heuristic.
// Node names are case-sensitive.
export const graph = {
  A: [
    { node: "B", weight: 2 },
    { node: "C", weight: 4 },
  ],

  B: [
    { node: "A", weight: 2 },
    { node: "D", weight: 4 },
    { node: "C", weight: 1 },
  ],

  C: [
    { node: "A", weight: 4 },
    { node: "B", weight: 1 },
    { node: "E", weight: 2 },
  ],

  D: [
    { node: "B", weight: 4 },
    { node: "F", weight: 2 },
    { node: "E", weight: 3 },
  ],

  E: [
    { node: "C", weight: 2 },
    { node: "D", weight: 3 },
    { node: "F", weight: 1 },
    { node: "G", weight: 5 },
  ],

  F: [
    { node: "D", weight: 2 },
    { node: "E", weight: 1 },
    { node: "G", weight: 1 },
  ],

  G: [
    { node: "E", weight: 5 },
    { node: "F", weight: 1 },
  ],
};

export const nodePositions = {
  A: { x: 100, y: 100 },
  B: { x: 250, y: 100 },
  C: { x: 180, y: 220 },
  D: { x: 400, y: 180 },
  E: { x: 500, y: 250 },
  F: { x: 600, y: 150 },
  G: { x: 700, y: 220 },
};