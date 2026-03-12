import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript"; // ✅ import JS
import { python } from "@codemirror/lang-python";         // ✅ import Python
import { cpp } from "@codemirror/lang-cpp";
const CodeEditor = ({ code, setCode, language }) => {
  
  // Map language string to CodeMirror extension
  const languageExtension = () => {
    if (language === "cpp") return cpp();
    if (language === "python") return python();
    if (language === "javascript") return javascript();
    return cpp(); // default
  };

  return (
    <div className="h-full flex flex-col">
      <CodeMirror
        value={code}
        height="83vh"
        extensions={[languageExtension()]}
        onChange={(value) => setCode(value)}
        theme="dark"
      />
    </div>
  );
};

export default CodeEditor;