import { useState } from "react";
import CodeEditor from "../Components/codeEditor";
import Navbar from "../Components/navbar.jsx";

const CompilerScreen = () => {

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="h-screen w-full bg-slate-900 text-white flex flex-col">

      {/* Navbar */}
      <div className="h-[15%] flex items-center p-10">
          <Navbar/>

      </div>

      {/* Main Area */}
      <div className="h-[85%] flex">

        {/* Sidebar */}
        <div className="w-[5%] h-full flex flex-col justify-center items-center">
          <div className="mb-4">
            <span>C</span>
          </div>
          <div>
            <span>D</span>
          </div>
        </div>

        {/* Editor */}
        <div className="w-[60%] h-full p-2 overflow-hidden">
          <CodeEditor />
        </div>

        {/* Output */}
        <div className="w-[35%] h-full p-4 overflow-auto">
          <h1 className="text-xl font-bold mb-2">Output</h1>
        </div>

      </div>
    </div>
  );
};

export default CompilerScreen;