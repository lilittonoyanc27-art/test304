import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight,
  User,
  Star,
  Activity,
  Zap,
  Eye,
  Tv,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  translation: string;
}

// --- Data: Ver vs Mirar ---

const BASKETBALL_QUESTIONS: Question[] = [
  { id: 1, text: "No puedo ___ nada sin mis gafas.", options: ["ver", "mirar"], correct: "ver", translation: "Ես ոչինչ չեմ տեսնում առանց ակնոցներիս:" },
  { id: 2, text: "¡___ qué bonito es este paisaje!", options: ["Mira", "Ve"], correct: "Mira", translation: "Նայի՛ր, թե որքան գեղեցիկ է այս բնապատկերը:" },
  { id: 3, text: "¿Has ___ a Carlos hoy?", options: ["visto", "mirado"], correct: "visto", translation: "Այսօր Կառլոսին տեսե՞լ ես:" },
  { id: 4, text: "Me gusta ___ la televisión de noche.", options: ["ver", "mirar"], correct: "ver", translation: "Սիրում եմ հեռուստացույց դիտել գիշերը:" },
  { id: 5, text: "Él se ___ al espejo siempre.", options: ["mira", "ve"], correct: "mira", translation: "Նա միշտ նայում է իրեն հայելու մեջ:" },
  { id: 6, text: "No ___ tanto la pantalla.", options: ["mires", "veas"], correct: "mires", translation: "Այդքան շատ մի՛ նայիր էկրանին:" },
  { id: 7, text: "¿Quieres ___ una película?", options: ["ver", "mirar"], correct: "ver", translation: "Ուզո՞ւմ ես ֆիլմ դիտել:" },
  { id: 8, text: "___ por la ventana, está nevando.", options: ["Mira", "Ve"], correct: "Mira", translation: "Նայի՛ր պատուհանից, ձյուն է գալիս:" },
  { id: 9, text: "Desde aquí se ___ el mar.", options: ["ve", "mira"], correct: "ve", translation: "Այստեղից երևում է (տեսնվում է) ծովը:" },
  { id: 10, text: "Tengo que ___ el mapa un momento.", options: ["mirar", "ver"], correct: "mirar", translation: "Պետք է մի պահ նայեմ քարտեզին:" },
  { id: 11, text: "Nosotros ___ las nubes.", options: ["miramos", "vemos"], correct: "miramos", translation: "Մենք նայում ենք ամպերին:" },
  { id: 12, text: "Espero ___ a tu hermano pronto.", options: ["ver", "mirar"], correct: "ver", translation: "Հույս ունեմ շուտով տեսնել եղբորդ:" },
  { id: 13, text: "Ella se quedó ___ el cuadro.", options: ["mirando", "viendo"], correct: "mirando", translation: "Նա մնաց նկարին նայելով (զննելով):" },
  { id: 14, text: "¿Has ___ dónde puse las llaves?", options: ["visto", "mirado"], correct: "visto", translation: "Տեսե՞լ ես, թե որտեղ դրեցի բանալիները:" },
  { id: 15, text: "¡___ hacia adelante cuando camines!", options: ["Mira", "Ve"], correct: "Mira", translation: "Առա՛ջ նայիր, երբ քայլում ես:" },
];

// --- Pedro Character Component ---

