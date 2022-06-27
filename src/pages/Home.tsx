import { useState } from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import SignupForm from "../components/AuthForms/SignupForm";

export default function Home() {
  const [authState, setAuthState] = useState<"login" | "signup">("signup");

  return (
    <section className="h-screen w-screen flex justify-center">
      <section className="mt-[100px]">
        <div className="flex items-center mb-10">
          <div
            onClick={() => setAuthState("login")}
            className={`p-3 ${authState === "login" ? "border-b-2 border-blue-500" : ""}`}
          >
            <p className="text-xl cursor-pointer">Login</p>
          </div>

          <div
            onClick={() => setAuthState("signup")}
            className={`p-3 ${authState === "signup" ? "border-b-2 border-blue-500" : ""}`}
          >
            <p className="text-xl cursor-pointer">Signup</p>
          </div>
        </div>

        {authState === "login" ? <LoginForm /> : <SignupForm />}
      </section>
    </section>
  );
}
