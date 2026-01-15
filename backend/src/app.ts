import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.json("Hello World");
// });

app.use("/", AuthRouter);
app.use("/users", UserRouter);
app.use("/categories", CategoryRouter);
app.use("/tags", TagRouter);
app.use("/posts", PostRouter);
app.use("/savedLists", SavedListRouter);
app.use("/likes", LikeRouter);
app.use("/comments", CommentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`See at http://localhost:${PORT}`);
});
