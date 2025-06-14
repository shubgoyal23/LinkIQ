import React from "react";
import ThemeToggler from "@/utils/ThemeToggler";
import Logout from "@/Auth/Logout";

function Header() {
   return (
      <div className="w-full h-14 flex items-center justify-between px-4 bg-card border-b border-border">
         <div className="flex items-center gap-2 font-bold text-lg ">MindIQ</div>
         <div className="flex items-center gap-2">
            <ThemeToggler />
            <Logout />
         </div>
      </div>
   );
}

export default Header;
