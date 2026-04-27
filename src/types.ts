export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export type QuizPhase = 'MENU' | 'QUIZ' | 'RESULT';

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  answers: (number | null)[];
}
