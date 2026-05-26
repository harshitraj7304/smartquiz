import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Layers,
  BarChart3,
  Sparkles,
  Settings,
  Timer,
  Users,
  Globe,
  Shield,
  Trophy,
  Menu,
} from "lucide-react";

function FeaturesPage() {
  const features = [
    {
      icon: <Menu className="h-10 w-10 text-primary " />,
      title: "Try with login",
      desc: "Try quizzes without login on website.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI-Powered Quiz Generation",
      desc: "Automatically generate topic-based quizzes with adaptive difficulty using cutting-edge AI algorithms.",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Dynamic Question Bank",
      desc: "Store, organize, and reuse thousands of questions across categories and difficulty levels effortlessly.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Real-time Analytics",
      desc: "Monitor user performance, completion rates, and skill improvement trends with beautiful charts.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Adaptive Learning Engine",
      desc: "Our AI adapts quizzes based on learner performance to maximize retention and challenge balance.",
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Custom Quiz Modes",
      desc: "Create timed challenges, topic quizzes, practice tests, or competitive multiplayer quiz sessions.",
    },
    {
      icon: <Timer className="h-10 w-10 text-primary" />,
      title: "Smart Timer & Auto Save",
      desc: "Quizzes auto-save progress and offer intelligent time management to avoid losing attempts.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Collaborative Learning",
      desc: "Enable groups, classrooms, or teams to create and attempt quizzes together for shared growth.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Multi-language Support",
      desc: "Deliver quizzes in multiple languages to support learners across different regions.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Scalable",
      desc: "Built with enterprise-grade authentication, data encryption, and scalable backend infrastructure.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Gamified Experience",
      desc: "Boost engagement with leaderboards, badges, streaks, and AI-curated progress rewards.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold md:text-6xl"
        >
          Explore the Power of Smart Quizzing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground md:text-lg"
        >
          Discover how our advanced features redefine learning, testing, and
          engagement through intelligent automation.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-semibold md:text-4xl"
        >
          Top 10 Features of Our Smart Quiz App
        </motion.h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-col items-center space-y-3">
                  {feature.icon}
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {feature.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold"
          >
            Experience the Future of Learning Today
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Start exploring AI-powered quizzes and unleash your full learning
            potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button size="lg">Try Now</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;
