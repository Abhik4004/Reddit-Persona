// Mock data for demonstration purposes
// In production, this would be replaced with actual API calls to the backend

export const generateMockPersona = (redditUrl: string) => {
  const username = redditUrl.match(/\/user\/([^\/]+)/)?.[1] || "RedditUser";

  return {
    name: `${username.charAt(0).toUpperCase() + username.slice(1)} (Generated)`,
    age: Math.floor(Math.random() * 30) + 20,
    occupation: "Software Developer",
    status: "Single",
    location: "San Francisco, CA",
    tier: "Tech Enthusiast",
    archetype: "The Innovator",
    quote:
      "I love discovering new technologies and sharing knowledge with the community.",
    motivations: {
      convenience: 85,
      wellness: 60,
      speed: 75,
      preferences: 70,
      comfort: 55,
      dietaryNeeds: 40,
    },
    personality: {
      introvert: 60,
      extrovert: 40,
      intuition: 75,
      sensing: 25,
      feeling: 45,
      thinking: 55,
      perceiving: 65,
      judging: 35,
    },
    personalityTraits: ["Curious", "Analytical", "Collaborative", "Tech-Savvy"],
    behaviors: [
      {
        text: "Actively participates in programming communities and helps newcomers with coding questions.",
        citations: [
          {
            text: "Helped with React hooks",
            url: `${redditUrl}comments/example1`,
            type: "comment" as const,
          },
          {
            text: "Shared debugging tips",
            url: `${redditUrl}comments/example2`,
            type: "comment" as const,
          },
        ],
      },
      {
        text: "Regularly posts about new technologies and frameworks, showing enthusiasm for learning.",
        citations: [
          {
            text: "Posted about Next.js 14",
            url: `${redditUrl}submitted/example1`,
            type: "post" as const,
          },
          {
            text: "Discussed TypeScript benefits",
            url: `${redditUrl}submitted/example2`,
            type: "post" as const,
          },
        ],
      },
      {
        text: "Engages in technical discussions and provides detailed explanations for complex topics.",
        citations: [
          {
            text: "Explained async/await",
            url: `${redditUrl}comments/example3`,
            type: "comment" as const,
          },
          {
            text: "Database optimization tips",
            url: `${redditUrl}comments/example4`,
            type: "comment" as const,
          },
        ],
      },
    ],
    frustrations: [
      {
        text: "Gets frustrated with poorly documented APIs and outdated tutorials.",
        citations: [
          {
            text: "Complained about API docs",
            url: `${redditUrl}comments/example5`,
            type: "comment" as const,
          },
          {
            text: "Outdated tutorial rant",
            url: `${redditUrl}submitted/example3`,
            type: "post" as const,
          },
        ],
      },
      {
        text: "Dislikes when people don't search for existing solutions before asking questions.",
        citations: [
          {
            text: "Asked to search first",
            url: `${redditUrl}comments/example6`,
            type: "comment" as const,
          },
        ],
      },
    ],
    goals: [
      {
        text: "To become a senior developer and mentor others in the tech community.",
        citations: [
          {
            text: "Career goals discussion",
            url: `${redditUrl}comments/example7`,
            type: "comment" as const,
          },
          {
            text: "Mentoring importance post",
            url: `${redditUrl}submitted/example4`,
            type: "post" as const,
          },
        ],
      },
      {
        text: "To contribute to open-source projects and build a portfolio of meaningful work.",
        citations: [
          {
            text: "Open source contribution",
            url: `${redditUrl}comments/example8`,
            type: "comment" as const,
          },
          {
            text: "Portfolio building tips",
            url: `${redditUrl}submitted/example5`,
            type: "post" as const,
          },
        ],
      },
    ],
  };
};

export const generatePersonaText = (persona: any): string => {
  const sections = [
    `# Reddit User Persona: ${persona.name}`,
    "",
    "## Basic Information",
    `- Age: ${persona.age}`,
    `- Occupation: ${persona.occupation}`,
    `- Status: ${persona.status}`,
    `- Location: ${persona.location}`,
    `- Tier: ${persona.tier}`,
    `- Archetype: ${persona.archetype}`,
    "",
    "## Quote",
    `"${persona.quote}"`,
    "",
    "## Personality Traits",
    persona.personalityTraits.map((trait: string) => `- ${trait}`).join("\n"),
    "",
    "## Motivations",
    `- Convenience: ${persona.motivations.convenience}%`,
    `- Wellness: ${persona.motivations.wellness}%`,
    `- Speed: ${persona.motivations.speed}%`,
    `- Preferences: ${persona.motivations.preferences}%`,
    `- Comfort: ${persona.motivations.comfort}%`,
    `- Dietary Needs: ${persona.motivations.dietaryNeeds}%`,
    "",
    "## Personality Scale",
    `- Introvert (${persona.personality.introvert}%) ← → Extrovert (${persona.personality.extrovert}%)`,
    `- Intuition (${persona.personality.intuition}%) ← → Sensing (${persona.personality.sensing}%)`,
    `- Feeling (${persona.personality.feeling}%) ← → Thinking (${persona.personality.thinking}%)`,
    `- Perceiving (${persona.personality.perceiving}%) ← → Judging (${persona.personality.judging}%)`,
    "",
    "## Behaviors & Habits",
    ...persona.behaviors
      .map((behavior: any) => [
        `- ${behavior.text}`,
        `  Citations: ${behavior.citations
          .map((c: any) => `[${c.type}] ${c.text} (${c.url})`)
          .join(", ")}`,
      ])
      .flat(),
    "",
    "## Frustrations",
    ...persona.frustrations
      .map((frustration: any) => [
        `- ${frustration.text}`,
        `  Citations: ${frustration.citations
          .map((c: any) => `[${c.type}] ${c.text} (${c.url})`)
          .join(", ")}`,
      ])
      .flat(),
    "",
    "## Goals & Needs",
    ...persona.goals
      .map((goal: any) => [
        `- ${goal.text}`,
        `  Citations: ${goal.citations
          .map((c: any) => `[${c.type}] ${c.text} (${c.url})`)
          .join(", ")}`,
      ])
      .flat(),
    "",
    "---",
    `Generated on: ${new Date().toLocaleDateString()}`,
  ];

  return sections.join("\n");
};
