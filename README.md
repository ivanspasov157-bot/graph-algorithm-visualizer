# Graph Algorithm Visualizer

An interactive web application for exploring and comparing common graph traversal and pathfinding algorithms.

The project visualizes **Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra's algorithm, and A\*** on a weighted undirected graph. Users can choose an algorithm, select start and destination nodes, run the algorithm, and inspect the visited nodes, resulting path, and path cost.

The project was built to strengthen my understanding of graph algorithms and to gain experience turning algorithmic concepts into a complete interactive application.

## Live Demo

[Graph Algorithm Visualizer](https://ivan-graph-visualizer.netlify.app)

## Features

- Choose between BFS, DFS, Dijkstra, and A*
- Select start and destination nodes
- Visualize the graph using SVG
- Highlight the resulting path directly on the graph
- Display the order in which nodes were visited
- Display the final path
- Display the path distance/cost
- Compare the behavior of different graph algorithms on the same graph
- Responsive interface built with React and Tailwind CSS

## Algorithms

### Breadth-First Search (BFS)

BFS explores the graph level by level using a queue.

It does not use edge weights, so the path distance represents the **number of edges** rather than the total weighted cost. BFS can find a shortest path in an unweighted graph or when all edges have equal cost.

### Depth-First Search (DFS)

DFS explores one branch of the graph as deeply as possible before backtracking.

The implementation uses recursion, with the call stack providing the stack-like behavior required for depth-first traversal.

DFS is useful for graph traversal and exploration, but it does not guarantee the shortest path.

### Dijkstra's Algorithm

Dijkstra's algorithm finds minimum-cost paths in graphs with **non-negative edge weights**.

The implementation keeps track of the best known distance to each node and uses a **min-heap priority queue** to prioritize the node with the smallest currently known distance.

When a better route to a neighboring node is found, its distance and predecessor are updated.

### A*

A* is a goal-directed pathfinding algorithm that combines:

- `g(n)` — the known cost from the starting node to the current node
- `h(n)` — an estimated cost from the current node to the destination

The algorithm prioritizes nodes using:

`f(n) = g(n) + h(n)`

This implementation uses **Euclidean distance between the visual positions of nodes** as the heuristic.

## Graph Representation

The graph is represented internally as a **weighted undirected adjacency list**.

Each node stores a list of its neighboring nodes together with the weight of the connecting edge.

Conceptually:

```text
A
├── B (weight: 2)
└── C (weight: 4)
```

Because the graph is undirected, a connection between two nodes is represented in both directions.

The visual position of each node is stored separately using `x` and `y` coordinates. These coordinates are used to render the graph with SVG and are also used by the A* heuristic.

## How It Works

The main application stores the selected algorithm, start node, destination node, and algorithm result in React state.

When the user runs an algorithm:

1. The selected algorithm receives the graph, start node, and destination node.
2. The algorithm traverses or searches the graph.
3. Visited nodes are recorded in order.
4. A predecessor structure keeps track of how each discovered node was reached.
5. If the destination is found, the final path is reconstructed by following the predecessor chain backwards from the destination and reversing it.
6. The algorithm returns the visited order, path, and distance.
7. The result is stored in React state.
8. React re-renders the relevant components with the new result.
9. The final path is highlighted on the SVG graph, while the Results panel displays the traversal information.

The algorithms return a common result structure containing:

```text
visitedOrder
path
distance
```

This allows the same interface to display results from all four algorithms.

## Visualization

The graph is rendered using **SVG**.

- `<circle>` elements represent nodes
- `<line>` elements represent edges
- `<text>` elements display node labels
- The resulting path is visually highlighted after an algorithm finishes

The current version displays the completed algorithm result rather than animating every traversal step individually.

## Data Structures Used

Several data structures are used by the algorithms:

- **Adjacency list** — represents the graph and its connections
- **Set** — tracks visited nodes and prevents unnecessary repeated processing
- **Queue** — controls the level-by-level traversal of BFS
- **Recursion / call stack** — controls the depth-first traversal of DFS
- **Min-heap priority queue** — selects the next lowest-cost node in Dijkstra and A*
- **Predecessor mapping** — reconstructs the final path from destination back to start

## Tech Stack

- **JavaScript** — application and algorithm logic
- **React** — component-based UI and state-driven rendering
- **Tailwind CSS** — styling and responsive layout
- **SVG** — graph, node, edge, label, and path rendering
- **Vite** — development and build tooling
- **Netlify** — deployment

## Project Structure

The application separates the algorithm logic, graph data, and user interface.

```text
src/
├── algorithms/    # BFS, DFS, Dijkstra, A*, and supporting algorithm logic
├── components/    # React UI and graph visualization components
├── data/          # Graph structure and node positions
└── App.jsx        # Main application state and coordination
```

This separation keeps the graph algorithms independent from most of the presentation logic.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/ivanspasov157-bot/graph-algorithm-visualizer.git
```

Move into the project directory:

```bash
cd graph-algorithm-visualizer
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

## Limitations and Future Improvements

The current version has several areas that could be expanded.

### Step-by-Step Animation

The algorithms currently execute synchronously and the completed result is displayed afterward.

A future version could animate the traversal step by step, visually showing which node and edge are being processed at each stage.

### Editable Graphs

The current graph structure and node positions are predefined.

A future version could allow users to:

- Create and delete nodes
- Add and remove edges
- Change edge weights
- Move nodes
- Build custom graphs

### A* Heuristic

The current A* implementation uses Euclidean distance between the visual coordinates of nodes as its heuristic.

However, the graph's edge weights are independent of those geometric distances. Because of this, the heuristic is not guaranteed to be admissible for every possible graph configuration, meaning the current A* implementation cannot guarantee an optimal path for every graph the representation could support.

A future improvement would be to make the heuristic consistent with the graph's cost model or constrain edge weights so that the heuristic remains admissible.

### Additional Improvements

Other possible improvements include:

- Visualizing visited nodes during traversal
- Displaying edge weights directly on the graph
- Adding automated tests for the algorithms
- Using a dedicated queue implementation for BFS
- Standardizing unreachable-path results across all algorithms
- Clearing or recalculating results when algorithm inputs change
- Adding additional graph algorithms

## What I Learned

Building this project helped me connect theoretical graph algorithms with their practical implementation.

In particular, I gained experience with:

- Representing weighted graphs using adjacency lists
- Implementing BFS and DFS traversal
- Implementing weighted pathfinding with Dijkstra and A*
- Using queues, sets, recursion, and priority queues in real algorithms
- Implementing and working with a min-heap
- Tracking predecessors and reconstructing paths
- Understanding the role of heuristics in A*
- Separating algorithm logic from visualization logic
- Managing application state with React
- Passing data between React components through props
- Rendering graphs using SVG
- Breaking a larger programming problem into smaller components and responsibilities

The project also helped me understand that implementing an algorithm is not only about reproducing its steps, but also about choosing appropriate data structures, handling edge cases, understanding complexity, and integrating the algorithm into a larger application.