import Feedback from "../models/feedback.model.js";

export const submitFeedback = async (req, resp) => {
  const { name, email, subject, message, feedbackType, rating } = req.body;

  if (!name || !email || !subject || !message) {
    return resp.status(400).json({ message: "All fields are required" });
  }

  const feedback = await Feedback.create({
    name,
    email,
    subject,
    message,
    feedbackType: feedbackType || "general",
    rating: rating || null,
    userId: req.userId || null,
  });

  console.log("Feedback received:", feedback);

  return resp.status(201).json({
    message: "Feedback submitted successfully! Thank you.",
    feedback,
  });
};

export const getMyFeedbacks = async (req, resp) => {
  const feedbacks = await Feedback.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(5);
  return resp.json(feedbacks);
};
