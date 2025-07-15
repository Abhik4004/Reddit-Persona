import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ConversationChain } from "langchain/chains";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// Use an async wrapper for top-level await
// (async () => {
//   const response = await model.invoke([new HumanMessage("Hello world!")]);
//   console.log("Response:", response.content);
// })();
export async function generatePersonalityPrompt(user, posts) {
  const userSection = `
    User Metadata:
    - Username: ${user.username}
    - ID: ${user.id}
    - Account Created: ${user.created_utc}
    - Verified: ${user.is_verified}
    - Verified Email: ${user.has_verified_email}
    - Moderator: ${user.is_mod}
    - Employee: ${user.is_employee}
    - Comment Karma: ${user.comment_karma}
    - Link Karma: ${user.link_karma}
    - Total Karma: ${user.total_karma}
    - Profile URL: ${user.profile_url}
    `;

  const postSection = posts
    .map((post) => {
      return `---
        Title: ${post.title}
        Subreddit: ${post.subreddit}
        Posted At: ${post.created_utc}
        Score: ${post.score}
        Upvote Ratio: ${post.upvote_ratio}
        Comments: ${post.num_comments}
        Content: ${post.selftext || "[No Text Content]"}
        URL: ${post.url}`;
    })
    .join("\n");

  const instruction = `
        You are a personality analyst AI.

        Using the Reddit user metadata and their post history, generate the following in JSON format:
        {
        "personality": {
            "introvert": number,
            "extrovert": number,
            "intuition": number,
            "sensing": number,
            "feeling": number,
            "thinking": number,
            "perceiving": number,
            "judging": number
        },
        "personalityTraits": string[],
        "behaviors": Array<{ "text": string, "citations": Array<{ "url": string, "title": string }> }>,
        "frustrations": Array<{ "text": string, "citations": Array<{ "url": string, "title": string }> }>,
        "goals": Array<{ "text": string, "citations": Array<{ "url": string, "title": string }> }>
        }

        Base your inference on language used, posting topics, tone, and Reddit behavior (karma, subreddit choice, etc.).
        Use the Myers-Briggs cognitive function model (I/E, N/S, F/T, P/J) to assign values from 0 to 1 in the personality field.
        Be thoughtful, cite relevant posts, and focus on clarity and psychological insight.

        Here is the user's data:
        ${userSection}

        Their posts:
        ${postSection}
    `;

  const chain = new ConversationChain({ llm: model });
  const res = await chain.call({ input: instruction });
  const reply = extractJSONFromResponse(res.response);
  return reply;
}

function extractJSONFromResponse(response) {
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
  if (!jsonMatch || jsonMatch.length < 2) {
    throw new Error("No valid JSON block found in the response.");
  }

  try {
    const jsonString = jsonMatch[1].trim();
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse extracted JSON:", e);
    throw new Error("Extracted block is not valid JSON.");
  }
}
