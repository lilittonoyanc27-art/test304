import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  Compass, 
  Anchor, 
  Waves,
  Ship,
  Wind,
  Navigation,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  translation: string;
}

// --- Data: Subject Pronouns ---

const SEA_QUESTIONS: Question[] = [
  { id: 1, question: "___ hablo español.", options: ["Yo", "Tú", "Él"], correct: "Yo", translation: "Ես խոսում եմ իսպաներեն:" },
  { id: 2, question: "¿___ eres de Armenia?", options: ["Yo", "Tú", "Ella"], correct: "Tú", translation: "Դո՞ւ ես Հայաստանից:" },
  { id: 3, question: "___ es mi hermano.", options: ["Yo", "Él", "Nosotros"], correct: "Él", translation: "Նա (արական) իմ եղբայրն է:" },
  { id: 4, question: "___ es muy inteligente.", options: ["Tú", "Ella", "Vosotros"], correct: "Ella", translation: "Նա (իգական) շատ խելացի է:" },
  { id: 5, question: "___ somos amigos.", options: ["Nosotros", "Ellos", "Yo"], correct: "Nosotros", translation: "Մենք ընկերներ ենք:" },
  { id: 6, question: "___ sois de España.", options: ["Nosotros", "Vosotros", "Ellas"], correct: "Vosotros", translation: "Դուք (Իսպանիայում) Իսպանիայից եք:" },
  { id: 7, question: "___ son mis padres.", options: ["Nosotros", "Ellos", "Él"], correct: "Ellos", translation: "Նրանք իմ ծնողներն են:" },
  { id: 8, question: "___ son mis hermanas.", options: ["Ellas", "Ellos", "Vosotros"], correct: "Ellas", translation: "Նրանք (իգական) իմ քույրերն են:" },
  { id: 9, question: "Juan y ___ comemos pizza.", options: ["yo", "tú", "él"], correct: "yo", translation: "Խուանը և ես պիցցա ենք ուտում:" },
  { id: 10, question: "María y ___ sois simpáticas.", options: ["vosotras", "nosotras", "ellas"], correct: "vosotras", translation: "Մարիան և դուք (իգական) համակրելի եք:" },
  { id: 11, question: "___ estudio mucho.", options: ["Yo", "Tú", "Él"], correct: "Yo", translation: "Ես շատ եմ սովորում:" },
  { id: 12, question: "___ vives en Madrid.", options: ["Yo", "Tú", "Ella"], correct: "Tú", translation: "Դու ապրում ես Մադրիդում:" },
  { id: 13, question: "___ canta muy bien.", options: ["Yo", "Él", "Ellos"], correct: "Él", translation: "Նա շատ լավ է երգում:" },
  { id: 14, question: "___ trabajamos juntos.", options: ["Nosotros", "Ellos", "Tú"], correct: "Nosotros", translation: "Մենք միասին ենք աշխատում:" },
  { id: 15, question: "___ bailan salsa.", options: ["Nosotros", "Ellos", "Él"], correct: "Ellos", translation: "Նրանք սալսա են պարում:" },
];

