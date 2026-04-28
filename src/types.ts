export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export type QuizPhase = 'MENU' | 'SUBJECT_SELECTION' | 'AI_GENERATION' | 'QUIZ' | 'RESULT';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  answers: (number | null)[];
}
