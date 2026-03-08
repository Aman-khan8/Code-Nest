import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 overflow-hidden relative">
      {/* Hero Section */}
      <div className="max-w-3xl text-center space-y-6 z-10 transform-gpu">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent antialiased">
          Welcome to DevArena
        </h1>

        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          The ultimate web-based coding ecosystem. Write, run, and store your
          code across multiple languages in our seamless IDE.
        </p>

        {/* Button Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/20 cursor-pointer transform-gpu hover:scale-105 active:scale-95 will-change-transform"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full sm:w-auto px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-300 rounded-lg font-semibold text-lg cursor-pointer transform-gpu hover:scale-105 active:scale-95 will-change-transform"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Optimized Background Decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full transform-gpu"
          style={{ backfaceVisibility: "hidden" }}
        ></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full transform-gpu"
          style={{ backfaceVisibility: "hidden" }}
        ></div>
      </div>
    </div>
  );
};

export default LandingPage;
