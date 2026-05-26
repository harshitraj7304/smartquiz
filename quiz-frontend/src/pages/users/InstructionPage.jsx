import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

function InstructionPage({
  createdDate,
  description,
  instructions,
  maxMarks,
  maxTime,
  minusMarking,
  onStartQuiz,
}) {
  const minutes = Math.floor(maxTime / 60);
  return (
    <div className="flex justify-center py-1 px-4">
      <Card className="w-full max-w-3xl shadow-md border border-gray-200 dark:border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Quiz Instructions
          </CardTitle>
          <p className="text-sm ">Created on: {createdDate}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-700">
              Description
            </h3>
            <p className="">{description}</p>
          </div>

          <Separator />

          {/* Quiz Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">Max Marks:</span>
              <Badge className="w-fit px-3 py-1 text-sm">{maxMarks}</Badge>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Max Time:</span>
              <Badge className="w-fit px-3 py-1 text-sm">{minutes} min</Badge>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-medium">Negative Marking:</span>
              <Badge
                variant={minusMarking ? "destructive" : "secondary"}
                className="w-fit px-3 py-1 text-sm"
              >
                {minusMarking ? "Yes" : "No"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Please read the instructions carefully:
            </h3>
            <ul className="space-y-2 list-disc pl-6 ">
              {instructions?.map((inst, index) => (
                <li key={index}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Alert Box */}
          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Once you start the quiz, the timer will begin immediately. Do not
              refresh or close the tab.
            </AlertDescription>
          </Alert>

          {/* Start Button */}
          <div className="flex justify-end pt-4">
            <Button
              className={"cursor-pointer"}
              size="lg"
              onClick={onStartQuiz}
            >
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructionPage;
