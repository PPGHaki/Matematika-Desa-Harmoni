import React, { useState } from 'react';
import { Volume2, Play, BookOpen, User, Sparkles, ArrowRight } from 'lucide-react';
import { sound, speakIndonesian } from '../utils/sound';

interface CoverScreenProps {
  onStartClick: () => void;
  onMateriClick: () => void;
  onKadesProfileClick: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onStartClick,
  onMateriClick,
  onKadesProfileClick,
}) => {
  const [isPlayingStory, setIsPlayingStory] = useState(false);

  const welcomeText = `Selamat datang di Desa Harmoni! Saya Pak Wijaya, Kepala Desa Harmoni. Seluruh warga sedang bersiap mengadakan festival panen dan bakti sosial. Kami membutuhkan bantuanmu, Pahlawan Cilik Matematika, untuk membagikan berbagai hasil panen secara adil dan merata dengan prinsip pembagian sebagai pengurangan berulang. Mari belajar bersama dan raih bintang prestasi!`;

  const handleReadCoverStory = () => {
    sound.playClick();
    setIsPlayingStory(true);
    speakIndonesian(welcomeText);
    setTimeout(() => {
      setIsPlayingStory(false);
    }, 12000);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center p-3 sm:p-6">
      
      {/* Scenic Card Container with Frosted Glow */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-8 md:p-10 border-4 border-amber-600/80 shadow-2xl relative overflow-hidden animate-bounce-in">
        
        {/* Floating Decorative badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-amber-200">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-emerald-100 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            <span className="font-title font-bold text-xs sm:text-sm text-amber-900 tracking-wider">
              PETUALANGAN MATEMATIKA KELAS 4 SD
            </span>
          </div>

          <button
            onClick={handleReadCoverStory}
            className={`text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-2xl flex items-center space-x-2 transition-all shadow-md active:scale-95 cursor-pointer ${
              isPlayingStory 
                ? 'bg-emerald-600 text-white animate-pulse' 
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-400'
            }`}
            title="Dengarkan Suara Pak Kades"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>{isPlayingStory ? 'Sedang Membaca...' : 'Dengarkan Sambutan'}</span>
          </button>
        </div>

        {/* Character & Story Greeting (Inspired by Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
          
          {/* Pak Kepala Desa Avatar with Wooden Plaque */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative">
              {/* Wooden frame for Character */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-1 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-900 shadow-2xl border-4 border-amber-200 animate-float overflow-hidden">
                <img 
                  src="/assets/pak_kades_main.jpg" 
                  alt="Pak Wijaya - Kepala Desa Harmoni" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Character Title Badge */}
              <div className="absolute -bottom-3 inset-x-0 mx-auto w-max bg-gradient-to-r from-amber-600 to-amber-700 text-white font-title font-bold text-xs px-3 py-1 rounded-full shadow-lg border-2 border-white">
                Pak Wijaya
              </div>
            </div>

            <div className="mt-4 text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3.5 py-1 rounded-xl border border-emerald-300">
              Kepala Desa Harmoni
            </div>
            <p className="text-[11px] text-slate-500 mt-1 italic">
              "Pemimpin yang ramah, bijaksana, dan peduli sesama"
            </p>
          </div>

          {/* Story Narrative Box */}
          <div className="md:col-span-8 bg-gradient-to-br from-amber-50/90 to-emerald-50/90 border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm relative">
            <div className="hidden md:block absolute -left-3 top-12 w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-amber-300 border-b-8 border-b-transparent"></div>
            
            <h2 className="font-title text-xl sm:text-2xl font-bold text-amber-950 mb-2 flex items-center gap-2">
              <span>Halo, Pahlawan Matematika Cilik!</span>
              <span className="text-2xl">👋</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
              Selamat datang di <strong className="text-emerald-800">Desa Harmoni</strong>! Hari ini seluruh warga sedang bersiap mengadakan festival panen dan bakti sosial. Namun, warga desa membutuhkan keahlianmu untuk <strong className="text-amber-900 underline decoration-wavy">membagikan berbagai barang secara adil dan merata</strong>!
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-2">
              Di game ini, kamu akan membuktikan bahwa <strong className="text-indigo-800">Pembagian adalah Pengurangan Berulang</strong>. Bersiaplah mengelola karung beras, keranjang sayur, madu hutan, hingga tantangan penalaran HOTS tingkat tinggi!
            </p>
          </div>

        </div>

        {/* 3 Step Mission Highlights (Image 3 inspired) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
          <div className="bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 rounded-2xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-amber-500 text-white rounded-xl font-bold font-title text-lg flex items-center justify-center mx-auto mb-2 shadow">
              1
            </div>
            <h3 className="font-title font-bold text-amber-950 text-sm">Baca Masalah Warga</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Cermati jumlah barang panen mula-mula dan berapa isi yang harus dimasukkan ke tiap wadah.
            </p>
          </div>

          <div className="bg-gradient-to-b from-teal-50 to-white border-2 border-teal-300 rounded-2xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-teal-600 text-white rounded-xl font-bold font-title text-lg flex items-center justify-center mx-auto mb-2 shadow">
              2
            </div>
            <h3 className="font-title font-bold text-teal-950 text-sm">Kelompokkan ke Wadah</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Klik benda satu per satu untuk dimasukkan ke wadah sampai isinya tepat dan pas.
            </p>
          </div>

          <div className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-300 rounded-2xl p-4 shadow-sm text-center">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl font-bold font-title text-lg flex items-center justify-center mx-auto mb-2 shadow">
              3
            </div>
            <h3 className="font-title font-bold text-emerald-950 text-sm">Pengurangan Berulang</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Benda dikurangi terus-menerus sampai bersisa 0. Jumlah wadah adalah hasil pembagiannya!
            </p>
          </div>
        </div>

        {/* Action Buttons styled like the wooden menu in Image 3 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
          
          {/* Mulai Button (Green Wooden Style) */}
          <button
            onClick={() => {
              sound.playClick();
              onStartClick();
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-title text-lg sm:text-xl font-bold py-3.5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2.5 border-2 border-emerald-300 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>Mulai Petualangan</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          {/* Materi Button (Brown Wooden Style) */}
          <button
            onClick={() => {
              sound.playClick();
              onMateriClick();
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-title text-base sm:text-lg font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 border-2 border-amber-400 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-200" />
            <span>Materi Konsep</span>
          </button>

          {/* Kades Profile Button (Purple Wooden Style) */}
          <button
            onClick={() => {
              sound.playClick();
              onKadesProfileClick();
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-title text-base sm:text-lg font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 border-2 border-purple-400 cursor-pointer"
          >
            <User className="w-5 h-5 text-purple-200" />
            <span>Profil Tokoh</span>
          </button>

        </div>

      </div>

    </div>
  );
};
