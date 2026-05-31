import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function Login({ setIsLoggedIn }) {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto flex items-center justify-center bg-[#fbf9fc]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 xl:p-10 shadow-sm border border-[#ece7ef]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#6d6075]">Welcome Back</h1>
          <p className="text-sm text-[#8b7a93] mt-2">Log in to your account to continue</p>
        </div>

        <LoginForm setIsLoggedIn={setIsLoggedIn} />

        <p className="text-center text-sm text-[#8b7a93] mt-8">
          Don't have an account? <Link to="/signup" className="text-[var(--primary)] font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}