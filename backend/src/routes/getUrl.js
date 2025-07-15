import { Router } from "express";
import { body, validationResult } from "express-validator";
import RedditClient from "../utils/redditClient.js";
import { generatePersonalityPrompt } from "../llm/prompt.js";
const app = Router();

app.post(
  "/api/user/link",
  [body("url").isURL().withMessage("Invalid Reddit URL")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });

    const { url } = req.body;

    const match = url.match(/reddit\.com\/user\/([^/?#]+)/i);
    if (!match) {
      return res
        .status(400)
        .json({ msg: "Could not extract username from URL" });
    }

    const username = match[1];
    console.log("Extracted username:", username);

    const reddit = new RedditClient();
    await reddit.authenticate();

    const userInfo = await reddit.getUserInfo(username);
    const userPosts = await reddit.getUserPosts(username, 5);
    const reply = await generatePersonalityPrompt(userInfo, userPosts);
    return res.status(200).json({ userInfo, userPosts, reply });
  }
);

export { app as getUrl };
