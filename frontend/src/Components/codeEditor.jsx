import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript"; // ✅ import JS
import { python } from "@codemirror/lang-python";         // ✅ import Python
import { cpp } from "@codemirror/lang-cpp";
import { useSelector } from "react-redux";


const CodeEditor = ({ code, setCode, language }) => {


  const theme=useSelector((state)=>  state.theme.mode);
  const languageExtension = () => {
    switch(language) {
      case "cpp": return cpp();
      case "python": return python();
      case "javascript": return javascript();
      default: return cpp();
    }
  };

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={code}
        height="100%" 
        theme={theme==="dark"?"dark":"light"} // You can also pass the Redux theme here
        extensions={[languageExtension()]}
        onChange={(value) => setCode(value)}
        className="text-base sm:text-lg"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;