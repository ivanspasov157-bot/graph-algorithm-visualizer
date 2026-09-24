function NodeInputPanel({
  startNode,
  endNode,
  onStartChange,
  onEndChange
}) {
  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="flex items-center gap-3">
        <span>⚯</span>
        <h2 className="text-lg font-semibold">Node Input</h2>
      </div>

  
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Start Node</label>

          <select  className="w-full rounded-lg border px-3 py-2"
          value={startNode}
          onChange={(event) =>
          onStartChange(event.target.value)
  }>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" >End Node</label>

          <select className="w-full rounded-lg border px-3 py-2"
           value={endNode}
           onChange={(event) =>
           onEndChange(event.target.value)
  }>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </div>

      
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <span>ⓘ</span>
        <p>Select the start and destination nodes.</p>
      </div>
    </section>
  );
}

export default NodeInputPanel;