import React from "react";
import Flow from "./Flow";
import Header from "@/components/Header/Header";
function Main() {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Flow />
      </div>
    </div>
  );
}

export default Main;