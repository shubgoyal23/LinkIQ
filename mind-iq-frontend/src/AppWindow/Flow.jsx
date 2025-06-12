import React, { useCallback } from "react";
import {
   ReactFlow,
   MiniMap,
   Controls,
   Background,
   useNodesState,
   useEdgesState,
   addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useSelector } from "react-redux";

const initialNodes = [
   { id: "1", position: { x: 0, y: 0 }, data: { label: "llm" } },
   { id: "2", position: { x: 0, y: 100 }, data: { label: "agent" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
   const theme = useSelector((state) => state.theme.mode);
   console.log(theme);
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

   const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
   );

   return (
      <div className="w-full h-full overflow-hidden">
         <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            colorMode={theme}
         >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={16} size={1} />
         </ReactFlow>
      </div>
   );
}
