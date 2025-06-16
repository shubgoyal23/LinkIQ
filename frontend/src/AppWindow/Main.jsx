import React, { useState } from "react";
import Flow from "./Flow";
import Header from "@/components/Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useNodesState, useEdgesState } from "@xyflow/react";

const initialNodes = [{
  id: "node-1",
  position: { x: 0, y: 0 },
  data: "hello",
  type: "startNode",
}];
const initialEdges = [];


function Main() {
   const [collapsed, setCollapsed] = useState(true);
   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const addNode = (node) => {
      setNodes((nds) => [...nds, node]);
   };
   return (
      <div className="w-full h-full flex flex-col">
         <Header />
         <div className="flex-1 flex">
            <Flow
               collapsed={collapsed}
               setCollapsed={setCollapsed}
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               setNodes={setNodes}
               setEdges={setEdges}
            />
            <div>
               <Sidebar
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  addNode={addNode}
               />
            </div>
         </div>
      </div>
   );
}

export default Main;
