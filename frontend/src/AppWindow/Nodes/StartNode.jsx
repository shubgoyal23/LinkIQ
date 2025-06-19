import { Handle, Position } from "@xyflow/react";

export default function StartNode({ data }) {
  return (
    <div className="p-1 flex items-center justify-center rounded-l-full rounded-r-2xl shadow-md bg-card border border-border focus:border-2 hover:border-border transition-all duration-300 ease-in-out w-20 h-16 cursor-pointer active:border-primary !active:ring !active:ring-primary !active:ring-offset-2 !active:ring-offset-border">
      <div className="font-bold text-foreground text-center">{data}</div>
      <Handle
        className="!w-2 !h-2 !rounded-none !bg-chart-4"
        type="source"
        position={Position.Right}
      />
    </div>
  );
}
