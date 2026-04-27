import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  LogOut, 
  CheckCircle2, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  Trophy,
  BrainCircuit,
  LayoutDashboard
} from 'lucide-react';
import { QUIZ_QUESTIONS } from './questions';
import { QuizPhase, QuizResult } from './types';

export default function App() {
  const [phase, setPhase] = useState<QuizPhase>('MENU');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [result, setResult] = useState<QuizResult | null>(null);

  const startQuiz = () => {
    setPhase('QUIZ');
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setResult(null);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
    
    // Auto-advance after a short delay for better UX
    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 400);
  };

  const finishQuiz = () => {
    let correct = 0;
    let wrong = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === QUIZ_QUESTIONS[index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = Math.round((correct / QUIZ_QUESTIONS.length) * 100);

    setResult({
      score,
      totalQuestions: QUIZ_QUESTIONS.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      answers: userAnswers
    });
    setPhase('RESULT');
  };

  const exitApp = () => {
    if (phase !== 'MENU') {
      setPhase('MENU');
    } else {
      // Small visual feedback for exit
      alert("Terima kasih telah berkunjung!");
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#141414] font-sans selection:bg-orange-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        
        {/* --- MENU PHASE --- */}
        {phase === 'MENU' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md w-full text-center space-y-8"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-200"
              >
                <BrainCircuit className="text-white w-10 h-10" />
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Quiz Master Pro</h1>
              <p className="text-gray-500 max-w-xs mx-auto">
                Tantang pengetahuanmu hari ini! Selesaikan 5 soal menarik dan lihat skormu.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={startQuiz}
                className="group flex items-center justify-center gap-2 bg-gray-900 text-white py-4 px-8 rounded-xl font-medium transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-200 active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                Mulai Quiz
              </button>
              
              <button
                onClick={exitApp}
                className="flex items-center justify-center gap-2 text-gray-400 py-3 px-8 rounded-xl font-medium border border-transparent hover:border-gray-200 hover:text-gray-600 transition-all active:scale-95 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Keluar
              </button>
            </div>

            <footer className="pt-12 text-[10px] uppercase tracking-[0.2em] text-gray-300 font-semibold font-mono">
              Designed for Learning &bull; v1.0.0
            </footer>
          </motion.div>
        )}

        {/* --- QUIZ PHASE --- */}
        {phase === 'QUIZ' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl w-full flex flex-col min-h-[600px] py-10"
          >
            {/* Header / Nav */}
            <header className="flex items-center justify-between py-6">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                   <BrainCircuit className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Pengetahuan Umum</h3>
                  <p className="text-xs text-gray-500 font-mono">SOAL {currentQuestionIndex + 1} DARI {QUIZ_QUESTIONS.length}</p>
                </div>
              </div>
              <button 
                onClick={() => setPhase('MENU')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-12">
              <motion.div 
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question Card */}
            <div className="flex-1 space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-medium tracking-tight text-gray-900 leading-tight">
                    {currentQuestion.question}
                  </h2>

                  <div className="grid gap-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = userAnswers[currentQuestionIndex] === index;
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`
                            group w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 cursor-pointer
                            ${isSelected 
                              ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100' 
                              : 'border-white bg-white hover:border-gray-200 hover:shadow-md'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <span className={`
                                  w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors
                                  ${isSelected 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                                  }
                                `}>
                                  {String.fromCharCode(65 + index)}
                                </span>
                                <span className={`text-lg font-medium ${isSelected ? 'text-orange-950' : 'text-gray-700'}`}>
                                  {option}
                                </span>
                             </div>
                             {isSelected && <CheckCircle2 className="text-orange-500 w-6 h-6" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <footer className="py-8 flex items-center justify-between border-t border-gray-100 mt-12">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-950 transition-colors disabled:opacity-30 font-medium cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
                Kembali
              </button>

              {currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={finishQuiz}
                  className="flex items-center gap-2 bg-gray-900 text-white py-3 px-8 rounded-xl font-medium hover:bg-orange-600 transition-all cursor-pointer shadow-lg shadow-gray-200"
                >
                  Selesaikan Quiz
                  <Trophy className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-950 transition-colors font-medium cursor-pointer"
                >
                  Selanjutnya
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </footer>
          </motion.div>
        )}

        {/* --- RESULT PHASE --- */}
        {phase === 'RESULT' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <motion.div 
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  className="w-24 h-24 bg-yellow-400 rounded-full mx-auto flex items-center justify-center shadow-inner"
                >
                  <Trophy className="text-white w-12 h-12" />
                </motion.div>
                <motion.div 
                   animate={{ scale: [1, 1.2, 1] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter"
                >
                  YEAY!
                </motion.div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Hasil Akhir Quiz</h2>
                <p className="text-gray-500">Kerja bagus! Kamu telah menyelesaikan semua soal.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 space-y-6 shadow-xl shadow-gray-100">
               <div className="flex items-center justify-around">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 font-mono">Skor</p>
                    <p className="text-5xl font-black text-gray-900">{result.score}</p>
                  </div>
                  <div className="w-px h-12 bg-gray-100" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 font-mono">Benar</p>
                    <p className="text-5xl font-black text-green-500">{result.correctAnswers}</p>
                  </div>
               </div>

               <div className="space-y-3 pt-6 border-t border-gray-50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Total Soal</span>
                    <span className="text-gray-900 font-bold">{result.totalQuestions} Soal</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Jawaban Salah</span>
                    <span className="text-red-500 font-bold">{result.wrongAnswers}</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={startQuiz}
                className="flex items-center justify-center gap-2 bg-gray-900 text-white py-4 px-8 rounded-xl font-medium hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-gray-200 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                Ulangi Quiz
              </button>
              
              <button
                onClick={() => setPhase('MENU')}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 py-4 px-8 rounded-xl font-medium hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
              >
                <LayoutDashboard className="w-5 h-5" />
                Menu Utama
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
