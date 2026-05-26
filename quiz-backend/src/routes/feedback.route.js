import express from "express";
import { submitFeedback, getMyFeedbacks } from "../controllers/feedback.controller.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/feedback", submitFeedback);
feedbackRouter.get("/feedback/my", getMyFeedbacks);

export default feedbackRouter;
