import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BrainCircuit, RollerCoasterIcon } from "lucide-react";
import { number, set } from "zod";
import toast from "react-hot-toast";
import { createQuizWithAI } from "../../services/QuizService";
import { Spinner } from "@/components/ui/spinner";
function CreateQuiz() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numberOfQuestions: 10,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event, field) {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !formData.numberOfQuestions ||
      new String(formData.numberOfQuestions).trim() == ""
    ) {
      toast.error("Number of questiosn is required !!");
      return;
    } else if (formData.numberOfQuestions > 50) {
      toast.error("You can generate upto 50 questions only.");
      return;
    }

    if (formData.title.trim() === "") {
      toast.error("Quiz title is required !!");
      return;
    }
    if (formData.description.trim() === "") {
      toast.error("prompt is required !!");
      return;
    }
    console.log(formData);

    // server
    try {
      setLoading(true);
      const result = await createQuizWithAI(formData);
      toast.success("Quiz generate successfully...");
      toast.success("you can view your quiz in quizzes sections");
      setFormData({
        title: "",
        description: "",
        numberOfQuestions: 10,
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in generating quiz..");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            <BrainCircuit size={40} />
            <h1 className="text-lg mt-2">Create quiz with you prompt..</h1>
            <p className="text-gray-500 font-light mt-2">
              Write whats on your mind, our app will create quiz smarter.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* quiz title */}
            <div className="flex flex-col gap-3">
              <Label className="pl-2" forHtml="quiz_title">
                Quiz Title{" "}
              </Label>
              <Input
                value={formData.title}
                onChange={(event) => handleChange(event, "title")}
                type="text"
                id="quiz_title"
                placeholder="Enter quiz title"
              />
            </div>
            {/* quiz prommpt */}
            <div className="flex flex-col gap-3">
              <Label className="pl-2" forHtml="quiz_prompt">
                Write your prompt to generate quiz
              </Label>
              <Textarea
                value={formData.description}
                onChange={(event) => handleChange(event, "description")}
                className="h-40"
                id="quiz_prompt"
                placeholder="For what purpose you are going to give quiz..."
              />
            </div>

            {/* quiz numberOfQuestions */}
            <div className="flex flex-col gap-3">
              <Label className="pl-2" forHtml="number_of_questions">
                How many questions you want to generate{" "}
              </Label>
              <Input
                value={formData.numberOfQuestions}
                onChange={(event) => handleChange(event, "numberOfQuestions")}
                type="number"
                id="number_of_questions"
                placeholder="10 questions"
              />
            </div>
            <Button disabled={loading} type="submit" className="cursor-pointer">
              {loading ? (
                <>
                  <Spinner /> Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateQuiz;
