import { useEffect } from "react";
import { useSelector } from "react-redux";
import { lazy } from "react";
import { api } from "./lib/api";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice/userSlice";

const AppWindow = lazy(() => import("./AppWindow/Main"));
const Auth = lazy(() => import("./Auth/Auth"));

function App() {
   const user = useSelector((state) => state.user.loggedIn);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!user) {
         api.get("/auth/me").then((res) => {
            if (res.success && res.data) {
               dispatch(login(res.data));
            }
         });
      }
   }, []);
   
   return (
      <main className="w-screen h-svh overflow-x-hidden overflow-y-auto">
         {user ? <AppWindow /> : <Auth />}
      </main>
   );
}

export default App;
