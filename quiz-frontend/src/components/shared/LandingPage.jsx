import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center text-center overflow-hidden">
      {/* ===== HERO / BANNER SECTION ===== */}
      <section className="w-full py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
          >
            Boost Your Knowledge with{" "}
            <span className="text-primary">Smart Quiz</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8"
          >
            Personalized quizzes powered by AI — learn faster, smarter, and with
            purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/users/feed')}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            Why Choose Smart Quiz?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Questions",
                desc: "Generate smart, adaptive quizzes tailored to your goals and skill level.",
              },
              {
                title: "Progress Tracking",
                desc: "Analyze your performance with detailed insights and growth charts.",
              },
              {
                title: "Gamified Learning",
                desc: "Earn badges, level up, and make learning truly engaging and fun.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="shadow-sm border rounded-2xl hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="w-full py-24 bg-muted">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Level Up Your Skills?
          </h2>
          <p className="max-w-xl text-muted-foreground mb-8">
            Join thousands of learners using Smart Quiz to prepare for exams,
            interviews, and self-growth.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/users/feed')}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start a Quiz
          </Button>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-foreground">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Amit Sharma",
                image: "https://i.pravatar.cc/100?img=1",
                feedback:
                  "Smart Quiz made my interview preparation so much easier. The AI quizzes felt personalized and relevant.",
              },
              {
                name: "Priya Mehta",
                image: "https://i.pravatar.cc/100?img=2",
                feedback:
                  "I love the smooth UI and daily quiz reminders. The gamified learning experience keeps me consistent!",
              },
              {
                name: "Rahul Verma",
                image: "https://i.pravatar.cc/100?img=3",
                feedback:
                  "The analytics dashboard helps me understand my strengths better. Great for self-improvement.",
              },
            ].map((t, i) => (
              <Card
                key={i}
                className="border rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-4">
                    <AvatarImage src={t.image} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-muted-foreground mb-4 italic">
                    “{t.feedback}”
                  </p>
                  <h4 className="font-semibold text-foreground">{t.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="w-full py-24 bg-muted/50 border-t">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="max-w-xl text-muted-foreground mb-8">
            Have questions, feedback, or partnership inquiries? We’d love to
            hear from you.
          </p>

          <form className="w-full max-w-md flex flex-col gap-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Input placeholder="Your Message" className="h-24" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="w-full py-6 border-t bg-background text-muted-foreground text-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Smart Quiz. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
