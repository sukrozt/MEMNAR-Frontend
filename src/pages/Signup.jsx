import { Link } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  return (
    <main className="flex-1 p-6 xl:p-8 overflow-y-auto flex items-center justify-center bg-[#fbf9fc]">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 xl:p-10 shadow-sm border border-[#ece7ef]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#6d6075]">Create Account</h1>
          <p className="text-sm text-[#8b7a93] mt-2">Join MEMNAR to save your analysis results</p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-[#8b7a93] mt-8">
          Already have an account? <Link to="/login" className="text-[var(--primary)] font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </main>
  );
}