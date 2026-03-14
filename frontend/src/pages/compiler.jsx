import { useEffect, useState } from "react";
import CodeEditor from "../Components/codeEditor";
import Navbar from "../Components/navbar.jsx";
import { useSelector } from "react-redux";
import { SiCplusplus, SiPython, SiJavascript } from "react-icons/si";


const CompilerScreen = () => {
  const starterCodes = {
    python: `# Python Hello World\nprint("Hello World")`,
    javascript: `// JavaScript Hello World\nconsole.log("Hello World");`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}`
  };

  const [code, setCode] = useState(() => {
  const saved = localStorage.getItem("userCodes");

  if (!saved) {
    return starterCodes;
  }

  return JSON.parse(saved);
});
  const [language, setLanguage] = useState("cpp");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);

  const languages = [
    { id: "cpp", icon: <SiCplusplus size={24} color="#00599C" />, label: "C++" },
    { id: "python", icon: <SiPython size={24} color="#3776ab" />, label: "Python" },
    { id: "javascript", icon: <SiJavascript size={24} color="#f7df1e" />, label: "JS" },
  ];

  const handleLangChange = (langId) => {
    setLanguage(langId);
    
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

useEffect(()=>{
  localStorage.setItem("userCodes",JSON.stringify(code))
},[code]);


  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0B0F1A] text-slate-200" : "bg-gray-50 text-slate-900"
    }`}>
      
      {/* Navbar */}
      <div className="h-[10%] min-h-16">
        <Navbar toggleMobileMenu={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="h-[90%] flex flex-col md:flex-row relative">
        
        {/* Responsive Sidebar/Drawer */}
        <div className={`
          absolute md:relative z-20 w-64 md:w-15 lg:w-17.5 h-full 
          flex flex-col items-center py-6 gap-y-6 border-r 
          transition-transform duration-300
          ${theme === "dark" ? "bg-[#0B0F1A] border-slate-800" : "bg-white border-gray-200"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLangChange(lang.id)}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                language === lang.id 
                ? "bg-blue-500/10 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                : "hover:bg-slate-500/10 border border-transparent"
              }`}
            >
              {lang.icon}
            </button>
          ))}
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-10 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Editor Area */}
        <div className="flex-1 h-1/2 md:h-full flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-[70%] h-full p-2">
            <div className={`h-full rounded-2xl overflow-hidden border shadow-2xl ${
              theme === "dark" ? "border-slate-800" : "border-gray-200"
            }`}>
              <CodeEditor
  code={code[language]}
  setCode={(newCode) =>
    setCode((prev) => ({
      ...prev,
      [language]: newCode,
    }))
  }
  language={language}
/>
            </div>
          </div>

          {/* Output Area */}
          <div className={`w-full md:w-[30%] h-full flex flex-col p-4 border-l ${
            theme === "dark" ? "bg-[#0D121F] border-slate-800" : "bg-white border-gray-200"
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest opacity-60">Output</h2>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="font-mono text-sm overflow-auto flex-1 p-3 rounded-lg bg-black/20">
              {/* Output content goes here */}
              <span className="text-emerald-400">$</span> Running {language}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerScreen;