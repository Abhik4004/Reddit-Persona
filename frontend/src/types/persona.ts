export interface Citation {
  text: string;
  url: string;
  type: "post" | "comment";
}

export interface PersonaData {
  name: string;
  age: number;
  occupation: string;
  status: string;
  location: string;
  tier: string;
  archetype: string;
  quote: string;
  motivations: {
    convenience: number;
    wellness: number;
    speed: number;
    preferences: number;
    comfort: number;
    dietaryNeeds: number;
  };
  personality: {
    introvert: number;
    extrovert: number;
    intuition: number;
    sensing: number;
    feeling: number;
    thinking: number;
    perceiving: number;
    judging: number;
  };
  personalityTraits: string[];
  behaviors: Array<{ text: string; citations: Citation[] }>;
  frustrations: Array<{ text: string; citations: Citation[] }>;
  goals: Array<{ text: string; citations: Citation[] }>;
}

export interface BackendUserInfo {
  username: string;
  karma: number;
  created_utc: number;
  // Add other fields as they come from your backend
}

export interface BackendUserPost {
  id: string;
  title: string;
  selftext: string;
  url: string;
  created_utc: number;
  score: number;
  subreddit: string;
  // Add other fields as they come from your backend
}

export interface BackendResponse {
  userInfo: BackendUserInfo;
  userPosts: BackendUserPost[];
  reply?: {
    personality: {
      introvert: number;
      extrovert: number;
      intuition: number;
      sensing: number;
      feeling: number;
      thinking: number;
      perceiving: number;
      judging: number;
    };
    personalityTraits: string[];
    behaviors: Array<{
      text: string;
      citations: Array<{
        url: string;
        title: string;
      }>;
    }>;
    frustrations: Array<{
      text: string;
      citations: Array<{
        url: string;
        title: string;
      }>;
    }>;
    goals: Array<{
      text: string;
      citations: Array<{
        url: string;
        title: string;
      }>;
    }>;
  };
}
