import GraphCanvas from "./GraphCanvasTest.jsx"; 

function GraphPanel({  onRun,
  result,
  graph,
  positions,
  startNode,
  endNode}) {
  return (
      <section className="min-h-[300px] rounded-xl border bg-white p-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Graph</h2>

        <button
          type="button"
          onClick={onRun}
            className="
            rounded-lg
            bg-violet-600
            px-5
            py-2
            text-white
            transition
            hover:bg-violet-700
            active:scale-95
            active:bg-violet-800
            "
        >
          Run
        </button>
      </header>

      <div className="h-[300px] ">
         <GraphCanvas  graph={graph}
               positions={positions}
                     result={result}
                     startNode={startNode}
                     endNode={endNode} /> 
      </div>
    </section>
  );
}

export default GraphPanel;