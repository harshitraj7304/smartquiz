import express from "express";
import userRouter from "./routes/users.route.js";
import quizRouter from "./routes/quiz.route.js";
import authRouter from "./routes/auth.route.js";
import "./config/db.config.js";
import quesRouter from "./routes/question.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import { authMiddleware } from "./middlewares/auth.moddleware.js";
import cors from "cors";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
server.use(express.json());

// Public routes (no auth required)
server.use("/api", authRouter);

// Protected routes (require valid JWT)
server.use(authMiddleware);

server.use("/api", userRouter);
server.use("/api", quizRouter);
server.use("/api", quesRouter);
server.use("/api", feedbackRouter);

server.listen(8181, () => {
  console.log(`server started on port ${8181}`);
});
