import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function ResultSummary({
  correct = 8,
  incorrect = 2,
  total = 10,
  attempted = 9,
  maxMarks = 0,
}) {
  const percentage = ((correct / total) * 100).toFixed(2);

  const grade =
    percentage >= 90
      ? "A+"
      : percentage >= 80
      ? "A"
      : percentage >= 70
      ? "B"
      : percentage >= 60
      ? "C"
      : percentage >= 50
      ? "D"
      : "F";

  const totalMarksScored = (maxMarks / total) * correct;

  const marksPercentage = ((totalMarksScored / maxMarks) * 100).toFixed(2);

  return (
    <Card className="w-full mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Quiz Summary
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Marks Scored</TableCell>
              <TableCell className="font-semibold text-green-600 dark:text-green-400">
                {totalMarksScored}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marks Scored</TableCell>
              <TableCell className="font-semibold text-green-600 dark:text-green-400">
                {maxMarks}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Correct Questions</TableCell>
              <TableCell className="font-semibold text-green-600 dark:text-green-400">
                {correct}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Incorrect Questions</TableCell>
              <TableCell className="font-semibold text-red-600 dark:text-red-400">
                {incorrect}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total Questions</TableCell>
              <TableCell className="font-semibold">{total}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Attempted Questions</TableCell>
              <TableCell className="font-semibold">{attempted}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Achieved Percentage</TableCell>
              <TableCell className="font-semibold text-blue-600 dark:text-blue-400">
                {marksPercentage}%
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell className="font-semibold text-purple-600 dark:text-purple-400">
                {grade}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ResultSummary;