const PedroHero = ({ state, playerPos }: { state: 'idle' | 'shoot' | 'fail' | 'celebrate', playerPos: number }) => {
  return (
    <motion.div 
      animate={{ x: playerPos }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="relative flex flex-col items-center"
    >
      {/* Pedro's Body */}
      <div className="relative">
        {/* Hat (Pedro's signature) */}
        <motion.div 
          animate={state === 'celebrate' ? { rotate: [0, 15, -15, 0], y: [-5, 0] } : {}}
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-16 h-4 bg-orange-800 rounded-full border-2 border-black" />
          <div className="w-10 h-8 bg-orange-700 rounded-t-xl mx-auto border-2 border-black -mt-1" />
        </motion.div>
        
        {/* Face */}
        <div className="w-16 h-16 bg-orange-200 rounded-full border-4 border-black relative overflow-hidden flex flex-col items-center justify-center">
           <div className="flex gap-2 mt-2">
             <div className="w-2 h-2 bg-black rounded-full" />
             <div className="w-2 h-2 bg-black rounded-full" />
           </div>
           {/* Funny Mustache */}
           <div className="w-8 h-2 bg-stone-800 rounded-full mt-1" />
           <motion.div 
             animate={state === 'shoot' ? { scaleY: 2 } : { scaleY: 1 }}
             className="w-4 h-1 bg-rose-400 rounded-full mt-1" 
           />
        </div>
        
        {/* Shirt */}
        <div className="w-20 h-20 bg-blue-500 rounded-2xl border-4 border-black -mt-2 flex items-center justify-center">
           <Star className="text-white fill-white opacity-40" size={32} />
        </div>

        {/* Arms */}
        <motion.div 
          animate={state === 'shoot' ? { rotate: -120, y: -20 } : { rotate: 0 }}
          className="absolute top-16 -right-6 w-4 h-12 bg-orange-200 border-4 border-black rounded-full origin-top"
        />
        <motion.div 
          animate={state === 'celebrate' ? { rotate: 120, y: -20 } : { rotate: 0 }}
          className="absolute top-16 -left-6 w-4 h-12 bg-orange-200 border-4 border-black rounded-full origin-top"
        />
      </div>

      <div className="mt-2 bg-black/20 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest">
        Pedro
      </div>
    </motion.div>
  );
};

export default function BasketballGame() {
  const [view, setView] = useState<'intro' | 'play' | 'result'>('intro');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [pedroState, setPedroState] = useState<'idle' | 'shoot' | 'fail' | 'celebrate'>('idle');
  const [ballPos, setBallPos] = useState({ x: 0, y: 0, opacity: 1, scale: 1 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const resetBall = () => {
    setBallPos({ x: 0, y: 0, opacity: 1, scale: 1 });
  };

  const handleStart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setPedroState('idle');
    setView('play');
    resetBall();
  };

  const handleAnswer = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const isCorrect = option === BASKETBALL_QUESTIONS[currentQuestion].correct;

    if (isCorrect) {
      setPedroState('shoot');
      // Ball arc to hoop
      setBallPos({ x: 0, y: -300, opacity: 1, scale: 0.5 });
      setTimeout(() => {
        setScore(s => s + 1);
        setPedroState('celebrate');
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.3, x: 0.5 }
        });
      }, 600);
    } else {
      setPedroState('fail');
      // Ball arc missing
      setBallPos({ x: 100, y: -200, opacity: 0, scale: 0.8 });
    }

    setTimeout(() => {
      if (currentQuestion < BASKETBALL_QUESTIONS.length - 1) {
        setCurrentQuestion(c => c + 1);
        setSelectedOption(null);
        setPedroState('idle');
        resetBall();
      } else {
        setView('result');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-neutral-900 font-sans overflow-hidden flex flex-col">
      
      {/* HUD Header */}
      <header className="p-4 bg-orange-600 text-white flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6" />
          <h1 className="text-xl font-black italic tracking-tighter uppercase">Pedro <span className="text-orange-200">Hoops</span></h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-orange-700 px-4 py-1 rounded-full border-2 border-white/20 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase opacity-60">Quest</span>
              <span className="text-xl font-black">{currentQuestion + 1}/15</span>
           </div>
           <div className="bg-orange-700 px-4 py-1 rounded-full border-2 border-white/20 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase opacity-60">Score</span>
              <span className="text-xl font-black">{score}</span>
           </div>
        </div>
      </header>

      {/* Game Stage */}
      <main className="flex-1 relative flex flex-col">
        
        {/* Basketball Court Section */}
        <div className="h-[45vh] bg-orange-100 relative overflow-hidden border-b-8 border-orange-200">
           {/* Court Patterns */}
           <div className="absolute bottom-0 left-0 w-full h-24 bg-orange-200/50" />
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-24 border-4 border-orange-300 rounded-full scale-y-50" />
           
           {/* Basketball Hoop */}
           <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center scale-75 md:scale-100">
              <div className="w-32 h-24 bg-white border-4 border-black relative rounded-lg flex items-center justify-center">
                 <div className="w-16 h-12 border-2 border-black/20" />
                 {/* Hoop Rim */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-2 bg-red-600 rounded-full" />
                 {/* Net */}
                 <div className="absolute top-24 left-1/2 -translate-x-1/2 w-14 h-16 border-x-4 border-b-4 border-zinc-300 border-dashed rounded-b-2xl opacity-40" />
              </div>
              <div className="w-2 h-40 bg-zinc-400 mt-[-2px] border-x-2 border-black" />
           </div>

           {/* Feedback Overlays */}
           <AnimatePresence>
             {pedroState === 'celebrate' && (
               <motion.div 
                 initial={{ scale: 0, rotate: -20, opacity: 0 }}
                 animate={{ scale: 1.5, rotate: 0, opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-6xl font-black text-orange-600 italic uppercase drop-shadow-2xl"
               >
                 GOAL!!
               </motion.div>
             )}
             {pedroState === 'fail' && (
               <motion.div 
                 initial={{ scale: 0, x: -50, opacity: 0 }}
                 animate={{ scale: 1.5, x: 0, opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-6xl font-black text-zinc-500 italic uppercase drop-shadow-2xl"
               >
                 MISS!
               </motion.div>
             )}
           </AnimatePresence>

           {/* Basketball */}
           <motion.div 
             animate={{ 
               x: ballPos.x, 
               y: ballPos.y, 
               opacity: ballPos.opacity, 
               scale: ballPos.scale,
               rotate: ballPos.y === 0 ? 0 : 720
             }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="absolute bottom-24 left-1/2 -ml-6 w-12 h-12 bg-orange-500 rounded-full border-4 border-black z-30 shadow-xl"
           >
              {/* Ball Lines */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-black/40" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/40" />
           </motion.div>

           {/* Pedro */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <PedroHero state={pedroState} playerPos={0} />
           </div>
        </div>

        {/* UI Section */}
        <div className="flex-1 bg-white p-6 md:p-10 flex flex-col overflow-y-auto">
           <AnimatePresence mode="wait">
             
             {view === 'intro' && (
               <motion.div 
                 key="intro"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-md mx-auto w-full text-center space-y-8"
               >
                 <div className="space-y-2">
                    <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                       <Tv size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mt-4">Ver vs Mirar</h2>
                    <p className="text-neutral-500 font-bold">Օգնիր Պեդրոյին դառնալ բասկետբոլի աստղ: Ընտրիր ճիշտ բայը և նա կգցի գնդակը զամբյուղի մեջ:</p>
                 </div>
                 <button 
                  onClick={handleStart}
                  className="w-full bg-orange-600 text-white font-black py-5 rounded-[40px] uppercase text-xl shadow-xl hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   Խաղալ <Play fill="white" size={24} />
                 </button>
               </motion.div>
             )}

             {view === 'play' && (
               <motion.div 
                 key="play"
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="max-w-2xl mx-auto w-full space-y-8 text-center"
               >
                 <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                       <Eye size={20} className="text-orange-600" />
                       <span className="text-xs font-black uppercase tracking-widest text-orange-600">Հարց {currentQuestion + 1}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">
                       {BASKETBALL_QUESTIONS[currentQuestion].text}
                    </h3>
                    <p className="text-xl font-bold text-neutral-400 italic">
                       {BASKETBALL_QUESTIONS[currentQuestion].translation}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4 pt-6">
                    {BASKETBALL_QUESTIONS[currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={!!selectedOption}
                        className={`
                          p-6 md:p-8 rounded-[40px] font-black text-2xl md:text-4xl uppercase italic border-4 transition-all
                          ${selectedOption === option 
                            ? (option === BASKETBALL_QUESTIONS[currentQuestion].correct ? 'bg-orange-600 border-orange-700 text-white' : 'bg-zinc-200 border-zinc-300 text-zinc-400') 
                            : (selectedOption && option === BASKETBALL_QUESTIONS[currentQuestion].correct ? 'bg-orange-200 border-orange-300 text-orange-700' : 'bg-orange-50 border-orange-100 text-orange-950 hover:bg-orange-100')
                          }
                        `}
                      >
                        {option}
                      </button>
                    ))}
                 </div>
               </motion.div>
             )}

             {view === 'result' && (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="max-w-md mx-auto w-full text-center space-y-10 py-10"
               >
                 <div className="space-y-4">
                    <Trophy size={100} className="text-orange-500 mx-auto animate-bounce" />
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter"> Pedro Is Proud!</h2>
                    <p className="text-2xl font-bold">Դու հավաքեցիր {score} / 15 միավոր:</p>
                 </div>

                 <div className="bg-orange-100 p-8 rounded-[40px] space-y-4">
                    <div className="text-6xl font-black text-orange-600">{Math.round((score/15) * 100)}%</div>
                    <p className="font-black uppercase tracking-widest text-orange-800/60">Success Rate</p>
                 </div>

                 <button 
                  onClick={() => setView('intro')}
                  className="w-full bg-orange-600 text-white font-black py-5 rounded-[40px] uppercase text-xl shadow-xl hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                   Փորձել Նորից <RotateCcw size={24} />
                 </button>
               </motion.div>
             )}

           </AnimatePresence>
        </div>

      </main>

      {/* Decorative Floor */}
      <div className="h-4 bg-orange-800 w-full" />
    </div>
  );
}
