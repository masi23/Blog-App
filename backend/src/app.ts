import express from "express";
const cors = require("cors");
import helmet from "helmet";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handler";
import UserRouter from "./routers/user.route";
import CategoryRouter from "./routers/category.route";
import AuthRouter from "./routers/auth.route";
import TagRouter from "./routers/tag.route";
import PostRouter from "./routers/post.route";
import SavedListRouter from "./routers/savedList.route";
import LikeRouter from "./routers/like.route";
import CommentRouter from "./routers/comment.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/", AuthRouter);
app.use("/users", UserRouter);
app.use("/categories", CategoryRouter);
app.use("/tags", TagRouter);
app.use("/posts", PostRouter);
app.use("/savedLists", SavedListRouter);
app.use("/likes", LikeRouter);
app.use("/comments", CommentRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("See at http://localhost:3000");
});
