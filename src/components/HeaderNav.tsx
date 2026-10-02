import React from 'react';
import { Volume2, VolumeX, Music, Home, BookOpen, User, Star, Coins } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderNavProps {
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  levelTitle?: string;
  isGameActive: boolean;
  onHomeClick: () => void;
  onMateriClick: () => void;
  onKadesProfileClick: () => void;
  sfxActive: boolean;
  musicActive: boolean;
  onToggleSfx: () => void;
  onToggleMusic: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  score,
  currentQuestionIndex,
  totalQuestions,
  levelTitle,
  isGameActive,
  onHomeClick,
  onMateriClick,
  onKadesProfileClick,
  sfxActive,
  musicActive,
  onToggleSfx,
  onToggleMusic,
}) => {
  return (
    <header className="bg-amber-950/85 backdrop-blur-md border-b-4 border-amber-600 sticky top-0 z-50 shadow-xl text-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex flex-wrap justify-between items-center gap-2">
        
        {/* Brand / Title Banner with Wood Plank style */}
        <div 
          onClick={onHomeClick}
          className="flex items-center space-x-2.5 cursor-pointer group select-none transition-transform active:scale-95"
          title="Kembali ke Beranda Desa Harmoni"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md flex items-center justify-center transform group-hover:rotate-3 transition-transform">
            <img 
              src="/assets/pak_kades_main.jpg" 
              alt="Pak Kades" 
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-title text-lg md:text-xl font-bold text-amber-200 tracking-wide drop-shadow-sm flex items-center gap-1">
                Desa Harmoni <span className="text-emerald-400">🍃</span>
              </span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-200">
              Matematika Kelas 4 • Pengurangan Berulang & HOTS
            </p>
          </div>
        </div>

        {/* Center / Game Status Indicators (from Image 3) */}
        {isGameActive && (
          <div className="flex items-center space-x-2 md:space-x-3 bg-amber-900/80 px-3 py-1.5 rounded-2xl border border-amber-600/70 shadow-inner">
            {/* Coin Score Bar */}
            <div className="flex items-center space-x-1.5 bg-amber-950/90 px-2.5 py-1 rounded-xl border border-amber-500/50">
              <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-bold text-xs md:text-sm text-amber-300 font-title tracking-wider">{score}</span>
            </div>

            {/* Level & Question Progress Bar */}
            <div className="flex items-center space-x-1.5 bg-amber-950/90 px-2.5 py-1 rounded-xl border border-amber-500/50">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-xs md:text-sm text-yellow-200">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>

            {/* Level Name */}
            {levelTitle && (
              <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/40">
                {levelTitle}
              </span>
            )}
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Tokoh Pak Kades Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onKadesProfileClick();
            }}
            className="bg-amber-800/90 hover:bg-amber-700 text-amber-100 p-2 sm:px-3 sm:py-1.5 rounded-xl border border-amber-600 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Profil & Ekspresi Pak Kepala Desa"
          >
            <User className="w-4 h-4 text-amber-300" />
            <span className="hidden md:inline">Pak Kades</span>
          </button>

          {/* Materi Edukasi Button */}
          <button
            onClick={() => {
              sound.playClick();
              onMateriClick();
            }}
            className="bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 p-2 sm:px-3 sm:py-1.5 rounded-xl border border-emerald-600 text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Pelajari Konsep Pembagian"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span className="hidden md:inline">Materi</span>
          </button>

          {/* SFX Toggle */}
          <button
            onClick={onToggleSfx}
            className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              sfxActive 
                ? 'bg-amber-800/90 border-amber-500 text-amber-200 hover:bg-amber-700' 
                : 'bg-zinc-800 border-zinc-600 text-zinc-400'
            }`}
            title={sfxActive ? 'Suara Efek: Aktif' : 'Suara Efek: Senyap'}
          >
            {sfxActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
              musicActive 
                ? 'bg-purple-800/90 border-purple-400 text-purple-200 animate-gentle-pulse hover:bg-purple-700' 
                : 'bg-zinc-800 border-zinc-600 text-zinc-400'
            }`}
            title={musicActive ? 'Musik Desa: Berputar' : 'Musik Desa: Senyap'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Home Button if in game */}
          {isGameActive && (
            <button
              onClick={() => {
                sound.playClick();
                onHomeClick();
              }}
              className="bg-amber-700 hover:bg-amber-600 text-white p-2 rounded-xl border border-amber-500 shadow-md active:scale-90 cursor-pointer"
              title="Menu Utama"
            >
              <Home className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
