import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

function DetailedResultAnalysis({ questions, userAnswers }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-center mb-6">Detailed Analysis</h2>
      {questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        // Normalize correctAnswer to text
        let correctText = String(question.correctAnswer || "").trim().toLowerCase();
        
        // Check if correctText is literally one of the options
        const isValueMatch = 
          String(question.option1 || "").trim().toLowerCase() === correctText ||
          String(question.option2 || "").trim().toLowerCase() === correctText ||
          String(question.option3 || "").trim().toLowerCase() === correctText ||
          String(question.option4 || "").trim().toLowerCase() === correctText;

        // If it doesn't match any option text, but is "1", "2", "3", or "4", treat it as an index
        if (!isValueMatch && ["1", "2", "3", "4"].includes(correctText)) {
          correctText = String(question[`option${correctText}`] || "").trim().toLowerCase();
        } else if (!isValueMatch && correctText.startsWith("option")) {
          const idx = correctText.replace("option", "").trim();
          if (["1", "2", "3", "4"].includes(idx)) {
             correctText = String(question[`option${idx}`] || "").trim().toLowerCase();
          }
        }

        // Find which option matches correctText
        let correctOptionIndex = null;
        if (String(question.option1 || "").trim().toLowerCase() === correctText && correctText !== "") correctOptionIndex = 1;
        else if (String(question.option2 || "").trim().toLowerCase() === correctText && correctText !== "") correctOptionIndex = 2;
        else if (String(question.option3 || "").trim().toLowerCase() === correctText && correctText !== "") correctOptionIndex = 3;
        else if (String(question.option4 || "").trim().toLowerCase() === correctText && correctText !== "") correctOptionIndex = 4;

        const isCorrect = userAnswer === correctOptionIndex;
        const isAttempted = userAnswer !== null && userAnswer !== undefined && userAnswer !== "";

        return (
          <Card key={index} className="shadow-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-start gap-4">
                <span className="leading-relaxed">
                  <span className="text-muted-foreground mr-2 font-medium">Q{index + 1}.</span>
                  {question.question}
                </span>
                <div className="flex-shrink-0 mt-1">
                  {!isAttempted ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                      <MinusCircle className="w-4 h-4" /> Unattempted
                    </span>
                  ) : isCorrect ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30 px-3 py-1.5 rounded-full">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {[1, 2, 3, 4].map((optIndex) => {
                  const isUserChoice = userAnswer === optIndex;
                  const isCorrectChoice = correctOptionIndex === optIndex;
                  let optionClass = "border rounded-lg p-3 transition-colors text-sm font-medium ";

                  if (isCorrectChoice) {
                    optionClass += "bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:border-green-600 dark:text-green-100 ";
                  } else if (isUserChoice && !isCorrectChoice) {
                    optionClass += "bg-red-50 border-red-400 text-red-900 dark:bg-red-900/20 dark:border-red-600 dark:text-red-100 ";
                  } else {
                    optionClass += "bg-muted/30 border-transparent hover:bg-muted/50 text-foreground/80";
                  }

                  return (
                    <div key={optIndex} className={optionClass}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-start gap-2 break-words">
                          <span className="text-muted-foreground/70">{optIndex})</span>
                          <span>{question[`option${optIndex}`]}</span>
                        </span>
                        {isCorrectChoice && <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600 dark:text-green-500" />}
                        {isUserChoice && !isCorrectChoice && <XCircle className="w-5 h-5 flex-shrink-0 text-red-500 dark:text-red-500" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DetailedResultAnalysis;
