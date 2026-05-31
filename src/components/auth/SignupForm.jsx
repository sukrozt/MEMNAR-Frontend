import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ error: "", success: "", isLoading: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "", isLoading: true });

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ error: "", success: "Account created successfully! Redirecting...", isLoading: false });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.text();
        setStatus({ error: errorData || "Registration failed. Please try again.", success: "", isLoading: false });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setStatus({ error: "Cannot connect to server.", success: "", isLoading: false });
    }
  };

  return (
    <>
      {status.error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100">
          {status.error}
        </div>
      )}
      {status.success && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
          {status.success}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSignup}>
        <div>
          <label className="block text-sm uppercase tracking-wide text-[#8b7a93] mb-2 font-semibold">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter your username" className="w-full rounded-xl bg-[#faf7fb] border border-[#ece7ef] px-4 py-3 text-[#4f4557] outline-none focus:ring-2 focus:ring-[var(--primary-soft)] transition-all" />
        </div>
        
        <div>
          <label className="block text-sm uppercase tracking-wide text-[#8b7a93] mb-2 font-semibold">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a password" className="w-full rounded-xl bg-[#faf7fb] border border-[#ece7ef] px-4 py-3 text-[#4f4557] outline-none focus:ring-2 focus:ring-[var(--primary-soft)] transition-all" />
        </div>

        <p className="text-xs text-[#8b7a93] mt-2 leading-relaxed">By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
        <button type="submit" disabled={status.isLoading} className="w-full mt-6 rounded-xl px-5 py-3 font-bold text-white transition-all shadow-sm hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))' }}>{status.isLoading ? "Signing up..." : "Sign Up"}</button>
      </form>
    </>
  );
}
