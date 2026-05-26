import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Layers, BarChart, Settings, Sparkles } from "lucide-react";
function ServicesPage() {
  const services = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI Quiz Generation",
      desc: "Generate intelligent, adaptive quizzes based on any topic or skill level using AI. Personalized for every learner.",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Question Bank Management",
      desc: "Easily manage, categorize, and update your questions. Import/export data or sync with external sources.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Performance Analytics",
      desc: "Get detailed insights into user progress, strengths, and improvement areas using real-time analytics dashboards.",
    },
    {
      icon: <Settings className="h-10 w-10 text-primary" />,
      title: "Custom Quiz Modes",
      desc: "Create timed quizzes, adaptive difficulty levels, or topic-specific challenges for different learning needs.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Gamified Learning",
      desc: "Engage learners with badges, progress levels, and AI-curated recommendations to boost retention.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold md:text-6xl"
          >
            Smart, AI-Powered Quiz Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground md:text-lg"
          >
            Explore our intelligent quiz tools designed to revolutionize
            learning through adaptive AI and deep insights.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button size="lg">Get Started</Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-semibold md:text-4xl"
        >
          What We Offer
        </motion.h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-col items-center space-y-3">
                  {service.icon}
                  <CardTitle className="text-xl font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {service.desc}
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
            Ready to make your learning smarter?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Start creating adaptive, AI-powered quizzes for your learners in
            minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button size="lg">Start Now</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
