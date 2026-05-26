import React, { useEffect, useState, useMemo } from "react";
import { getAllQuizzes } from "../../services/QuizService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Search, BrainCircuit, BookOpen, Clock, ArrowUpDown, Trophy, Sparkles, Filter } from "lucide-react";
import { useNavigate } from "react-router";

// Skeleton
const QuizFeedSkeleton = () => (
  <Card className="border-border/50 flex flex-col animate-pulse">
    <div className="h-28 bg-muted-foreground/10 rounded-t-xl" />
    <CardHeader className="pb-2">
      <div className="h-5 w-3/4 bg-muted-foreground/10 rounded mb-2" />
      <div className="h-4 w-full bg-muted-foreground/10 rounded" />
      <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-muted-foreground/10 rounded-full" />
        <div className="h-6 w-20 bg-muted-foreground/10 rounded-full" />
      </div>
    </CardContent>
    <CardFooter>
      <div className="h-9 w-full bg-muted-foreground/10 rounded-lg" />
    </CardFooter>
  </Card>
);

const TOPIC_COLORS = [
  "from-blue-500/20 to-blue-600/10",
  "from-purple-500/20 to-purple-600/10",
  "from-emerald-500/20 to-emerald-600/10",
  "from-orange-500/20 to-orange-600/10",
  "from-rose-500/20 to-rose-600/10",
  "from-indigo-500/20 to-indigo-600/10",
];

function FeedQuiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | ai | manual
  const [sort, setSort] = useState("latest"); // latest | most-questions

  useEffect(() => {
    loadAllQuizzes();
  }, []);

  async function loadAllQuizzes() {
    try {
      setLoading(true);
      const result = await getAllQuizzes();
      setQuizzes([...result].reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const displayed = useMemo(() => {
    let list = [...quizzes];

    // Filter
    if (filter === "ai") list = list.filter((q) => q.isAiGenerated);
    if (filter === "manual") list = list.filter((q) => !q.isAiGenerated);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "latest") {
      list.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    } else if (sort === "most-questions") {
      list.sort((a, b) => (b.questions?.length ?? 0) - (a.questions?.length ?? 0));
    }

    return list;
  }, [quizzes, search, filter, sort]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Quiz Feed</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Discover and attempt quizzes from our library. Click any quiz to begin.
        </p>
      </div>

      {/* Search + Filter + Sort Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes by title..."
            className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:ring-offset-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {[
            { key: "all", label: "All" },
            { key: "ai", label: "AI Generated", icon: BrainCircuit },
            { key: "manual", label: "Manual", icon: BookOpen },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              size="sm"
              variant={filter === key ? "default" : "outline"}
              className="h-8 text-xs font-medium transition-all"
              onClick={() => setFilter(key)}
            >
              {Icon && <Icon className="h-3.5 w-3.5 mr-1.5" />}
              {label}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 flex-wrap">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
          {[
            { key: "latest", label: "Latest" },
            { key: "most-questions", label: "Most Questions" },
          ].map(({ key, label }) => (
            <Button
              key={key}
              size="sm"
              variant={sort === key ? "default" : "outline"}
              className="h-8 text-xs font-medium transition-all"
              onClick={() => setSort(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <p className="text-sm text-muted-foreground font-medium">
          Showing <strong className="text-foreground">{displayed.length}</strong> of{" "}
          <strong className="text-foreground">{quizzes.length}</strong> quizzes
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => <QuizFeedSkeleton key={i} />)
        ) : displayed.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border/80 rounded-xl bg-muted/10">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold text-foreground">No quizzes found</h3>
            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
              {search ? `No results for "${search}". Try a different search.` : "No quizzes available yet. Be the first to create one!"}
            </p>
            {search && (
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          displayed.map((quiz, index) => (
            <Card
              key={quiz._id}
              className="border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col overflow-hidden"
            >
              {/* Colorful header band */}
              <div className={`h-24 bg-gradient-to-br ${TOPIC_COLORS[index % TOPIC_COLORS.length]} flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className="h-10 w-10 text-foreground/20 group-hover:scale-110 transition-transform duration-300" />
                {quiz.isAiGenerated && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-500/90 text-white text-[10px] border-0">
                      <Sparkles className="h-3 w-3 mr-1" /> AI
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {quiz.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-3 flex-1">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {quiz.questions?.length ?? 0} Questions
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                    {quiz.maxMarks} Marks
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1 text-orange-500" />
                    {new Date(quiz.createdDate).toLocaleDateString()}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all active:scale-95"
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/users/quiz-playground/${quiz._id}`)}
                >
                  Start Quiz →
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedQuiz;
