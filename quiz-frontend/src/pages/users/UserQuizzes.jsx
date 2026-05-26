import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Clock, BrainCircuit, Plus, Search, PlayCircle,
  Edit, Trash2, Share2, Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router";
import { getMyQuizzes, deleteQuiz } from "../../services/QuizService";
import toast from "react-hot-toast";

// Skeleton card
const QuizCardSkeleton = () => (
  <Card className="border-border/50 flex flex-col h-full animate-pulse">
    <CardHeader className="pb-3">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-20 bg-muted-foreground/10 rounded-full" />
        <div className="h-5 w-24 bg-muted-foreground/10 rounded-full" />
      </div>
      <div className="h-5 w-3/4 bg-muted-foreground/10 rounded mb-2" />
      <div className="h-4 w-full bg-muted-foreground/10 rounded" />
      <div className="h-4 w-2/3 bg-muted-foreground/10 rounded" />
    </CardHeader>
    <CardContent className="pb-4 mt-auto">
      <div className="h-10 w-full bg-muted-foreground/10 rounded-lg" />
    </CardContent>
  </Card>
);

function UserQuizzes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadMyQuizzes();
  }, []);

  async function loadMyQuizzes() {
    try {
      setLoading(true);
      const data = await getMyQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your quizzes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(quizId, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      setDeletingId(quizId);
      await deleteQuiz(quizId);
      setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
      toast.success(`"${title}" deleted successfully.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete quiz. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const publishedQuizzes = filteredQuizzes; // All DB quizzes treated as published
  const aiQuizzes = filteredQuizzes.filter((q) => q.isAiGenerated);

  const renderQuizCard = (quiz) => (
    <Card key={quiz._id} className="border-border/50 shadow-sm hover:shadow-md transition-all group flex flex-col h-full bg-gradient-to-b from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Badge
            variant="outline"
            className="font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50"
          >
            Published
          </Badge>
          {quiz.isAiGenerated && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-transparent text-[10px] sm:text-xs">
              <BrainCircuit className="h-3 w-3 mr-1" /> AI Generated
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl line-clamp-1 leading-tight group-hover:text-primary transition-colors cursor-pointer">
          {quiz.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px] text-sm mt-1.5 flex-1 break-words">
          {quiz.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4 mt-auto">
        <div className="flex flex-wrap items-center gap-y-3 gap-x-5 text-sm text-muted-foreground mt-2 bg-muted/30 p-2.5 rounded-lg border border-border/40">
          <div className="flex items-center gap-1.5 font-medium" title="Questions">
            <BookOpen className="h-4 w-4 text-primary/70" />
            {quiz.questions?.length ?? 0} Qs
          </div>
          <div className="flex items-center gap-1.5 font-medium" title="Max Marks">
            <PlayCircle className="h-4 w-4 text-blue-500/70" />
            {quiz.maxMarks} Marks
          </div>
          <div className="flex items-center gap-1.5 font-medium" title="Created date">
            <Clock className="h-4 w-4 text-orange-500/70" />
            {new Date(quiz.createdDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      <div className="border-t border-border/50 bg-card/60 backdrop-blur-sm px-4 py-3 flex flex-wrap items-center justify-between rounded-b-xl gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 sm:translate-y-2 group-hover:translate-y-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 hover:bg-primary/10 hover:text-primary flex-1 font-medium grow basis-0 min-w-max"
          onClick={() => navigate(`/users/quiz-playground/${quiz._id}`)}
        >
          <PlayCircle className="h-4 w-4 mr-2" /> Play
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 hover:bg-red-500/10 hover:text-red-500 flex-1 text-muted-foreground font-medium grow basis-0 min-w-max"
          disabled={deletingId === quiz._id}
          onClick={() => handleDelete(quiz._id, quiz.title)}
        >
          {deletingId === quiz._id ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Delete
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 hover:bg-blue-500/10 hover:text-blue-500 text-muted-foreground grow-0 basis-auto"
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/users/quiz-playground/${quiz._id}`);
            toast.success("Quiz link copied!");
          }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );

  const EmptyState = ({ icon: Icon, title, desc, action }) => (
    <div className="col-span-full py-16 text-center border-2 border-dashed border-border/80 rounded-xl bg-muted/10">
      <Icon className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm mx-auto">{desc}</p>
      {action}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">My Quizzes</h1>
          <p className="text-muted-foreground text-base">Manage, play, and track the performance of your quizzes.</p>
        </div>
        <Button onClick={() => navigate('/users/create')} className="shrink-0 shadow-md hover:shadow-lg transition-all active:scale-95 bg-primary overflow-hidden group">
          <span className="flex items-center">
            <Plus className="h-5 w-5 mr-1 group-hover:rotate-90 transition-transform duration-300" />
            Create New Quiz
          </span>
        </Button>
      </div>

      <div className="bg-card border border-border/50 rounded-xl shadow-sm p-4 sm:p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:max-w-md shadow-sm rounded-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your quizzes..."
              className="pl-9 w-full bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:ring-offset-0 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/40 px-4 py-2 rounded-lg w-full md:w-auto overflow-x-auto shadow-inner">
            <span className="whitespace-nowrap"><strong className="text-foreground">{quizzes.length}</strong> Total</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border inline-block shrink-0 mx-1"></span>
            <span className="whitespace-nowrap"><strong className="text-green-600 dark:text-green-400">{quizzes.length}</strong> Published</span>
            <span className="w-1.5 h-1.5 rounded-full bg-border inline-block shrink-0 mx-1"></span>
            <span className="whitespace-nowrap"><strong className="text-purple-600 dark:text-purple-400">{aiQuizzes.length}</strong> AI</span>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap md:w-auto md:inline-flex bg-muted p-1 mb-8 rounded-lg shadow-sm">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all whitespace-nowrap px-4 py-1.5 font-medium">All Quizzes</TabsTrigger>
            <TabsTrigger value="published" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all whitespace-nowrap px-4 py-1.5 font-medium">Published</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all whitespace-nowrap px-4 py-1.5 font-medium">AI Generated</TabsTrigger>
          </TabsList>

          {/* All Quizzes */}
          <TabsContent value="all" className="mt-0 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {loading ? (
                [1, 2, 3].map(i => <QuizCardSkeleton key={i} />)
              ) : filteredQuizzes.length > 0 ? (
                filteredQuizzes.map(renderQuizCard)
              ) : (
                <EmptyState
                  icon={BookOpen}
                  title={searchQuery ? "No quizzes found" : "No quizzes yet"}
                  desc={searchQuery ? "Try a different search term." : "Create your first quiz to get started."}
                  action={!searchQuery && (
                    <Button variant="outline" className="mt-4" onClick={() => navigate('/users/create')}>
                      <Plus className="h-4 w-4 mr-2" /> Create Quiz
                    </Button>
                  )}
                />
              )}
            </div>
          </TabsContent>

          {/* Published */}
          <TabsContent value="published" className="mt-0 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {loading ? (
                [1, 2, 3].map(i => <QuizCardSkeleton key={i} />)
              ) : publishedQuizzes.length > 0 ? (
                publishedQuizzes.map(renderQuizCard)
              ) : (
                <EmptyState icon={BookOpen} title="No published quizzes" desc="You haven't published any quizzes yet." />
              )}
            </div>
          </TabsContent>

          {/* AI Generated */}
          <TabsContent value="ai" className="mt-0 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {loading ? (
                [1, 2, 3].map(i => <QuizCardSkeleton key={i} />)
              ) : aiQuizzes.length > 0 ? (
                aiQuizzes.map(renderQuizCard)
              ) : (
                <EmptyState
                  icon={BrainCircuit}
                  title="No AI quizzes"
                  desc="You haven't generated any quizzes using AI yet."
                  action={
                    <Button variant="outline" className="mt-4 shadow-sm" onClick={() => navigate('/users/create')}>
                      Generate with AI
                    </Button>
                  }
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UserQuizzes;
