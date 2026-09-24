// Recursive DFS helper. Returns true when the destination is found.
function dfsRec(
  graph,
  visited,
  current,
  end,
  visitedOrder,
  previous
) {
  visited.add(current);
  visitedOrder.push(current);

  if (current === end) {
    return true;
  }

  for (const connection of graph[current]) {
    const neighbor = connection.node;

    if (!visited.has(neighbor)) {
      // Store how the node was reached for path reconstruction.
      previous[neighbor] = current;

      // Continue exploring this branch recursively.
      const found = dfsRec(
        graph,
        visited,
        neighbor,
        end,
        visitedOrder,
        previous
      );

      // Propagate success back through the recursive calls.
      if (found) {
        return true;
      }
    }
  }

  // This branch did not reach the destination.
  return false;
}

export function dfs(graph, start, end) {
  if (!graph[start] || !graph[end]) {
    throw new Error(
      "Start or end node does not exist in the graph."
    );
  }

  const visited = new Set();
  const visitedOrder = [];

  // Stores how each node was reached so the path can be reconstructed.
  const previous = {};
  previous[start] = null;

  const found = dfsRec(
    graph,
    visited,
    start,
    end,
    visitedOrder,
    previous
  );

  if (!found) {
    return {
      visitedOrder,
      path: [],
      distance: null,
    };
  }

  // Reconstruct the discovered path backward from the destination.
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

    // DFS ignores weights, so distance represents the number of edges.
    distance: path.length - 1,
  };
}