import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ServicesPage from "./pages/ServicesPage";
import UserDashPage from "./pages/users/UserDashPage";
import AppLayout from "./pages/AppLayout";
import UserLayout from "./pages/users/UserLayout";
import UserQuizzes from "./pages/users/UserQuizzes";
import { ThemeProvider } from "next-themes";
import FeaturesPage from "./pages/FeaturesPage";
import ForgotPage from "./pages/ForgotPage";
import { Toaster } from "react-hot-toast";
import FeedQuiz from "./pages/users/FeedQuiz";
import CreateQuiz from "./pages/users/CreateQuiz";
import ProfilePage from "./pages/users/ProfilePage";
import FeedbackPage from "./pages/users/FeedbackPage";
import { AuthProvider } from "./context/AuthContext";
import QuizPlayGround from "./pages/users/QuizPlayGround";
// console.log = () => {};
// console.debug = () => {};
// console.info = () => {};
// console.warn = () => {};
// console.error = () => {};
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider attribute={"class"}>
            <Toaster />
            <Routes>
              <Route path="" element={<AppLayout />}>
                <Route path="" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/forgot-password" element={<ForgotPage />} />
                <Route path="/users" element={<UserLayout />}>
                  <Route path="" element={<UserDashPage />} />
                  <Route path="quizzes" element={<UserQuizzes />} />
                  <Route path="feed" element={<FeedQuiz />} />
                  <Route path="create" element={<CreateQuiz />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="feedback" element={<FeedbackPage />} />
                  <Route
                    path="quiz-playground/:quizId"
                    element={<QuizPlayGround />}
                  />
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>

      {/* <Card className="w-full max-w-sm mx-auto my-10">
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://learncodewithdurgesh.com/images/dev-illustration.svg"></AvatarImage>
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <CardTitle>Welcome to SmartQuizApp</CardTitle>
          <CardDescription>
            You can prepare any interview on this platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p> This is card content.</p>

          <Button size="sm">Start Learning</Button>
        </CardContent>
      </Card> */}
    </>
  );
}

export default App;
