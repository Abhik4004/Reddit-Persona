import React, { useState } from "react";
import { Search, User, AlertCircle } from "lucide-react";
import axios from "axios";
import { BackendResponse } from "../types/persona";

interface URLInputProps {
  onAnalyze: (backendData: BackendResponse, url: string) => void;
  isLoading: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const validateRedditURL = (url: string): boolean => {
    const redditUserPattern =
      /^https?:\/\/(www\.)?reddit\.com\/user\/[\w-]+\/?$/;
    return redditUserPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a Reddit URL");
      return;
    }

    if (!validateRedditURL(url)) {
      setError(
        "Please enter a valid Reddit user profile URL (e.g., https://www.reddit.com/user/username/)"
      );
      return;
    }

    setLocalLoading(true);

    try {
      const serverResponse = await axios.post(
        "http://localhost:8000/api/user/link",
        { url }
      );
      if (serverResponse.status === 200) {
        const { userInfo, userPosts, reply } = serverResponse.data;
        onAnalyze({ userInfo, userPosts, reply }, url);
      }
    } catch {
      setError(
        "Failed to analyze profile. Please check the URL and try again."
      );
    } finally {
      setLocalLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Reddit User Persona Generator
        </h2>
        <p className="text-gray-600">
          Enter a Reddit user profile URL to generate a detailed persona based
          on their posts and comments
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="reddit-url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reddit User Profile URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="reddit-url"
              value={url}
              onChange={handleInputChange}
              placeholder="https://www.reddit.com/user/username/"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                error ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              disabled={localLoading || isLoading}
            />
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Example URLs:</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>• https://www.reddit.com/user/kojied/</p>
            <p>• https://www.reddit.com/user/Hungry-Move-6603/</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={localLoading || isLoading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {localLoading || isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing Profile...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Generate Persona
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">What we analyze:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Recent posts and comments</li>
          <li>• Interests and hobbies</li>
          <li>• Communication style</li>
          <li>• Behavioral patterns</li>
          <li>• Goals and frustrations</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <strong>Backend Integration Active:</strong> This application now
          connects to your backend service at localhost:8000 for real Reddit
          data processing and persona generation.
        </p>
      </div>
    </div>
  );
};

export default URLInput;
