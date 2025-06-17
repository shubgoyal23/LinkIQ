import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice/userSlice";
import {conf} from "@/conf/conf";

function GoogleLoginApp() {
   return (
      <GoogleOAuthProvider clientId={conf.GOOGLE_CLIENT_ID}>
         <GoogleLoginAppaa />
      </GoogleOAuthProvider>
   );
}

function GoogleLoginAppaa() {
   const dispatch = useDispatch();
   const LoginWithGoogle = (data) => {
      const token = data?.token;
      api.post("/login-google", {
         token,
      })
         .then((res) => {
            if (res.success) {
               dispatch(login(res.data));
               toast.success("Logged in successfully");
            }
         })
         .catch((err) => {
            console.log(err);
            toast.error(err.message || "Invalid email or password");
         });
   };
   const loginFlow = useGoogleLogin({
      onSuccess: (codeResponse) => {
         LoginWithGoogle({ token: codeResponse.code });
      },
      flow: "auth-code",
   });
   return (
      <Button
         variant="outline"
         className="w-full cursor-pointer"
         onClick={() => loginFlow()}
      >
         Login with Google
      </Button>
   );
}

export default GoogleLoginApp;
