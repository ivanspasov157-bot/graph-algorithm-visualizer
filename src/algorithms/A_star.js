// MinHeap priority queue used to process the lowest-priority node first.
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const smallestItem = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.bubbleDown();

    return smallestItem;
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor(
        (currentIndex - 1) / 2
      );

      if (
        this.heap[parentIndex].priority <=
        this.heap[currentIndex].priority
      ) {
        break;
      }

      [
        this.heap[parentIndex],
        this.heap[currentIndex]
      ] = [
        this.heap[currentIndex],
        this.heap[parentIndex]
      ];

      currentIndex = parentIndex;
    }
  }

  bubbleDown() {
    let currentIndex = 0;
    const heapLength = this.heap.length;

    while (true) {
      const leftChildIndex =
        2 * currentIndex + 1;

      const rightChildIndex =
        2 * currentIndex + 2;

      let smallestIndex = currentIndex;

      if (
        leftChildIndex < heapLength &&
        this.heap[leftChildIndex].priority <
          this.heap[smallestIndex].priority
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < heapLength &&
        this.heap[rightChildIndex].priority <
          this.heap[smallestIndex].priority
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === currentIndex) {
        break;
      }

      [
        this.heap[currentIndex],
        this.heap[smallestIndex]
      ] = [
        this.heap[smallestIndex],
        this.heap[currentIndex]
      ];

      currentIndex = smallestIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

// Euclidean distance is used as the A* heuristic.
function heuristic(nodeA, nodeB, positions) {
  const positionA = positions[nodeA];
  const positionB = positions[nodeB];

  const differenceX =
    positionB.x - positionA.x;

  const differenceY =
    positionB.y - positionA.y;

  return Math.sqrt(
    differenceX ** 2 +
    differenceY ** 2
  );
}

export function aStar(
  graph,
  positions,
  start,
  end
) {
  if (!graph[start] || !graph[end]) {
    throw new Error(
      `Start node "${start}" or end node "${end}" does not exist.`
    );
  }

  if (!positions[start] || !positions[end]) {
    throw new Error(
      "Every node used by A* must have a position."
    );
  }

  // gScore = actual cost from start.
  // fScore = gScore + estimated remaining cost.
  const gScore = {};
  const fScore = {};

  // Used to reconstruct the final path.
  const previous = {};

  const visitedOrder = [];
  const visited = new Set();
  const priorityQueue = new MinHeap();

  for (const node of Object.keys(graph)) {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
    previous[node] = null;
  }

  gScore[start] = 0;

  fScore[start] = heuristic(
    start,
    end,
    positions
  );

  priorityQueue.push({
    node: start,
    priority: fScore[start],
  });

  while (!priorityQueue.isEmpty()) {
    const currentItem =
      priorityQueue.pop();

    const current =
      currentItem.node;

    const currentPriority =
      currentItem.priority;

    if (visited.has(current)) {
      continue;
    }

    // Better routes can create multiple heap entries for the same node.
    // Ignore an older entry if its priority is no longer current.
    if (
      currentPriority > fScore[current]
    ) {
      continue;
    }

    visited.add(current);
    visitedOrder.push(current);

    if (current === end) {
      break;
    }

    for (const connection of graph[current]) {
      const neighbor = connection.node;
      const weight = connection.weight;

      if (visited.has(neighbor)) {
        continue;
      }

      const possibleGScore =
        gScore[current] + weight;

      if (
        possibleGScore < gScore[neighbor]
      ) {
        previous[neighbor] = current;
        gScore[neighbor] =
          possibleGScore;

        fScore[neighbor] =
          gScore[neighbor] +
          heuristic(
            neighbor,
            end,
            positions
          );

        priorityQueue.push({
          node: neighbor,
          priority: fScore[neighbor],
        });
      }
    }
  }

  if (!visited.has(end)) {
    return {
      visitedOrder,
      path: [],
      distance: Infinity,
    };
  }

  // Reconstruct the path from end back to start.
  const path = [];
  let currentNode = end;

  while (currentNode !== null) {
    path.push(currentNode);
    currentNode =
      previous[currentNode];
  }

  path.reverse();

  return {
    visitedOrder,
    path,

    // gScore contains the actual path cost; fScore includes the heuristic.
    distance: gScore[end],
  };
}