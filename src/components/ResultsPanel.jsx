function ResultPanel({result , algorithm}) {

 const explanations = {
    bfs: "BFS explores the graph level by level and does not use edge weights.",

    dfs: "DFS explores as deeply as possible along one branch before backtracking.",

    dijkstra:
      "Dijkstra finds the shortest weighted path in graphs with non-negative edge weights.",

    astar:
      "A* finds a shortest weighted path while also using a heuristic estimate to guide the search."
  };

  return (
      <aside className="flex flex-col gap-4">
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Visited Order
        </h2>

        <p className="text-lg font-medium">
          {result
            ? result.visitedOrder.join(", ")
            : "—"}
        </p>
      </article>

      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Path Found
        </h2>

        <p className="text-xl font-semibold text-violet-600">
          {result
            ? result.path.join(" → ")
            : "—"}
        </p>
      </article>


   
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Total Distance
        </h2>

        <p className="text-xl font-semibold">
          {result
            ? result.distance
            : "—"}
        </p>
      </article>


     
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Algorithm Explanation
        </h2>

         <p className="text-sm leading-6 text-slate-700">
          {explanations[algorithm]}
        </p>
      </article>

    </aside>
  );
}

export default ResultPanel;