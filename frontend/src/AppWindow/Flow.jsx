import React, { useCallback } from "react";
import {
   ReactFlow,
   MiniMap,
   Controls,
   Background,
   addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StartNode from "./Nodes/StartNode";

const nodeTypes = {
   startNode: StartNode,
};

export default function App({
   collapsed,
   setCollapsed,
   nodes,
   edges,
   onNodesChange,
   onEdgesChange,
   setEdges,
   setNodes,
}) {
   const theme = useSelector((state) => state.theme.mode);
   // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

   const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
   );

   return (
      <div className="relative flex-1 overflow-hidden">
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            colorMode={theme}
            nodeTypes={nodeTypes}
            style={{ height: "100%", width: "100%" }}
            fitView
         >
            <Controls
               orientation="horizontal"
               className="flex gap-2 !border-none"
            />
            <MiniMap />
            <Background variant="dots" gap={20} size={1} />
         </ReactFlow>
         {collapsed && (
            <Button
               variant="outline"
               className="absolute top-2 right-2 w-12 h-12 cursor-pointer transition-all duration-300 ease-in-out"
               onClick={() => setCollapsed((p) => !p)}
            >
               <Plus className="w-6 h-6" />
            </Button>
         )}
      </div>
   );
}
