import { Save, Play, Sun, Moon, Menu } from "lucide-react";
import Button from "./Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../store/themeSlicer.js";

const Navbar = ({ toggleMobileMenu }) => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <nav className="w-full h-full flex items-center justify-between px-4 md:px-8 border-b border-slate-800/50 backdrop-blur-xl bg-opacity-80">
      
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          DEVARENA
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button
          content={mode === "dark" ? <Moon size={18}/> : <Sun size={18}/>}
          className="p-2 rounded-full hover:bg-slate-500/20 transition-colors"
          onClick={() => dispatch(toggleMode())}
        />

        <div className="h-6 w-px bg-slate-700/50 mx-1 hidden md:block"></div>

        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          <Play size={16} fill="currentColor" />
          <span className="hidden sm:inline">Run Code</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 hover:bg-slate-800 transition-all active:scale-95">
          <Save size={16} />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;