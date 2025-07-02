import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";

function App() {
  const codeRef = useRef(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  });

  const handleGetFeedback = async () => {
    if (loading) return;

    const code = codeRef.current.textContent;
    if (!code.trim()) {
      alert("Please write some code before getting feedback.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ai/generate",
        {
          prompt: code,
        }
      );

      console.log("AI Response:", response.data);
      setFeedback(response.data.content || "No feedback received.");
      Prism.highlightAll();
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError("Failed to get feedback. Please try again.");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          onClick={handleGetFeedback}
        >
          {loading ? "Analyzing..." : "Get Feedback 🔮"}
        </button>
      </section>

      {/* AI Feedback */}
      {feedback || loading ? (
        <section className="relative w-full h-screen md:h-full flex flex-col md:max-w-1/2">
          <h2 className="text-2xl font-bold mb-4">AI Feedback</h2>
          <div
            className={`h-full w-full bg-[#27272A] p-4 rounded-lg overflow-auto ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <pre>
                <code className="language-javascript">{feedback}</code>
              </pre>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default App;
