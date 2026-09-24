export function bfs(graph, start, end) {
  const visited = new Set();
  const queue = [];
  const visitedOrder = [];

  // Stores how each node was reached so the path can be reconstructed.
  const previous = {};

  if (!graph[start] || !graph[end]) {
    throw new Error(
      "Start or end node does not exist in the graph."
    );
  }

  visited.add(start);
  queue.push(start);
  previous[start] = null;

  while (queue.length > 0) {
    // FIFO queue makes BFS explore the graph level by level.
    const current = queue.shift();

    visitedOrder.push(current);

    if (current === end) {
      break;
    }

    for (const connection of graph[current]) {
      const neighbor = connection.node;

      // Mark nodes when discovered to prevent duplicate queue entries.
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        previous[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }

  if (!visited.has(end)) {
    return {
      visitedOrder,
      path: [],
      distance: null,
    };
  }

  // Reconstruct the path backward from the destination.
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

    // BFS ignores weights, so distance represents the number of edges.
    distance: path.length - 1,
  };
}