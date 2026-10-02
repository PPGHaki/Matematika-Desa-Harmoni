import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Flame, Sprout, Trees, Flower2 } from 'lucide-react';
import { LevelKey } from '../types/game';
import { LEVEL_METADATA } from '../data/questions';
import { sound } from '../utils/sound';

interface LevelSelectScreenProps {
  onSelectLevel: (level: LevelKey) => void;
  onBackToCover: () => void;
  onMateriClick: () => void;
}

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  onSelectLevel,
  onBackToCover,
  onMateriClick,
}) => {
  const getLevelIcon = (levelKey: LevelKey) => {
    switch (levelKey) {
      case 'mudah':
        return <Sprout className="w-8 h-8 text-emerald-600" />;
      case 'sedang':
        return <Flower2 className="w-8 h-8 text-amber-600" />;
      case 'sulit':
        return <Trees className="w-8 h-8 text-purple-600" />;
      case 'hots':
        return <Flame className="w-8 h-8 text-rose-600 animate-pulse" />;
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center p-3 sm:p-6">
      
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-10 border-4 border-amber-600/80 shadow-2xl relative overflow-hidden animate-bounce-in">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap justify-between items-center gap-3 pb-4 border-b-2 border-amber-200">
          <button
            onClick={() => {
              sound.playClick();
              onBackToCover();
            }}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border border-amber-300 shadow-sm active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Cerita</span>
          </button>

          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-4 py-1.5 rounded-full text-xs sm:text-sm">
            🌾 Zona Belajar Desa Harmoni
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onMateriClick();
            }}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1 border border-amber-300 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Materi</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center my-6 space-y-2">
          <h2 className="font-title text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-950">
            Pilih Tingkat Misi Berbagi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Mulai dari konsep dasar dengan bantuan slot, hingga memecahkan masalah bernalar kritis di Tantangan HOTS.
          </p>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {(Object.keys(LEVEL_METADATA) as LevelKey[]).map((levelKey) => {
            const meta = LEVEL_METADATA[levelKey];
            const isHots = levelKey === 'hots';

            return (
              <button
                key={levelKey}
                onClick={() => {
                  sound.playClick();
                  onSelectLevel(levelKey);
                }}
                className={`group relative text-left p-5 rounded-2xl border-3 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:scale-95 cursor-pointer ${
                  isHots
                    ? 'bg-gradient-to-br from-rose-50 to-orange-50/90 border-rose-400 hover:border-rose-600 shadow-rose-200'
                    : levelKey === 'sulit'
                    ? 'bg-gradient-to-br from-purple-50 to-indigo-50/90 border-purple-400 hover:border-purple-600 shadow-purple-200'
                    : levelKey === 'sedang'
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50/90 border-amber-400 hover:border-amber-600 shadow-amber-200'
                    : 'bg-gradient-to-br from-emerald-50 to-teal-50/90 border-emerald-400 hover:border-emerald-600 shadow-emerald-200'
                }`}
              >
                {/* Top Badge */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${meta.badgeColor}`}>
                    {meta.subtitle}
                  </span>
                  <div className="p-2 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                    {getLevelIcon(levelKey)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <h3 className="font-title text-xl font-bold text-slate-800 group-hover:text-amber-900 transition-colors">
                    {meta.title}
                  </h3>
                  {isHots && (
                    <span className="flex items-center text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      <Sparkles className="w-3 h-3 mr-1" /> Rekomendasi Guru
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {meta.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200/70 flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span>{meta.count} Soal Tantangan</span>
                  <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform">
                    Mulai Main →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Educational note footer */}
        <div className="bg-amber-100/70 border border-amber-300 rounded-2xl p-4 text-center text-xs sm:text-sm text-amber-950 font-medium">
          💡 <strong>Tips Pak Kades:</strong> Pembagian adalah mengurangi bilangan secara berulang sampai habis bernilai <strong>0</strong>. Banyaknya kali pengurangan adalah hasil pembagiannya!
        </div>

      </div>

    </div>
  );
};
