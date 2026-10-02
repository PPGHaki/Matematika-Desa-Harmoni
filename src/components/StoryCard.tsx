import React, { useState } from 'react';
import { Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { QuestionData, CharacterMood } from '../types/game';
import { speakIndonesian, sound } from '../utils/sound';

interface StoryCardProps {
  question: QuestionData;
  mood: CharacterMood;
  onShowHint?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ question, mood, onShowHint }) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const getKadesImage = () => {
    switch (mood) {
      case 'happy':
        return '/assets/pak_kades_happy.jpg';
      case 'thinking':
        return '/assets/pak_kades_thinking.jpg';
      default:
        return '/assets/pak_kades_main.jpg';
    }
  };

  const getMoodTitle = () => {
    switch (mood) {
      case 'happy':
        return 'Pak Wijaya • Bangga & Senang!';
      case 'thinking':
        return 'Pak Wijaya • Sedang Menganalisis';
      default:
        return 'Pak Wijaya • Kepala Desa Harmoni';
    }
  };

  const handleReadSpeech = () => {
    sound.playClick();
    setIsPlayingVoice(true);
    speakIndonesian(`${question.contextTitle}. ${question.story}`);
    setTimeout(() => {
      setIsPlayingVoice(false);
    }, 6000);
  };

  return (
    <div className={`relative rounded-3xl border-4 p-4 sm:p-5 shadow-xl transition-all duration-300 ${
      question.isHots 
        ? 'bg-gradient-to-br from-rose-50/95 via-amber-50/95 to-white/95 border-rose-400 shadow-rose-200/50' 
        : 'bg-gradient-to-br from-amber-50/95 via-emerald-50/95 to-white/95 border-amber-400 shadow-amber-200/50'
    }`}>
      
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-amber-200/70">
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm ${
            question.isHots
              ? 'bg-rose-500 text-white animate-gentle-pulse'
              : 'bg-amber-500 text-white'
          }`}>
            {question.isHots ? <Sparkles className="w-3.5 h-3.5" /> : '🌾'}
            <span>{question.isHots ? 'TANTANGAN PENALARAN HOTS' : 'MISI DESA HARMONI'}</span>
          </span>
          <span className="text-xs font-bold text-slate-700">
            • {question.contextTitle}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {question.hint && onShowHint && (
            <button
              onClick={() => {
                sound.playClick();
                onShowHint();
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-xl flex items-center space-x-1 border border-amber-300 transition-all cursor-pointer"
              title="Lihat Petunjuk"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Petunjuk</span>
            </button>
          )}

          <button
            onClick={handleReadSpeech}
            className={`text-xs font-bold px-3 py-1 rounded-xl flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 cursor-pointer ${
              isPlayingVoice
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
            }`}
            title="Dengarkan Suara Pak Kades Membaca Cerita"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isPlayingVoice ? 'Mendengarkan...' : 'Baca Suara'}</span>
          </button>
        </div>
      </div>

      {/* Main Content: Avatar + Speech Bubble */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center pt-3">
        
        {/* Pak Kades Portrait (matching Image 2) */}
        <div className="sm:col-span-3 flex flex-col items-center text-center">
          <div className="relative group">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 shadow-lg transition-transform duration-300 ${
              mood === 'happy' ? 'border-amber-400 scale-105' : 'border-emerald-600'
            }`}>
              <img 
                src={getKadesImage()} 
                alt="Pak Wijaya Kepala Desa" 
                className="w-full h-full object-cover transition-all"
              />
            </div>
            <span className="absolute -bottom-2 inset-x-0 mx-auto w-max max-w-full text-center bg-amber-900 text-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-400 shadow truncate">
              Pak Kades
            </span>
          </div>
          <p className="text-[11px] font-bold text-emerald-800 mt-2">
            {getMoodTitle()}
          </p>
        </div>

        {/* Speech Bubble Narrative */}
        <div className="sm:col-span-9 bg-white/95 rounded-2xl p-4 border-2 border-amber-300/80 shadow-inner relative">
          {/* Arrow pointing to left avatar */}
          <div className="hidden sm:block absolute -left-2.5 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-amber-300 border-b-8 border-b-transparent"></div>
          
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
            "{question.story}"
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500">
            <span>
              Barang: <strong className="text-emerald-700">{question.itemName}</strong>
            </span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-semibold">
              Total Mula-mula: {question.dividend} {question.unitName}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
