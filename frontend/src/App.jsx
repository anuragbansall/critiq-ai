import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

function App() {
  const codeRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  });

  const handleGetFeedback = async () => {
    const code = codeRef.current.textContent;
    console.log(code);
  };

  return (
    <main className="md:h-screen w-screen bg-[#18181B] text-white p-4 md:p-8 flex flex-col md:flex-row gap-6 font-mono">
      {/* Code Editor */}
      <section className="relative w-full h-screen md:h-full flex flex-col md:max-w-1/2">
        <h2 className="text-2xl font-bold mb-4">Write Your Code</h2>

        <div className="h-full w-full rounded-lg relative overflow-hidden bg-[#27272A]">
          <pre className="h-full w-full m-0 p-4 overflow-auto bg-transparent">
            <code
              className="language-javascript block whitespace-pre-wrap break-words bg-transparent h-full w-full"
              contentEditable={true}
              spellCheck={false}
              suppressContentEditableWarning={true}
              ref={codeRef}
            >
              {`function example() {\n  console.log("Hello, world!");\n}`}
            </code>
          </pre>
        </div>

        <button
          className="absolute bottom-4 right-4 px-4 py-2 text-white rounded-md bg-gradient-to-r from-[#2A1627] to-[#18181B] hover:from-[#3a1c38] hover:to-[#1f1f22] focus:outline-none focus:ring-2 focus:ring-[#2A1627]/60 cursor-pointer transition-all duration-300 shadow-sm"
          onClick={handleGetFeedback}
        >
          Get Feedback 🔮
        </button>
      </section>

      {/* AI Feedback */}
      <section className="relative w-full h-screen md:h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4">AI Feedback</h2>
        <div className="h-full w-full bg-[#27272A] p-4 rounded-lg overflow-auto"></div>
      </section>
    </main>
  );
}

export default App;
