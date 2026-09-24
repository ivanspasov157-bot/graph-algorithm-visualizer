// MinHeap priority queue used to process the node
// with the smallest known distance first.
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
        this.heap[parentIndex].distance <=
        this.heap[currentIndex].distance
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
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < heapLength &&
        this.heap[leftChildIndex].distance <
          this.heap[smallestIndex].distance
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < heapLength &&
        this.heap[rightChildIndex].distance <
          this.heap[smallestIndex].distance
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

export function dijkstra(graph, start, end) {
  if (!graph[start] || !graph[end]) {
    throw new Error(
      `Start node "${start}" or end node "${end}" does not exist.`
    );
  }

  const distances = {};

  // Stores how each node was reached so the path can be reconstructed.
  const previous = {};

  const visitedOrder = [];
  const visited = new Set();
  const priorityQueue = new MinHeap();

  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;

  priorityQueue.push({
    node: start,
    distance: 0,
  });

  while (!priorityQueue.isEmpty()) {
    const currentItem = priorityQueue.pop();

    const current = currentItem.node;
    const currentDistance = currentItem.distance;

    if (visited.has(current)) {
      continue;
    }

    // Better routes can create multiple heap entries for the same node.
    // Ignore an older entry if its distance is no longer current.
    if (currentDistance > distances[current]) {
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

      const possibleDistance =
        distances[current] + weight;

      // Relax the edge if a shorter route has been found.
      if (possibleDistance < distances[neighbor]) {
        distances[neighbor] = possibleDistance;
        previous[neighbor] = current;

        priorityQueue.push({
          node: neighbor,
          distance: possibleDistance,
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

  // Reconstruct the shortest path backward from the destination.
  const path = [];
  let currentNode = end;

  while (currentNode !== null) {
    path.push(currentNode);
    currentNode = previous[currentNode];
  }

  path.reverse();

  return {
    visitedOrder,
    path,
    distance: distances[end],
  };
}