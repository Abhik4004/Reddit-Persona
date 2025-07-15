import { BackendResponse, PersonaData, Citation } from "../types/persona";

export const processBackendDataToPersona = (
  backendData: BackendResponse,
  redditUrl: string
): PersonaData => {
  const { userInfo, userPosts, reply } = backendData;

  // Extract username from the data
  const username = userInfo.username || "RedditUser";

  // Convert backend citations to our Citation format
  const convertCitations = (
    backendCitations: Array<{ url: string; title: string }>
  ): Citation[] => {
    return backendCitations.map((citation) => ({
      text: citation.title,
      url: citation.url,
      type: "post" as const, // Assuming all are posts for now, could be enhanced
    }));
  };

  // If we have AI-processed data from the backend, use it
  if (reply) {
    // Convert personality percentages from 0-1 to 0-100 scale
    const convertedPersonality = {
      introvert: Math.round(reply.personality.introvert * 100),
      extrovert: Math.round(reply.personality.extrovert * 100),
      intuition: Math.round(reply.personality.intuition * 100),
      sensing: Math.round(reply.personality.sensing * 100),
      feeling: Math.round(reply.personality.feeling * 100),
      thinking: Math.round(reply.personality.thinking * 100),
      perceiving: Math.round(reply.personality.perceiving * 100),
      judging: Math.round(reply.personality.judging * 100),
    };

    return {
      name: `${username.charAt(0).toUpperCase() + username.slice(1)}`,
      age: estimateAge(userInfo),
      occupation: estimateOccupation(userPosts, getTopSubreddits(userPosts)),
      status: "Unknown", // Could be enhanced with AI analysis
      location: extractLocation(userPosts) || "Unknown",
      tier: determineTier(
        userInfo.total_karma || 0,
        calculateAvgScore(userPosts)
      ),
      archetype: determineArchetype(getTopSubreddits(userPosts)),
      quote: generateQuote(reply.personalityTraits),
      motivations: generateMotivations(
        reply.personalityTraits,
        reply.behaviors
      ),
      personality: convertedPersonality,
      personalityTraits: reply.personalityTraits,
      behaviors: reply.behaviors.map((behavior) => ({
        text: behavior.text,
        citations: convertCitations(behavior.citations),
      })),
      frustrations: reply.frustrations.map((frustration) => ({
        text: frustration.text,
        citations: convertCitations(frustration.citations),
      })),
      goals: reply.goals.map((goal) => ({
        text: goal.text,
        citations: convertCitations(goal.citations),
      })),
    };
  }

  // Fallback to basic processing if no AI reply
  return processBasicPersona(userInfo, userPosts, username);
};

