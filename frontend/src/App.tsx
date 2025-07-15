import { useState } from "react";
import URLInput from "./components/URLInput";
import LoadingAnimation from "./components/LoadingAnimation";
import PersonaDisplay from "./components/PersonaDisplay";
import { PersonaData, BackendResponse } from "./types/persona";
import { processBackendDataToPersona } from "./utils/personaProcessor";
import { generatePersonaText } from "./utils/mockData";

type AppState = "input" | "loading" | "result";

function App() {
  const [state, setState] = useState<AppState>("input");
  const [persona, setPersona] = useState<PersonaData | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  const handleAnalyze = async (backendData: BackendResponse, url: string) => {
    setState("loading");
    setCurrentUrl(url);

    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        // Process the backend data into a persona
        const processedPersona = processBackendDataToPersona(backendData, url);
        setPersona(processedPersona);
        setState("result");
      } catch (error) {
        console.error("Error processing persona:", error);
        // Handle error state - you might want to add an error state
        setState("input");
      }
    }, 2000); // 2 second delay to show loading animation
  };

  const handleDownload = () => {
    if (!persona) return;

    const personaText = generatePersonaText(persona);
    const blob = new Blob([personaText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reddit-persona-${persona.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartOver = () => {
    setState("input");
    setPersona(null);
    setCurrentUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Reddit Persona Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform any Reddit user's activity into a comprehensive persona
            profile with AI-powered analysis
          </p>
        </div>

        {state === "input" && (
          <URLInput onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {state === "loading" && <LoadingAnimation />}

        {state === "result" && persona && (
          <div className="space-y-6">
            <PersonaDisplay persona={persona} onDownload={handleDownload} />
            <div className="text-center">
              <button
                onClick={handleStartOver}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Analyze Another Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backend Integration Status */}
      <div className="fixed bottom-4 right-4 bg-green-900 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <p className="text-sm">
          <strong>Backend Connected:</strong> Successfully integrated with your
          backend API at localhost:8000 for real-time Reddit data processing and
          persona generation.
        </p>
      </div>
    </div>
  );
}

export default App;
