import React, { useState, useEffect } from "react";
import { useAuthContenxt } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Calendar, Activity, Trophy, Pencil, Check, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { getMyQuizzes } from "../../services/QuizService";
import { axiosInstance } from "../../services/axiosConfig";
import toast from "react-hot-toast";

function ProfilePage() {
  const { user, setUser } = useAuthContenxt();
  const navigate = useNavigate();

  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setNewName(user.name || "");
      loadMyQuizzes();
    }
  }, [user]);

  async function loadMyQuizzes() {
    try {
      setLoadingQuizzes(true);
      const data = await getMyQuizzes();
      setMyQuizzes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuizzes(false);
    }
  }

  async function handleSaveName() {
    if (!newName.trim() || newName.trim() === user.name) {
      setEditMode(false);
      return;
    }
    try {
      setSaving(true);
      const response = await axiosInstance.put(`/users/${user._id}`, { name: newName.trim() });
      const updatedUser = { ...user, name: newName.trim() };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <Loader2 className="animate-spin h-6 w-6 mr-2" /> Loading profile...
      </div>
    );
  }

  const name = user.name || "User";
  const email = user.email || "user@example.com";
  const joinedDate = user.createdDate
    ? new Date(user.createdDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Recently";
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <User className="h-8 w-8 text-primary" /> My Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border/50 shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary w-full" />
            <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center text-center relative">
              <Avatar className="h-24 w-24 border-4 border-background -mt-12 mb-4 bg-muted">
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">{initials}</AvatarFallback>
              </Avatar>

              {/* Editable name */}
              {editMode ? (
                <div className="w-full flex flex-col items-center gap-2 mb-3">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-center font-bold text-lg"
                    maxLength={20}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveName} disabled={saving} className="h-8">
                      {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setEditMode(false); setNewName(user.name); }} className="h-8">
                      <X className="h-3 w-3" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold break-words">{name}</h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    title="Edit name"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              )}

              <p className="text-muted-foreground font-medium mb-4">Student</p>

              <div className="w-full flex justify-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Shield className="h-3 w-3" /> Active
                </span>
                <span className="bg-muted text-foreground/80 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Trophy className="h-3 w-3" /> Quiz Maker
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-muted p-2 rounded-full text-foreground/70">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-xs text-muted-foreground">Email</p>
                  <p className="truncate font-medium">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-muted p-2 rounded-full text-foreground/70">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-xs text-muted-foreground">Joined</p>
                  <p className="font-medium">{joinedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Your quiz activity and stats.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-border/50 rounded-xl bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Quizzes Created</h3>
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  {loadingQuizzes ? (
                    <div className="h-8 w-12 bg-muted-foreground/10 rounded animate-pulse" />
                  ) : (
                    <>
                      <p className="text-3xl font-bold">{myQuizzes.length}</p>
                      <p className="text-xs text-muted-foreground mt-1 text-blue-500 font-medium">
                        {myQuizzes.filter((q) => q.isAiGenerated).length} AI generated
                      </p>
                    </>
                  )}
                </div>

                <div className="p-4 border border-border/50 rounded-xl bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Total Questions</h3>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                  {loadingQuizzes ? (
                    <div className="h-8 w-12 bg-muted-foreground/10 rounded animate-pulse" />
                  ) : (
                    <>
                      <p className="text-3xl font-bold">
                        {myQuizzes.reduce((acc, q) => acc + (q.questions?.length ?? 0), 0)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 text-yellow-500 font-medium">
                        Across all your quizzes
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>My Recent Quizzes</CardTitle>
              <CardDescription>Your latest created quizzes</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              {loadingQuizzes ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                      <div className="h-10 w-10 bg-muted-foreground/10 rounded-full shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-2/3 bg-muted-foreground/10 rounded" />
                        <div className="h-3 w-1/3 bg-muted-foreground/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : myQuizzes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No quizzes created yet.</p>
                  <Button variant="link" className="mt-2 text-primary" onClick={() => navigate('/users/create')}>
                    Create your first quiz
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {[...myQuizzes].reverse().slice(0, 5).map((quiz) => (
                    <div
                      key={quiz._id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/users/quiz-playground/${quiz._id}`)}
                    >
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        {quiz.isAiGenerated ? (
                          <Activity className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Activity className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {quiz.questions?.length ?? 0} questions · {new Date(quiz.createdDate).toLocaleDateString()}
                        </p>
                      </div>
                      {quiz.isAiGenerated && (
                        <span className="text-[10px] font-semibold text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-full shrink-0">AI</span>
                      )}
                    </div>
                  ))}
                  {myQuizzes.length > 5 && (
                    <Button variant="link" className="w-full text-primary" onClick={() => navigate('/users/quizzes')}>
                      View all {myQuizzes.length} quizzes →
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
