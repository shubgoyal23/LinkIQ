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

const initialNodes = [];
const initialEdges = [];

export default function App() {
  const theme = useSelector((state) => state.theme.mode);
  console.log(theme);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="flex-1 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={theme}
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
    </div>
  );
}
