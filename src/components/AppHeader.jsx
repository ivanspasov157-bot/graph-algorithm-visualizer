function AppHeader({
  algorithm,
  onAlgorithmChange
}) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">

      {/* Left group: logo + title */}
      <div className="flex items-center gap-3">
        <span>
          ◇
        </span>

        <h1 className="text-xl font-semibold">
          Graph Algorithm Visualizer
        </h1>
      </div>


      {/* Algorithm selector */}
      <div className="flex items-center gap-6">

        <select  value={algorithm}
        onChange={(event) =>
          onAlgorithmChange(event.target.value)
        }>
         <option value="bfs">BFS</option>
        <option value="dfs">DFS</option>
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
        </select>

        <button
          type="button"
          className="rounded-lg border px-3 py-2"
        >
          ⚙
        </button>

      </div>

    </header>
  );
}

export default AppHeader;