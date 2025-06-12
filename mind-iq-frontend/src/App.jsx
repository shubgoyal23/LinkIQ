import { useSelector } from "react-redux";
import AppWindow from "@/AppWindow/Main";
import Auth from "@/Auth/Auth";

function App() {
   const user = useSelector((state) => state.user.loggedIn);
   return (
      <main className="w-screen h-svh overflow-x-hidden overflow-y-auto">
         {user ? <AppWindow /> : <Auth />}
      </main>
   );
}

export default App;
