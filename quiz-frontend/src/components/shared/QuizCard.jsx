import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const QuizCard = ({
  quizId,
  title,
  description,
  maxMarks,
  numberOfQuestions,
  minusMarking,
  coverImage,
  createdDate,
}) => {
  const navigate = useNavigate();
  return (
    <Card className=" flex flex-col  justify-between w-[32%] overflow-hidden hover:shadow-lg transition-all duration-300 rounded-2xl border border-muted">
      {/* Image Section */}
      <div className="relative w-full h-30">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 items-center justify-between">
          <Badge variant="secondary" className="px-3 py-1">
            {numberOfQuestions} Questions
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {maxMarks} Marks
          </Badge>
        </div>

        {minusMarking && (
          <div className="flex items-center text-xs text-emerald-500 font-medium">
            <CheckCircle className="w-4 h-4 mr-1" />
            Minus-minute marking enabled
          </div>
        )}

        <div className="flex flex-wrap justify-between">
          {!minusMarking && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Standard marking
            </div>
          )}

          {createdDate && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(createdDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex   flex-col justify-center items-center">
        <Button
          onClick={() => {
            navigate(`/users/quiz-playground/${quizId}`);
          }}
          className="w-full cursor-pointer"
          size="sm"
          variant="default"
        >
          Start{" "}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
