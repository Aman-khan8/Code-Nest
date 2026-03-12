import { Save, Play, Sun, Moon } from "lucide-react";
import Button from "./Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../store/themeSlicer.js";

const Navbar = () => {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 
    backdrop-blur-md 
    border-b border-slate-700/60 
    shadow-lg shadow-black/30">

      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight
      bg-linear-to-r from-blue-400 via-indigo-400 to-emerald-400
      bg-clip-text text-transparent">
        DevArena
      </h1>

      {/* Controls */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <Button
          content={mode === "dark" ? <Moon size={18}/> : <Sun size={18}/>}
          className="p-2 bg-slate-800/70 hover:bg-slate-700 
          border border-slate-600/40
          rounded-lg 
          shadow-md shadow-black/40
                    text-white
          hover:shadow-lg hover:shadow-blue-500/20
          transition-all duration-200"
          onClick={() => dispatch(toggleMode())}
        />

        {/* Run */}
        <Button
          content={
            <div className="flex items-center gap-2">
              <Play size={18}/>
              <span>Run</span>
            </div>
          }
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700
          border border-slate-600/40
          rounded-lg
          shadow-md shadow-black/40
                    text-white
          hover:shadow-lg hover:shadow-blue-500/20
          transition-all duration-200"
        />

        {/* Save */}
        <Button
          content={
            <div className="flex items-center gap-2">
              <Save size={18}/>
              <span>Save</span>
            </div>
          }
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500
          border border-emerald-400/40
          rounded-lg
          shadow-md shadow-emerald-900/40
          text-white
          hover:shadow-lg hover:shadow-emerald-500/40
          transition-all duration-200"
        />

      </div>
    </div>
  );
};

export default Navbar;