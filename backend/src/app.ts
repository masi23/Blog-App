import express from "express";
// import { PrismaClient } from "./generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handler";
import UserRouter from "./routers/user.route";
import CategoryRouter from "./routers/category.route";
import AuthRouter from "./routers/auth.route";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/", AuthRouter);
app.use("/users", UserRouter);
app.use("/categories", CategoryRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("See at http://localhost:3000");
});
