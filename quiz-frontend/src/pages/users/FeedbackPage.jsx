import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Star, Send, ThumbsUp, HelpCircle, Bug, Loader2, Clock } from "lucide-react";
import { useAuthContenxt } from "../../context/AuthContext";
import { submitFeedback, getMyFeedbacks } from "../../services/FeedbackService";
import toast from "react-hot-toast";

function FeedbackPage() {
  const { user } = useAuthContenxt();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    loadMyFeedbacks();
  }, []);

  async function loadMyFeedbacks() {
    try {
      setLoadingHistory(true);
      const data = await getMyFeedbacks();
      setRecentFeedbacks(data);
    } catch (err) {
      // Silently fail — history is a nice-to-have
    } finally {
      setLoadingHistory(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Subject and message are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitFeedback({
        name: formData.name || user?.name || "Anonymous",
        email: formData.email || user?.email || "anonymous@user.com",
        subject: formData.subject,
        message: formData.message,
        feedbackType,
        rating,
      });

      toast.success("🎉 Thank you for your feedback! We really appreciate it.");
      setRating(0);
      setFeedbackType("general");
      setFormData({ subject: "", message: "", name: user?.name || "", email: user?.email || "" });
      // Refresh history
      loadMyFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const typeColors = {
    general: { border: "border-primary", bg: "bg-primary/5", text: "text-primary" },
    bug: { border: "border-red-500", bg: "bg-red-500/5", text: "text-red-600" },
    question: { border: "border-blue-500", bg: "bg-blue-500/5", text: "text-blue-600" },
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Help &amp; Feedback</h1>
        <p className="text-muted-foreground text-base">We'd love to hear your thoughts on how we can improve SmartQuiz.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 shadow-md">
            <CardHeader className="bg-muted/20 border-b border-border/50 pb-6 rounded-t-xl">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <MessageSquare className="h-6 w-6 text-primary" /> Send Feedback
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Your feedback helps us build a better experience for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Star rating */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">How would you rate your experience?</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 sm:h-10 sm:w-10 cursor-pointer transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                            (hoverRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                              : "text-muted-foreground/30 hover:text-yellow-200"
                          }`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium px-3 py-1 bg-muted/50 rounded-full text-foreground/80">
                      {rating === 0 ? "Select a rating" : rating === 5 ? "Excellent! 🎉" : rating >= 4 ? "Great!" : rating >= 3 ? "Good" : "Needs Improvement"}
                    </span>
                  </div>
                </div>

                {/* Feedback type */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Feedback Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: "general", icon: ThumbsUp, label: "General" },
                      { key: "bug", icon: Bug, label: "Report Bug" },
                      { key: "question", icon: HelpCircle, label: "Question" },
                    ].map(({ key, icon: Icon, label }) => {
                      const c = typeColors[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFeedbackType(key)}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            feedbackType === key
                              ? `${c.border} ${c.bg} ${c.text} shadow-sm`
                              : "border-border/50 bg-transparent text-muted-foreground hover:bg-muted/50 hover:border-border"
                          }`}
                        >
                          <Icon className="h-5 w-5 mb-2" />
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email (pre-filled from auth) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fb-name" className="font-medium">Your Name</Label>
                    <Input
                      id="fb-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-muted/20 border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fb-email" className="font-medium">Your Email</Label>
                    <Input
                      id="fb-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email"
                      className="bg-muted/20 border-border/50"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="fb-subject" className="text-base font-semibold">Subject</Label>
                  <Input
                    id="fb-subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Briefly describe your feedback"
                    className="bg-muted/20 border-border/50 focus-visible:ring-primary/30 h-12"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="fb-message" className="text-base font-semibold">Message</Label>
                  <Textarea
                    id="fb-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you liked, what you didn't, or what feature you'd like to see..."
                    className="min-h-[140px] bg-muted/20 border-border/50 focus-visible:ring-primary/30 resize-y p-3"
                    required
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={rating === 0 || isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-12 text-md shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Submit Feedback</>
                    )}
                  </Button>
                  {rating === 0 && (
                    <p className="text-sm text-muted-foreground mt-2">Select a star rating to enable submission.</p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-primary/10 via-card to-card">
            <CardHeader>
              <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Experiencing an urgent issue? Reach out directly and we'll get back to you ASAP.
              </p>
              <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors group">
                Contact Support
                <Send className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Feedbacks */}
          <Card className="border-border/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare className="h-24 w-24" />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg">My Feedback History</CardTitle>
              <CardDescription>Your recently submitted feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {loadingHistory ? (
                [1, 2].map(i => (
                  <div key={i} className="border-l-2 border-muted pl-4 py-1 animate-pulse space-y-2">
                    <div className="h-3 w-3/4 bg-muted-foreground/10 rounded" />
                    <div className="h-3 w-1/2 bg-muted-foreground/10 rounded" />
                  </div>
                ))
              ) : recentFeedbacks.length === 0 ? (
                <div className="text-center text-muted-foreground py-4 text-sm">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-20" />
                  <p>No feedback submitted yet.</p>
                </div>
              ) : (
                recentFeedbacks.map((fb) => (
                  <div
                    key={fb._id}
                    className={`border-l-2 pl-4 py-1 hover:border-primary transition-colors cursor-default ${
                      fb.feedbackType === "bug" ? "border-red-500/40" : fb.feedbackType === "question" ? "border-blue-500/40" : "border-primary/40"
                    }`}
                  >
                    {fb.rating && (
                      <div className="flex items-center gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`h-3 w-3 ${s <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20"}`} />
                        ))}
                      </div>
                    )}
                    <h4 className="text-sm font-semibold truncate text-foreground/90">{fb.subject}</h4>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">
                      {formatDate(fb.createdAt)} · {fb.feedbackType}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
