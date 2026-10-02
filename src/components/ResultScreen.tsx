import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, Home, Sparkles, Award } from 'lucide-react';
import { sound } from '../utils/sound';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  levelTitle: string;
  onRestartLevel: () => void;
  onGoToLevels: () => void;
  onGoToCover: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  levelTitle,
  onRestartLevel,
  onGoToLevels,
  onGoToCover,
}) => {
  useEffect(() => {
    sound.playFinish();

    // Fanfare confetti shower
    const timer = setTimeout(() => {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // Ignore
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const starCount = score >= 100 ? 3 : score >= 60 ? 2 : 1;

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center p-3 sm:p-6">
      
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border-4 border-amber-500 shadow-2xl relative text-center space-y-6 animate-bounce-in">
        
        {/* Victory Chest Image from generated assets */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl bg-gradient-to-tr from-amber-400 to-yellow-200 p-1 animate-float">
          <img 
            src="/assets/village_victory_chest.jpg" 
            alt="Peti Kemenangan Desa Harmoni" 
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Misi Desa Berhasil Dituntaskan!</span>
          </div>
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold text-amber-950">
            Kamu Hebat! Pahlawan Desa!
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
            Kamu telah membuktikan pemahaman konsep pembagian dan penalaran logis tingkat tinggi di {levelTitle}!
          </p>
        </div>

        {/* Score & Stars Card */}
        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-3 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm mx-auto shadow-inner space-y-3">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">
            Total Skor Koin Desa
          </span>
          <div className="font-title text-5xl sm:text-6xl font-extrabold text-emerald-700 tracking-tight">
            {score}
          </div>

          {/* 3 Stars Visual */}
          <div className="flex justify-center space-x-2 text-3xl sm:text-4xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-9 h-9 sm:w-10 sm:h-10 transition-transform ${
                  i < starCount 
                    ? 'text-amber-400 fill-amber-400 drop-shadow animate-bounce-in' 
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-slate-600 pt-2 border-t border-amber-200">
            {starCount === 3 ? (
              <strong className="text-emerald-800">Sempurna! Semua soal terjawab tepat! 🌟</strong>
            ) : starCount === 2 ? (
              <strong className="text-amber-800">Bagus sekali! Pemahaman konsepmu mantap! 👍</strong>
            ) : (
              <strong className="text-slate-700">Terus berlatih untuk meraih 3 bintang penuh! 💪</strong>
            )}
          </div>
        </div>

        {/* Pak Kades Gratitude Speech Box */}
        <div className="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 flex items-center space-x-3.5 text-left max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500 flex-shrink-0">
            <img 
              src="/assets/pak_kades_happy.jpg" 
              alt="Pak Kades Senang" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
            <strong>Pak Wijaya:</strong> "Terima kasih atas bantuanmu! Seluruh warga Desa Harmoni kini dapat menikmati hasil panen secara adil dan teratur. Kamu membanggakan desa!"
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onRestartLevel();
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-title text-base font-bold py-3 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 border-2 border-emerald-400 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Ulang Level Ini</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoToLevels();
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-title text-base font-bold py-3 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 border-2 border-amber-400 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Pilih Level Lain</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onGoToCover();
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-title text-base font-bold py-3 px-6 rounded-2xl transition-all active:scale-95 flex items-center justify-center space-x-2 border border-slate-300 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>

      </div>

    </div>
  );
};
