import { useState, useMemo } from 'react';
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
  Calculator,
  Globe,
  Settings,
  ShieldCheck,
  Save,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { QUIZ_QUESTIONS, SUBJECTS } from './questions';
import { QuizPhase, QuizResult, Subject } from './types';

const IconMap = {
  BrainCircuit,
  Globe,
  Calculator
};

export default function App() {
  const [phase, setPhase] = useState<QuizPhase>('MENU');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions = useMemo(() => {
    if (!selectedSubject) return [];
    return QUIZ_QUESTIONS[selectedSubject.id] || [];
  }, [selectedSubject]);

  const handleStartProcess = () => {
    setPhase('SUBJECT_SELECTION');
  };

  const selectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    const subjectQuestions = QUIZ_QUESTIONS[subject.id] || [];
    setUserAnswers(new Array(subjectQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setPhase('QUIZ');
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 300);
  };

  const finishQuiz = () => {
    let correct = 0;
    let wrong = 0;

    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    setResult({
      score,
      totalQuestions: questions.length,
      correctAnswers: correct,
      wrongAnswers: wrong,
      answers: userAnswers
    });
    setPhase('RESULT');
  };

  const resetQuiz = () => {
    setPhase('MENU');
    setSelectedSubject(null);
    setResult(null);
    setUserAnswers([]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header Navigation */}
      <header className="max-w-7xl w-full mx-auto flex justify-between items-center p-8 md:px-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-widest text-slate-800">EduQuiz Pro</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Digital Evaluation System v2.1</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {phase === 'QUIZ' && selectedSubject && (
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sesi Berjalan</span>
              <span className="text-sm font-bold text-slate-700">{selectedSubject.name}</span>
            </div>
          )}
          {phase !== 'MENU' && <div className="hidden md:block h-8 w-[1px] bg-slate-200 mx-2"></div>}
          <button 
            onClick={resetQuiz}
            className="px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all cursor-pointer"
          >
            Keluar Aplikasi
          </button>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto flex-1 p-8 md:px-12">
        <AnimatePresence mode="wait">
          
          {/* --- MENU PHASE --- */}
          {phase === 'MENU' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-12 py-12"
            >
              <div className="space-y-6">
                <div className="inline-flex p-4 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                  <Settings className="w-8 h-8 text-indigo-600 animate-spin-slow" />
                </div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl px-4">
                  Sistem Evaluasi Pembelajaran Digital Modern
                </h2>
                <p className="text-slate-500 text-lg max-w-xl mx-auto px-6">
                  Platform kuis interaktif yang dirancang untuk membantu proses pembelajaran dan evaluasi pemahaman materi secara otomatis dan akurat.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleStartProcess}
                  className="group flex items-center justify-center gap-4 bg-indigo-600 text-white py-5 px-10 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Mulai Evaluasi
                </button>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 px-6 py-5 bg-white border border-slate-200 rounded-2xl">
                      <ShieldCheck className="w-5 h-5 text-indigo-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Standar Edukasi</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- SUBJECT SELECTION --- */}
          {phase === 'SUBJECT_SELECTION' && (
            <motion.div
              key="subject"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12 py-8"
            >
              <div className="text-center md:text-left">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">Pilih Materi</span>
                <h2 className="text-4xl font-black text-slate-800 mt-6 tracking-tight">Pilih Mata Pelajaran</h2>
                <p className="text-slate-500 mt-2">Silakan pilih bidang studi yang ingin Anda evaluasi hari ini.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {SUBJECTS.map((subject) => {
                  const Icon = IconMap[subject.icon as keyof typeof IconMap] || BrainCircuit;
                  return (
                    <motion.button
                      key={subject.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectSubject(subject)}
                      className="group p-8 bg-white border border-slate-200 rounded-[2.5rem] text-left hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-50 transition-all flex flex-col gap-8 cursor-pointer"
                    >
                      <div className={`w-14 h-14 bg-${subject.color}-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-${subject.color}-100 transition-transform group-hover:rotate-6`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{subject.name}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                          {subject.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest mt-auto">
                        Mulai Sekarang
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* --- QUIZ PHASE --- */}
          {phase === 'QUIZ' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-12 gap-8 h-full min-h-[600px]"
            >
              {/* Sidebar */}
              <aside className="hidden lg:flex col-span-3 flex-col gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Status Progress</h3>
                  <div className="grid grid-cols-5 gap-2.5 mb-8">
                    {questions.map((_, idx) => {
                      const isComplete = userAnswers[idx] !== null;
                      const isCurrent = currentQuestionIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold shadow-sm transition-all cursor-pointer
                            ${isCurrent ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 ring-4 ring-indigo-50' : 
                              isComplete ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}
                          `}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-500">Terselesaikan</span>
                      <span className="text-sm font-bold text-slate-800">
                        {Math.round(((userAnswers.filter(a => a !== null).length) / questions.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full transition-all duration-500" 
                        style={{ width: `${(userAnswers.filter(a => a !== null).length / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-7 rounded-[2rem] flex-1 flex flex-col justify-between shadow-2xl shadow-slate-200">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Evaluasi Aktif</p>
                    <h4 className="text-2xl font-black tracking-tight leading-tight">{selectedSubject?.name}</h4>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      <div className="flex-1 flex justify-between text-xs">
                        <span className="text-slate-400">Total Soal</span>
                        <span className="font-bold">{questions.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                      <div className="flex-1 flex justify-between text-xs">
                        <span className="text-slate-400">Tersisa</span>
                        <span className="font-bold">{questions.length - userAnswers.filter(a => a !== null).length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Interface */}
              <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 h-full">
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 flex-1 flex flex-col shadow-sm">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-10">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-100">
                          Soal No. {String(currentQuestionIndex + 1).padStart(2, '0')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-8 tracking-tight leading-[1.15]">
                          {questions[currentQuestionIndex].question}
                        </h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 flex-1">
                        {questions[currentQuestionIndex].options.map((option, idx) => {
                          const isSelected = userAnswers[currentQuestionIndex] === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswerSelect(idx)}
                              className={`group p-6 border-2 rounded-2xl text-left flex items-start gap-4 transition-all cursor-pointer
                                ${isSelected 
                                  ? 'border-indigo-600 bg-indigo-50 ring-8 ring-indigo-50 shadow-lg shadow-indigo-100' 
                                  : 'border-slate-50 bg-slate-50 hover:border-indigo-200 hover:bg-white hover:shadow-lg'
                                }
                              `}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 transition-colors
                                ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'}
                              `}>
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <div className="pt-2">
                                <p className={`text-base font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-600'}`}>{option}</p>
                                {isSelected && <p className="text-[10px] text-indigo-500 mt-2 font-black uppercase tracking-tighter">Pilihan Terpilih</p>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex justify-between items-center mt-12 pt-10 border-t border-slate-100">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-slate-200 transition-all disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Sebelumnya
                    </button>
                    <div className="flex gap-4">
                      {currentQuestionIndex === questions.length - 1 ? (
                        <button
                          onClick={finishQuiz}
                          className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-pointer"
                        >
                          Selesaikan Evaluasi
                          <Trophy className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                          className="px-10 py-5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all cursor-pointer"
                        >
                          Lanjut Soal
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- RESULT PHASE --- */}
          {phase === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full mx-auto"
            >
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-5 bg-slate-900 text-white p-12 rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-8 shadow-2xl shadow-slate-200">
                   <div className="relative">
                      <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl shadow-indigo-500/20">
                         <Trophy className="w-12 h-12 text-white -rotate-12" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center font-black animate-bounce text-slate-900 text-sm italic">WIN</div>
                   </div>
                   <div className="space-y-4">
                      <h2 className="text-4xl font-black tracking-tight leading-tight">Evaluasi Selesai</h2>
                      <p className="text-slate-400 font-medium">Terima kasih telah mengikuti sesi ini. Berikut adalah rangkuman performa Anda.</p>
                   </div>
                   <div className="pt-8 w-full">
                      <button
                        onClick={resetQuiz}
                        className="w-full py-5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 cursor-pointer shadow-lg shadow-indigo-500/10"
                      >
                         Kembali Ke Menu
                      </button>
                   </div>
                </div>

                <div className="md:col-span-7 space-y-6">
                   <div className="bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm flex items-center justify-between">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Skor Akhir</p>
                         <h3 className="text-7xl font-black text-slate-900 tracking-tighter">{result.score}<span className="text-2xl text-indigo-500 ml-1 font-bold">PTS</span></h3>
                      </div>
                      <div className="h-20 w-[1px] bg-slate-100" />
                      <div className="flex flex-col gap-6">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                               <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Benar</p>
                               <p className="text-xl font-black text-slate-800">{result.correctAnswers}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                               <LogOut className="w-5 h-5 text-red-500 rotate-180" />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Salah</p>
                               <p className="text-xl font-black text-slate-800">{result.wrongAnswers}</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => selectSubject(selectedSubject!)}
                        className="p-8 border-2 border-indigo-600 rounded-[2rem] flex items-center justify-center gap-3 bg-indigo-50 text-indigo-600 font-extrabold uppercase text-xs tracking-widest cursor-pointer hover:bg-indigo-100 transition-colors"
                      >
                         <RotateCcw className="w-5 h-5" />
                         Ulangi Materi
                      </button>
                      <button 
                        onClick={resetQuiz}
                        className="p-8 bg-slate-900 border-2 border-slate-900 rounded-[2rem] flex items-center justify-center gap-3 text-white font-extrabold uppercase text-xs tracking-widest cursor-pointer hover:bg-indigo-600 hover:border-indigo-600 transition-colors"
                      >
                         <LayoutDashboard className="w-5 h-5" />
                         Materi Lain
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Details */}
      <footer className="max-w-7xl w-full mx-auto p-12 flex justify-between items-center opacity-60">
        <div className="hidden md:flex gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto-save Aktif</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enkripsi SSL 256-bit</span>
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] font-mono">© 2026 EduQuiz Pro Systems</p>
      </footer>
    </div>
  );
}
