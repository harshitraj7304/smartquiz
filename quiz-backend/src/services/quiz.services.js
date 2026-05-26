import openAiClient from "../config/openai.config.js";
import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";
// quiz all reusable operations
// class QuizService {
//   create(quiz) {}

//   getAll() {}

//   delete(quizId) {}

//   update(newQuiz, quizId) {}
// }

// const quizService = new QuizService();

// export default quizService;

export const generateQuizFromAI = async (
  title,
  description,
  numberOfQuestions,
  userId = null
) => {
  const generateQuizPrompt = `You are an expert backend developer and AI quiz generator.

  Your task: Generate a complete quiz based on the provided information.
  ---
  ### INPUTS:
  - Number of Questions: ${numberOfQuestions}
  - Quiz Title: ${title}
  - Description: ${description}
  ---
  ### OUTPUT REQUIREMENTS:
  Return a **single valid JSON object only**, with no explanations, markdown, or extra characters.
  ---
  ### JSON STRUCTURE:
  
  {
    "title": string,                     // quiz title
    "description": string,               // short quiz description
    "maxMarks": number,                  // total marks (10 marks per question)
    "maxTime": number,                   // total time in seconds (60 seconds per question)
    "instructions": string,              // instructions for quiz takers
    "minusMarking": boolean,             // true if negative marking is allowed
    "questions": [
      {
        "question": string,
        "option1": string,
        "option2": string,
        "option3": string,
        "option4": string,
        "correctAnswer": string          // must match one of the above options
      }
    ]
  }
  ---
  ### RULES:
  1. Generate exactly {number_of_questions} unique and meaningful questions related to the quiz topic.
  2. Each question must have **four distinct options** and **one correctAnswer**.
  3. The output must be **pure JSON** — no markdown, code fences, or commentary.
  4. Auto-calculate:
     - maxMarks = 10 × number_of_questions
     - maxTime = 60 × number_of_questions
  5. Use neutral, professional English wording.
  6. Keep questions realistic and suitable for learners at the appropriate level.
  
  ---
  
  ### OUTPUT:
  Return only the valid JSON object.
  `;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing. Please set the OPENAI_API_KEY in your .env file (for local development) or on Render/Vercel (for production).");
  }

  try {
    // call ai to generate quiz
    const response = await openAiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: generateQuizPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log("OpenAI Response:", response);
    const content = response.choices[0].message.content;
    const quizFromAI = JSON.parse(content);

    const allSavedQuestiosn = await Question.insertMany(quizFromAI.questions);
    const questionsIds = allSavedQuestiosn.map((q) => q._id);

    const quizToSave = { ...quizFromAI, questions: questionsIds, createdBy: userId, isAiGenerated: true };
    //database mein save....
    const createdQuiz = await Quiz.create(quizToSave);

    return quizFromAI.questions.map((question) => {
      question.correctAnswer = "";
      return question;
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const analyzeResult = async (result) => {
  const prompt = "";
};
