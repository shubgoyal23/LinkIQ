import { api } from "@/lib/api";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice/userSlice";
import { Button } from "@/components/ui/button";

const Logout = () => {
   const dispatch = useDispatch();
   const handleLogout = () => {
      api.post("/logout")
         .then((res) => {
            if (res.success) {
               dispatch(logout());
               toast.success("Logged out successfully");
            }
         })
         .catch((err) => {
            console.log(err);
            toast.error(err.message || "Failed to logout");
         });
   };

   return (
      <Button
         onClick={handleLogout}
         variant="outline"
         className="cursor-pointer"
      >
         <LogOut className="w-4 h-4" />
         <span className="text-sm">Logout</span>
      </Button>
   );
};

export default Logout;
