import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export default class RedditClient {
  constructor() {
    this.clientId = process.env.REDDIT_CLIENT_ID;
    this.clientSecret = process.env.REDDIT_CLIENT_SECRET;
    this.userAgent = process.env.REDDIT_USER_AGENT || "NodeRedditClient/1.0";
    this.accessToken = null;
  }

  async authenticate() {
    try {
      const response = await axios.post(
        "https://www.reddit.com/api/v1/access_token",
        "grant_type=client_credentials",
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": this.userAgent,
          },
        }
      );
      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error(
        "Authentication failed:",
        error.response?.data || error.message
      );
    }
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      "User-Agent": this.userAgent,
    };
  }

  async getUserInfo(username) {
    try {
      const response = await axios.get(
        `https://oauth.reddit.com/user/${username}/about`,
        { headers: this.getHeaders() }
      );
      const user = response.data.data;
      return {
        username: user.name,
        id: user.id,
        created_utc: new Date(user.created_utc * 1000).toISOString(),
        comment_karma: user.comment_karma,
        link_karma: user.link_karma,
        total_karma: user.comment_karma + user.link_karma,
        is_verified: user.verified,
        is_employee: user.is_employee,
        is_mod: user.is_mod,
        has_verified_email: user.has_verified_email,
        description: user.subreddit?.public_description || "",
        profile_url: `https://reddit.com/u/${user.name}`,
        fetched_at: new Date().toISOString(),
      };
    } catch (error) {
      console.error(
        `Failed to fetch user info: ${error.response?.data || error.message}`
      );
      return null;
    }
  }

  async getUserPosts(username, limit = 5) {
    try {
      const response = await axios.get(
        `https://oauth.reddit.com/user/${username}/submitted?limit=${limit}`,
        { headers: this.getHeaders() }
      );
      return response.data.data.children.map((post) => {
        const p = post.data;
        return {
          id: p.id,
          title: p.title,
          selftext: p.selftext,
          url: p.url,
          subreddit: p.subreddit,
          score: p.score,
          upvote_ratio: p.upvote_ratio,
          num_comments: p.num_comments,
          created_utc: new Date(p.created_utc * 1000).toISOString(),
          is_self: p.is_self,
          is_nsfw: p.over_18,
          permalink: `https://reddit.com${p.permalink}`,
          short_link: `https://redd.it/${p.id}`,
          subreddit_url: `https://reddit.com/r/${p.subreddit}`,
          author: p.author,
          author_url: `https://reddit.com/u/${p.author}`,
          fetched_at: new Date().toISOString(),
        };
      });
    } catch (error) {
      console.error(
        `Failed to fetch posts: ${error.response?.data || error.message}`
      );
      return [];
    }
  }
}
