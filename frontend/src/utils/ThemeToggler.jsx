import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/themeSlice/themeSlice";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggler() {
   const dispatch = useDispatch();
   const theme = useSelector((state) => state.theme.mode);
   const checked = theme === "dark";

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               className="!ring-0 !ring-offset-0 !cursor-pointer"
               variant="ghost"
            >
               {checked ? <Moon size={16} /> : <Sun size={16} />}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuGroup>
               <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(setTheme("light"))}>
                  <Sun size={16} /> Light
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(setTheme("dark"))}>
                  <Moon size={16} /> Dark
               </DropdownMenuItem>
               <DropdownMenuItem className="cursor-pointer" onClick={() => dispatch(setTheme("system"))}>
                  <Monitor size={16} /> System
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
