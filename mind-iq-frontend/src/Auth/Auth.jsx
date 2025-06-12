import React, { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";

function Auth() {
   const [currentPage, setCurrentPage] = useState("login");

   return (
      <div>
         {currentPage === "login" ? (
            <LoginPage setCurrentPage={setCurrentPage} />
         ) : (
            <RegisterPage setCurrentPage={setCurrentPage} />
         )}
      </div>
   );
}

export default Auth;
