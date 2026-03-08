import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    backend: "",
  });

  const [showPassword,setShowPassword]=useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, backend: "", [name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid @gmail.com address",
      }));
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
      );

      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        alert("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Invalid credentials";
      setErrors((prev) => ({ ...prev, backend: message }));
      setFormData((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2">
            Enter your credentials to access DevArena
          </p>
        </div>

        {/* BACKEND ERROR DISPLAY */}
        {errors.backend && (
          <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {errors.backend}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.email ? "border-red-500" : "border-slate-600"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="aman@gmail.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
           <div className="relative"> 
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              className={`w-full px-4 py-3  bg-slate-900/50 border ${errors.password ? "border-red-500" : "border-slate-600"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="••••••••"
              required

              
              />
 <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-4"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>

            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-bold shadow-lg shadow-blue-500/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Login;
