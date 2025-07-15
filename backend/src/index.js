import express from "express";
import { json } from "express";
import cors from "cors";
import { getUrl } from "./routes/getUrl.js";

const app = express();
const port = 8000;

app.use(json());
app.use(cors());

app.use(getUrl);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
