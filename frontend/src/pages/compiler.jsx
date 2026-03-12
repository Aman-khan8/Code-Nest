import { useState } from "react";
import CodeEditor from "../Components/codeEditor";
import Navbar from "../Components/navbar.jsx";
import { useSelector } from "react-redux";
import { SiCplusplus, SiPython, SiJavascript } from "react-icons/si";
import Button from "../Components/Button.jsx";



const CompilerScreen = () => {

  const pythonStarterCode = `# Python Hello World
print("Hello World")
`;

const jsStarterCode = `// JavaScript Hello World
console.log("Hello World");
`;

const cppStarterCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`;
  const [code, setCode] = useState(cppStarterCode);
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
 const theme=useSelector((state)=>state.theme.mode);





 
  return (
    <div className={`h-screen w-full  flex flex-col ${theme=="dark"?"bg-slate-900 text-white":"bg-gray-100 text-black"}`}>

      {/* Navbar */}
      <div className="h-[15%] flex items-center">
          <Navbar/>

      </div>

      {/* Main Area */}
      <div className="h-[85%] flex">

        {/* Sidebar */}
        <div className="w-[5%] h-full flex flex-col justify-center items-center gap-y-6 border-r-0.5">
      
          <Button content={<>
                   <SiCplusplus size={32} color="#00599C" />
            </> }
            onClick={() => {
              setCode(cppStarterCode);
              setLanguage("cpp");
            }}
            />
          <Button content={<>
                   <SiPython size={32} color="#3776ab" />
            </> }
              onClick={() => {
              setCode(pythonStarterCode);
              setLanguage("python");
            }}
          
            />
            <Button content={<>
                   <SiJavascript size={32} color="#f7df1e" />
            </> }
            onClick={() => {
              setCode(jsStarterCode);
              setLanguage("javascript");
            }}
            />
        </div>

        {/* Editor */}
        <div className="w-[65%] h-full p-2 overflow-hidden">
          <CodeEditor code={code} setCode={setCode} language={language} />
        </div>

        {/* Output */}
        <div className="w-[30%] h-full p-4 overflow-auto">
          <h1 className="text-xl font-bold mb-2">Output</h1>
        </div>

      </div>
    </div>
  );
};

export default CompilerScreen;