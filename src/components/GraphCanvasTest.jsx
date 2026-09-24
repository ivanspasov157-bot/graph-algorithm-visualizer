function GraphCanvas({
  graph,
  positions,
  result,
  startNode,
  endNode
}) {

  // Check whether an edge belongs
  // to the path returned by the algorithm.
  function isPathEdge(nodeA, nodeB) {

    // Before an algorithm has been run,
    // there is no path to highlight.
    if (!result || !result.path) {
      return false;
    }

  
    for (let i = 0; i < result.path.length - 1; i++) {

      const first = result.path[i];
      const second = result.path[i + 1];

      // Because your graph is undirected,
      // A-B and B-A represent the same edge.
      if (
        (first === nodeA && second === nodeB) ||
        (first === nodeB && second === nodeA)
      ) {
        return true;
      }
    }

    return false;
  }


  return (
    <svg
      viewBox="50 50 700 300"
      className="h-full w-full"
    >

      {/* DRAW EDGES */}
      {Object.entries(graph).map(([node, connections]) =>

        connections.map((connection) => {

          const neighbor = connection.node;
          if (node > neighbor) {
            return null;
          }

          const startPosition = positions[node];
          const endPosition = positions[neighbor];

          const highlighted =
            isPathEdge(node, neighbor);

          return (
            <line
              key={`${node}-${neighbor}`}
              x1={startPosition.x}
              y1={startPosition.y}
              x2={endPosition.x}
              y2={endPosition.y}
              stroke={
                highlighted
                  ? "#7c3aed"
                  : "#94a3b8"
              }
              strokeWidth={
                highlighted ? 5 : 2
              }
            />
          );
        })
      )}


      {/* DRAW NODES */}
      {Object.keys(graph).map((node) => {

        const position = positions[node];

        // Decide the node color.
        let nodeColor = "#2563eb";

        if (node === startNode) {
          nodeColor = "#22c55e";
        }

        if (node === endNode) {
          nodeColor = "#ef4444";
        }

        return (
          <g key={node}>

            {/* Node circle */}
            <circle
              cx={position.x}
              cy={position.y}
              r="28"
              fill={nodeColor}
            />

            {/* Node letter */}
            <text
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="20"
              fontWeight="bold"
            >
              {node}
            </text>

          </g>
        );
      })}

    </svg>
  );
}

export default GraphCanvas;