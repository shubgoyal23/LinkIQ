import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

function Sidebar({ collapsed, setCollapsed, addNode }) {
   const nodes = useSelector((state) => state.flow.nodes);
   return (
      <div
         className={`${
            collapsed ? "w-0" : "w-80"
         } transition-all duration-300 ease-in-out border-l border-border h-full shadow-sm `}
      >
         <Button
            variant="ghost"
            className="w-full h-12 cursor-pointer mb-2"
            onClick={() => setCollapsed((p) => !p)}
         >
            {collapsed ? (
               <ArrowBigLeft className="w-6 h-6" />
            ) : (
               <div className="w-full flex items-center gap-2">
                  <ArrowBigLeft className="w-6 h-6 rotate-180" />
                  <span className="text-primary text-lg font-semibold">
                     Manage Nodes
                  </span>
               </div>
            )}
         </Button>
         <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
               {nodes.map((item) => (
                  <p
                     className="text-primary text-lg font-semibold"
                     onClick={() => addNode(item)}
                  >
                     {item.name}
                  </p>
               ))}
            </div>
         </div>
      </div>
   );
}

export default Sidebar;