const SeaShip = ({ speed }: { speed: number }) => {
  return (
    <motion.div 
      animate={{ 
        y: [0, -10, 0],
        rotate: [-1, 1, -1]
      }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="relative z-20"
    >
      <div className="relative">
        {/* Sails */}
        <motion.div 
          animate={{ scaleX: 1 + speed * 0.1 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-t-full border-4 border-zinc-300 shadow-lg flex items-center justify-center"
        >
           <Wind className="text-zinc-200" size={48} />
        </motion.div>
        {/* Hull */}
        <div className="w-48 h-16 bg-amber-900 rounded-b-[40px] border-b-8 border-amber-950 relative overflow-hidden">
           <div className="absolute top-2 left-4 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-950" />
           <div className="absolute top-2 left-12 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-950" />
           <div className="absolute top-2 left-20 w-4 h-4 bg-amber-200 rounded-full border-2 border-amber-950" />
        </div>
      </div>
    </motion.div>
  );
};

export default function SeaJourney() {
  const [view, setView] = useState<'intro' | 'play' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [distance, setDistance] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleStart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setDistance(0);
    setView('play');
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = SEA_QUESTIONS[currentQuestion].correct;
    
    if (option === correct) {
      setIsTraveling(true);
      setScore(s => s + 1);
      setDistance(prev => prev + 1);
      
      setTimeout(() => {
        nextQuestion();
      }, 1500);
    } else {
      setWrongAnswer(true);
      setTimeout(() => {
        setWrongAnswer(false);
        nextQuestion();
      }, 2000);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsTraveling(false);
    if (currentQuestion < SEA_QUESTIONS.length - 1) {
      setCurrentQuestion(c => c + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setView('result');
    if (score > 10) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 text-zinc-900 font-sans flex flex-col overflow-hidden">
      
      {/* Ocean Layout (3D Aspect) */}
      <div className="h-[50vh] relative bg-gradient-to-b from-sky-400 to-blue-600 overflow-hidden perspective-[1000px]">
        
        {/* Moving Waves Background */}
        <div className="absolute inset-0 z-0">
           {Array.from({ length: 10 }).map((_, i) => (
             <motion.div 
               key={i}
               animate={{ 
                 x: [-100, 100],
                 y: [0, 5, 0],
                 scaleY: isTraveling ? [1, 1.2, 1] : 1
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: isTraveling ? 1 : 4, 
                 delay: i * 0.5,
                 ease: "easeInOut" 
               }}
               className="absolute w-[200%] h-2 bg-white/20 blur-[2px]"
               style={{ top: `${i * 10}%`, left: '-50%' }}
             />
           ))}
        </div>

        {/* Floating Islands / Destination (3D feel) */}
        <AnimatePresence>
          {isTraveling && (
            <motion.div 
              initial={{ z: -1000, scale: 0, opacity: 0, y: 100 }}
              animate={{ z: 0, scale: 1, opacity: 0.5, y: 150 }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute top-20 left-1/2 -translate-x-1/2"
            >
              <div className="w-64 h-32 bg-emerald-500 rounded-full blur-xl" />
              <div className="absolute top-[-20px] left-1/2 -translate-x-1/2">
                 <Globe className="text-emerald-300 opacity-20" size={120} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Ship */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
           <SeaShip speed={isTraveling ? 5 : 1} />
        </div>

        {/* Wrong Answer Storm */}
        <AnimatePresence>
          {wrongAnswer && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/40 z-30 flex items-center justify-center"
            >
               <motion.div 
                 animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 0.5 }}
               >
                 <Waves size={100} className="text-zinc-400 opacity-50" />
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HUD Overlay */}
        <div className="absolute top-6 left-6 right-6 flex justify-between z-40 px-4">
           <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/20 flex items-center gap-3">
              <Compass className="text-white animate-spin-slow" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Progress</span>
                 <span className="text-xl font-black text-white">{currentQuestion + 1} / 15</span>
              </div>
           </div>
           <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/20 flex items-center gap-3">
              <Anchor className="text-white" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase text-white/60 tracking-widest">Cargo</span>
                 <span className="text-xl font-black text-white">{score}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Interface Section */}
      <main className="flex-1 bg-white relative z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-6 md:p-12 flex flex-col items-center">
         <AnimatePresence mode="wait">
            
            {view === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center space-y-10"
              >
                <div className="space-y-4">
                   <div className="w-24 h-24 bg-blue-600 rounded-[35%] flex items-center justify-center mx-auto shadow-2xl rotate-12">
                      <Navigation size={48} className="text-white" />
                   </div>
                   <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Sea <br/><span className="text-blue-600">Journey</span></h2>
                   <p className="text-zinc-500 font-medium">Յուրացրեք անձնական դերանունները (Direct Pronouns): Ճիշտ ընտրեք դերանունը, որպեսզի նավն առաջ գնա:</p>
                </div>
                <button 
                  onClick={handleStart}
                  className="w-full bg-blue-600 text-white font-black py-6 rounded-[40px] uppercase text-2xl tracking-tighter shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Սկսել Ճամփորդությունը <Play fill="white" size={28} />
                </button>
              </motion.div>
            )}

            {view === 'play' && (
              <motion.div 
                key="play"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-2xl space-y-12"
              >
                 <div className="text-center space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight text-zinc-800">
                       {SEA_QUESTIONS[currentQuestion].question}
                    </h3>
                    <p className="text-xl font-bold text-blue-600/60 italic">
                       {SEA_QUESTIONS[currentQuestion].translation}
                    </p>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                    {SEA_QUESTIONS[currentQuestion].options.map((option) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(option)}
                        disabled={!!selectedOption}
                        className={`
                          p-6 md:p-8 rounded-[35px] font-black text-3xl uppercase italic border-4 transition-all shadow-xl
                          ${selectedOption === option 
                             ? (option === SEA_QUESTIONS[currentQuestion].correct ? 'bg-emerald-500 border-white text-white' : 'bg-red-500 border-white text-white')
                             : (selectedOption && option === SEA_QUESTIONS[currentQuestion].correct ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-zinc-50 border-zinc-100 text-zinc-900 hover:border-blue-300')
                          }
                        `}
                      >
                        {option}
                      </motion.button>
                    ))}
                 </div>
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center space-y-10"
              >
                 <div className="space-y-4">
                    <div className="relative inline-block">
                       <Trophy size={120} className="text-amber-500 mx-auto" />
                       <motion.div 
                         initial={{ rotate: 0 }}
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                         className="absolute inset-0 border-4 border-dashed border-amber-500/30 rounded-full"
                       />
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter">Land Ho!</h2>
                    <p className="text-2xl font-bold text-zinc-500">Դուք բարեհաջող հասաք ափ: <br/> Միավորները՝ {score} / 15</p>
                 </div>

                 <button 
                  onClick={() => setView('intro')}
                  className="w-full bg-zinc-900 text-white font-black py-6 rounded-[40px] uppercase text-2xl tracking-tighter shadow-2xl hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   Նորից Սկսել <RotateCcw size={28} />
                 </button>
              </motion.div>
            )}

         </AnimatePresence>
      </main>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
