import { Handle, Position } from "@xyflow/react";

export default function StartNode({ data }) {
   return (
      <div className="p-1 rounded-xl shadow-md bg-card border border-border border-dashed min-w-[200px]">
         <div className="font-bold text-foreground text-center">
            {data}
         </div>
         <Handle className="w-2 h-2 bg-border" type="source" position={Position.Top} />
         <Handle className="w-2 h-2 bg-border" type="target" position={Position.Bottom} />
      </div>
   );
}
