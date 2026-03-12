import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";

const CodeEditor = () => {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
  cout << "Hello World";
}
`);

  const handleChange = (value) => {
    setCode(value);
  };

  return (
    <div className="h-full flex flex-col">
      <CodeMirror
        value={code}
        height="83vh"
        extensions={[cpp()]}
        onChange={handleChange}
        theme="light"
      />
    </div>
  );
};

export default CodeEditor;