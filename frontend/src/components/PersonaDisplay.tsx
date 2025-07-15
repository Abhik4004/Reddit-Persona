import React from "react";
import { User, Target, Zap, Heart, AlertCircle, Download } from "lucide-react";
import { PersonaData } from "../types/persona";

interface PersonaDisplayProps {
  persona: PersonaData;
  onDownload: () => void;
}

const PersonaDisplay: React.FC<PersonaDisplayProps> = ({
  persona,
  onDownload,
}) => {
  const renderProgressBar = (value: number, max: number = 100) => (
    <div className="flex items-center gap-2">
      <div className="w-32 bg-gray-200 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-sm text-gray-600">{value}%</span>
    </div>
  );

  const renderPersonalityScale = (
    leftLabel: string,
    rightLabel: string,
    leftValue: number,
    rightValue: number
  ) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="relative w-full bg-gray-200 rounded-full h-2">
        <div
          className="absolute top-0 left-0 bg-gray-400 h-2 rounded-l-full"
          style={{ width: `${leftValue}%` }}
        />
        <div
          className="absolute top-0 right-0 bg-gray-600 h-2 rounded-r-full"
          style={{ width: `${rightValue}%` }}
        />
      </div>
    </div>
  );

  const renderListWithCitations = (
    items: Array<{ text: string; citations: any[] }>
  ) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border-l-4 border-orange-200 pl-4">
          <p className="text-gray-700 mb-2">{item.text}</p>
          <div className="flex flex-wrap gap-1">
            {item.citations.map((citation, citIndex) => (
              <a
                key={citIndex}
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded transition-colors"
              >
                <span
                  className={
                    citation.type === "post"
                      ? "text-blue-600"
                      : "text-green-600"
                  }
                >
                  {citation.type === "post" ? "📝" : "💬"}
                </span>
                <span className="text-blue-700 truncate max-w-20">
                  {citation.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{persona.name}</h1>
              <p className="text-orange-100 text-lg">"{persona.quote}"</p>
            </div>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 font-medium">AGE</span>
                  <p className="text-gray-900">{persona.age}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">OCCUPATION</span>
                  <p className="text-gray-900">{persona.occupation}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">STATUS</span>
                  <p className="text-gray-900">{persona.status}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">LOCATION</span>
                  <p className="text-gray-900">{persona.location}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">TIER</span>
                  <p className="text-gray-900">{persona.tier}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">ARCHETYPE</span>
                  <p className="text-gray-900">{persona.archetype}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {persona.personalityTraits.map((trait, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Motivations */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                MOTIVATIONS
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">CONVENIENCE</span>
                  {renderProgressBar(persona.motivations.convenience)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">WELLNESS</span>
                  {renderProgressBar(persona.motivations.wellness)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">SPEED</span>
                  {renderProgressBar(persona.motivations.speed)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">PREFERENCES</span>
                  {renderProgressBar(persona.motivations.preferences)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">COMFORT</span>
                  {renderProgressBar(persona.motivations.comfort)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">DIETARY NEEDS</span>
                  {renderProgressBar(persona.motivations.dietaryNeeds)}
                </div>
              </div>
            </div>

            {/* Personality */}
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                PERSONALITY
              </h3>
              <div className="space-y-2">
                {renderPersonalityScale(
                  "INTROVERT",
                  "EXTROVERT",
                  persona.personality.introvert,
                  persona.personality.extrovert
                )}
                {renderPersonalityScale(
                  "INTUITION",
                  "SENSING",
                  persona.personality.intuition,
                  persona.personality.sensing
                )}
                {renderPersonalityScale(
                  "FEELING",
                  "THINKING",
                  persona.personality.feeling,
                  persona.personality.thinking
                )}
                {renderPersonalityScale(
                  "PERCEIVING",
                  "JUDGING",
                  persona.personality.perceiving,
                  persona.personality.judging
                )}
              </div>
            </div>
          </div>

          {/* Behavior & Habits */}
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              BEHAVIOUR & HABITS
            </h3>
            {renderListWithCitations(persona.behaviors)}
          </div>

          {/* Frustrations & Goals */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                FRUSTRATIONS
              </h3>
              {renderListWithCitations(persona.frustrations)}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                GOALS & NEEDS
              </h3>
              {renderListWithCitations(persona.goals)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaDisplay;
