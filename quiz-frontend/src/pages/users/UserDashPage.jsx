import React, { useEffect, useState } from "react";
import { useAuthContenxt } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, BrainCircuit, Activity, TrendingUp, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getStats, getAllQuizzes } from "../../services/QuizService";
import { useNavigate } from "react-router";

// Skeleton loader for stat cards
const StatSkeleton = () => (
  <Card className="border-border/50 shadow-sm bg-gradient-to-br from-card to-card/50">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="h-4 w-24 bg-muted-foreground/20 rounded animate-pulse" />
      <div className="h-9 w-9 bg-muted-foreground/10 rounded-full animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="h-8 w-16 bg-muted-foreground/20 rounded animate-pulse mb-2" />
      <div className="h-3 w-32 bg-muted-foreground/10 rounded animate-pulse" />
    </CardContent>
  </Card>
);

function UserDashPage() {
  const { user } = useAuthContenxt();
  const navigate = useNavigate();
  const name = user?.name || user?.firstName || "User";

  const [stats, setStats] = useState(null);
  const [trending, setTrending] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    loadStats();
    loadTrendingQuizzes();
  }, []);

  async function loadStats() {
    try {
      setLoadingStats(true);
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  }

  async function loadTrendingQuizzes() {
    try {
      setLoadingTrending(true);
      const all = await getAllQuizzes();
      // Show latest 5 quizzes as "trending"
      setTrending([...all].reverse().slice(0, 5));
    } catch (err) {
      console.error("Failed to load trending:", err);
    } finally {
      setLoadingTrending(false);
    }
  }

  const iconColors = [
    { icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Welcome back, {name} 👋</h1>
        <p className="text-muted-foreground text-base md:text-lg">Here's an overview of your platform statistics and recent activity.</p>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {loadingStats ? (
          [1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)
        ) : (
          <>
            <Card className="border-border/50 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                  <BookOpen className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.totalQuizzes ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">Live</span> from database
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <div className="h-9 w-9 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Users className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.totalUsers ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">Live</span> from database
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">AI Generated</CardTitle>
                <div className="h-9 w-9 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-500 border border-purple-500/20">
                  <BrainCircuit className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.aiGenerated ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">AI</span> powered quizzes
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md transition-all bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
                <div className="h-9 w-9 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 border border-orange-500/20">
                  <Activity className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats?.completionRate ?? 0}%</div>
                <Progress value={stats?.completionRate ?? 0} className="h-1.5 mt-2 transition-all duration-1000" />
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-border/50 shadow-sm h-full flex flex-col">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Daily active users and quiz attempts over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] flex items-center justify-center border-t border-border/40 bg-muted/5 relative overflow-hidden rounded-b-lg">
            <div className="w-full h-[250px] flex items-end justify-between px-2 sm:px-6 pb-2 pt-10 gap-1 sm:gap-2 lg:gap-4 relative z-10">
              {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end items-center group relative h-full">
                  <div
                    className="w-full max-w-[40px] bg-primary/20 rounded-t-md group-hover:bg-primary/30 transition-all duration-300 relative overflow-hidden cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-primary/80 group-hover:bg-primary rounded-t-md transition-all duration-500" style={{ height: `${height * 0.7}%` }}></div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-medium">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-8 px-6 z-0 pointer-events-none opacity-20">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full border-b border-dashed border-foreground/50"></div>)}
            </div>
          </CardContent>
        </Card>

        {/* Trending Quizzes */}
        <Card className="border-border/50 shadow-sm h-full flex flex-col">
          <CardHeader>
            <CardTitle>Trending Quizzes</CardTitle>
            <CardDescription>Latest quizzes on the platform</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            {loadingTrending ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted-foreground/10 animate-pulse shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-3/4 bg-muted-foreground/20 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-muted-foreground/10 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : trending.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
                <BookOpen className="h-12 w-12 mb-3 opacity-20" />
                <p className="font-medium">No quizzes yet</p>
                <p className="text-sm mt-1">Create your first quiz to see it here.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {trending.map((quiz, i) => {
                  const colorSet = iconColors[i % iconColors.length];
                  const Icon = colorSet.icon;
                  return (
                    <div
                      key={quiz._id}
                      className="flex items-center gap-4 group p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer -mx-2"
                      onClick={() => navigate(`/users/quiz-playground/${quiz._id}`)}
                    >
                      <div className={`h-10 w-10 rounded-full ${colorSet.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-4 w-4 ${colorSet.color}`} />
                      </div>
                      <div className="space-y-1 overflow-hidden flex-1">
                        <p className="text-sm font-semibold leading-none truncate group-hover:text-primary transition-colors">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                          {new Date(quiz.createdDate).toLocaleDateString()}
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50 inline-block"></span>
                          {quiz.questions?.length ?? 0} questions
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <Button variant="outline" className="w-full mt-6" onClick={() => navigate('/users/feed')}>
              View All Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserDashPage;
