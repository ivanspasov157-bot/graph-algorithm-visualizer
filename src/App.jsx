import { useState } from 'react'
import AppHeader from './components/AppHeader'
import GraphPanel from './components/GraphPanel'
import NodeInputPanel from './components/NodeInputPanel'
import ResultPanel from './components/ResultsPanel'

import { graph,  nodePositions } from "./data/testgraph1.js";
import { aStar } from "./algorithms/A_star.js";
import { dijkstra } from "./algorithms/dijkstra.js";
import { bfs } from "./algorithms/bfs.js";
import { dfs } from './algorithms/dfs.js'


function App() {
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [startNode, setStartNode] = useState("A");
  const [endNode, setEndNode] = useState("F");
  const [result, setResult] = useState(null);
  
function runAlgorithm() {
  let nextResult;

  if (algorithm === "bfs") {
    nextResult = bfs(graph, startNode, endNode);
  }

  else if (algorithm === "dfs") {
    nextResult = dfs(graph, startNode, endNode);
  }

  else if (algorithm === "dijkstra") {
    nextResult = dijkstra(graph, startNode, endNode);
  }

  else if (algorithm === "astar") {
    nextResult = aStar(
      graph,
      nodePositions,
      startNode,
      endNode
    );
  }

  setResult(nextResult);
}

  return (
    <>
    <AppHeader 
     algorithm={algorithm}
      onAlgorithmChange={setAlgorithm}
    />
    <main  className="grid gap-6 p-6 lg:grid-cols-[2fr_1fr]" >
      <div className="flex flex-col gap-6">
       <NodeInputPanel  
         startNode={startNode}
         endNode={endNode}
         onStartChange={setStartNode}
         onEndChange={setEndNode}/>

       <GraphPanel 
       onRun={runAlgorithm}
       result={result}  
       graph={graph}
       positions={nodePositions} 
       startNode={startNode}
       endNode={endNode}/>
      </div>
      <ResultPanel 
      result={result} 
      algorithm={algorithm} />
      
    </main>
    
    
    
    </>
  
  )
}

export default App
