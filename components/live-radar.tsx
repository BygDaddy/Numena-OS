const priorityConfig: Record<string, { color: string; border: string }> = {
  Urgent: { color: "text-red-500",    border: "border-l-red-400" },
  High:   { color: "text-orange-500", border: "border-l-orange-400" },
  Normal: { color: "text-black/35",   border: "border-l-black/15" },
  Low:    { color: "text-black/25",   border: "border-l-black/10" },
}

export function LiveRadar({ tasks }: { tasks: any[] }) {
  const open = tasks.filter(t => t.status !== 'Done')

  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-black">Live Radar</h2>
            <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full">
              {open.length} open
            </span>
          </div>
          <p className="text-xs text-black/40 mt-0.5">Tap circle to complete task</p>
        </div>
        <button className="text-xs text-black/30 hover:text-black/50">Hide done</button>
      </div>

      <div className="space-y-2">
        {open.length === 0 && (
          <p className="text-sm text-black/30 text-center py-8">All clear!</p>
        )}
        {open.map((task: any) => {
          const cfg = priorityConfig[task.priority] ?? priorityConfig.Normal
          return (
            <div key={task.id} className={`border-l-2 ${cfg.border} pl-3 py-2 bg-black/[0.02] rounded-r-lg`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-semibold uppercase ${cfg.color}`}>{task.priority}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-black/6 text-black/40 px-1.5 py-0.5 rounded uppercase text-[9px]">
                    {task.status}
                  </span>
                  <span className="w-5 h-5 rounded bg-black/8 flex items-center justify-center text-[10px] text-black/50 font-medium">
                    {task.assignee?.[0] ?? '?'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-black font-medium leading-tight">{task.title}</p>
              <p className="text-[11px] text-black/35 mt-0.5">{task.properties?.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