// Helper functions
const getTopSubreddits = (posts: any[]): string[] => {
  const subredditCounts = posts.reduce((acc, post) => {
    acc[post.subreddit] = (acc[post.subreddit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(subredditCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([subreddit]) => subreddit);
};

const calculateAvgScore = (posts: any[]): number => {
  if (posts.length === 0) return 0;
  return posts.reduce((sum, post) => sum + (post.score || 0), 0) / posts.length;
};

const estimateAge = (userInfo: any): number => {
  // Calculate account age and estimate user age
  const accountCreated = new Date(userInfo.created_utc);
  const accountAgeYears =
    (Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365);

  // Rough estimation: assume users create accounts in their 20s-30s
  return Math.floor(25 + accountAgeYears);
};

const estimateOccupation = (posts: any[], topSubreddits: string[]): string => {
  // Enhanced occupation estimation
  const businessSubs = [
    "entrepreneur",
    "business",
    "investing",
    "finance",
    "startup",
  ];
  const techSubs = [
    "programming",
    "webdev",
    "javascript",
    "python",
    "technology",
  ];
  const creativeSubs = ["design", "art", "photography", "writing"];
  const localSubs = ["lucknow", "delhi", "india"]; // Location-based subs

  if (topSubreddits.some((sub) => businessSubs.includes(sub.toLowerCase()))) {
    return "Business Professional";
  } else if (
    topSubreddits.some((sub) => techSubs.includes(sub.toLowerCase()))
  ) {
    return "Software Developer";
  } else if (
    topSubreddits.some((sub) => creativeSubs.includes(sub.toLowerCase()))
  ) {
    return "Creative Professional";
  } else if (
    topSubreddits.some((sub) => localSubs.includes(sub.toLowerCase()))
  ) {
    return "Local Business Owner"; // Based on the example data
  }

  return "Professional";
};

const extractLocation = (posts: any[]): string | null => {
  // Extract location from subreddit activity
  const locationSubs = posts.map((post) => post.subreddit.toLowerCase());

  if (locationSubs.includes("lucknow")) return "Lucknow, India";
  if (locationSubs.includes("delhi")) return "Delhi, India";
  if (locationSubs.includes("mumbai")) return "Mumbai, India";

  return null;
};

const determineTier = (karma: number, avgScore: number): string => {
  if (karma > 10000 && avgScore > 50) return "Power User";
  if (karma > 1000 && avgScore > 20) return "Active Contributor";
  if (karma > 100) return "Regular User";
  return "New User";
};

const determineArchetype = (topSubreddits: string[]): string => {
  const archetypes = {
    business: "The Entrepreneur",
    local: "The Local Explorer",
    tech: "The Innovator",
    creative: "The Creator",
    default: "The Observer",
  };

  const topSub = topSubreddits[0]?.toLowerCase() || "";

  if (topSub.includes("business") || topSub.includes("entrepreneur"))
    return archetypes.business;
  if (topSub.includes("lucknow") || topSub.includes("delhi"))
    return archetypes.local;
  if (topSub.includes("programming") || topSub.includes("tech"))
    return archetypes.tech;
  if (topSub.includes("art") || topSub.includes("design"))
    return archetypes.creative;

  return archetypes.default;
};

const generateQuote = (traits: string[]): string => {
  // Generate a quote based on personality traits
  if (traits.includes("Analytical") && traits.includes("Observant")) {
    return "I believe in understanding the 'why' behind everything I encounter.";
  }
  if (traits.includes("Goal-oriented") && traits.includes("Practical")) {
    return "Every action should have a purpose, every moment should be productive.";
  }
  if (traits.includes("Inquisitive") && traits.includes("Adaptable")) {
    return "New environments are opportunities to learn and grow.";
  }

  return "I approach life with curiosity and purpose.";
};

const generateMotivations = (traits: string[], behaviors: any[]) => {
  // Generate motivations based on traits and behaviors
  const baseMotivations = {
    convenience: 70,
    wellness: 60,
    speed: 65,
    preferences: 75,
    comfort: 55,
    dietaryNeeds: 45,
  };

  // Adjust based on traits
  if (traits.includes("Goal-oriented")) {
    baseMotivations.speed += 15;
    baseMotivations.convenience += 10;
  }

  if (traits.includes("Practical")) {
    baseMotivations.preferences += 10;
    baseMotivations.convenience += 15;
  }

  if (traits.includes("Structured")) {
    baseMotivations.preferences += 15;
  }

  // Ensure values don't exceed 100
  Object.keys(baseMotivations).forEach((key) => {
    baseMotivations[key as keyof typeof baseMotivations] = Math.min(
      100,
      baseMotivations[key as keyof typeof baseMotivations]
    );
  });

  return baseMotivations;
};

const processBasicPersona = (
  userInfo: any,
  userPosts: any[],
  username: string
): PersonaData => {
  // Fallback basic processing when no AI reply is available
  const topSubreddits = getTopSubreddits(userPosts);

  return {
    name: `${username.charAt(0).toUpperCase() + username.slice(1)}`,
    age: estimateAge(userInfo),
    occupation: estimateOccupation(userPosts, topSubreddits),
    status: "Unknown",
    location: extractLocation(userPosts) || "Unknown",
    tier: determineTier(
      userInfo.total_karma || 0,
      calculateAvgScore(userPosts)
    ),
    archetype: determineArchetype(topSubreddits),
    quote: "I'm exploring and engaging with communities that interest me.",
    motivations: {
      convenience: 65,
      wellness: 55,
      speed: 60,
      preferences: 70,
      comfort: 50,
      dietaryNeeds: 40,
    },
    personality: {
      introvert: 60,
      extrovert: 40,
      intuition: 45,
      sensing: 55,
      feeling: 40,
      thinking: 60,
      perceiving: 50,
      judging: 50,
    },
    personalityTraits: ["Curious", "Engaged", "Community-Minded"],
    behaviors: [
      {
        text: `Active in ${topSubreddits[0] || "various"} communities with ${
          userPosts.length
        } posts analyzed.`,
        citations: userPosts.slice(0, 2).map((post) => ({
          text: post.title,
          url: post.url,
          type: "post" as const,
        })),
      },
    ],
    frustrations: [
      {
        text: "May experience challenges adapting to new environments or communities.",
        citations: userPosts.slice(0, 1).map((post) => ({
          text: post.title,
          url: post.url,
          type: "post" as const,
        })),
      },
    ],
    goals: [
      {
        text: "Seeks to build meaningful connections and understand new environments.",
        citations: userPosts.slice(0, 2).map((post) => ({
          text: post.title,
          url: post.url,
          type: "post" as const,
        })),
      },
    ],
  };
};
