import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ error: "", isLoading: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ error: "", isLoading: true });

    try {
      const response = await fetch("http://localhost:8080/api/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Token'ı localStorage'a "token" adıyla kaydediyoruz:
        localStorage.setItem("token", data.token);
        
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setStatus({ error: "Invalid username or password.", isLoading: false });
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus({ error: "Cannot connect to server.", isLoading: false });
    }
  };

  return (
    <>
      {status.error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold border border-red-100">
          {status.error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm uppercase tracking-wide text-[#8b7a93] mb-2 font-semibold">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter your username" className="w-full rounded-xl bg-[#faf7fb] border border-[#ece7ef] px-4 py-3 text-[#4f4557] outline-none focus:ring-2 focus:ring-[var(--primary-soft)] transition-all" />
        </div>
        
        <div>
          <label className="block text-sm uppercase tracking-wide text-[#8b7a93] mb-2 font-semibold">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password" className="w-full rounded-xl bg-[#faf7fb] border border-[#ece7ef] px-4 py-3 text-[#4f4557] outline-none focus:ring-2 focus:ring-[var(--primary-soft)] transition-all" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center gap-2 text-sm text-[#6d6075]"><input type="checkbox" className="accent-[var(--primary)] rounded" /> Remember me</label>
          <button type="button" className="text-sm text-[var(--primary)] hover:underline font-semibold">Forgot Password?</button>
        </div>

        <button type="submit" disabled={status.isLoading} className="w-full mt-6 rounded-xl px-5 py-3 font-bold text-white transition-all shadow-sm hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-soft))' }}>{status.isLoading ? "Logging in..." : "Log In"}</button>
      </form>
    </>
  );
}
