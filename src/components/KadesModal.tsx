import React, { useState } from 'react';
import { X, User, Heart, Sparkles, Volume2 } from 'lucide-react';
import { sound, speakIndonesian } from '../utils/sound';

interface KadesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KadesModal: React.FC<KadesModalProps> = ({ isOpen, onClose }) => {
  const [selectedExpression, setSelectedExpression] = useState<string>('senang');

  if (!isOpen) return null;

  const expressions = [
    {
      id: 'senang',
      name: 'Senang',
      img: '/assets/pak_kades_main.jpg',
      quote: 'Halo anak-anak pintar! Senang sekali melihat semangat kalian belajar matematika hari ini.',
      desc: 'Menyambut warga dan anak-anak dengan ramah dan penuh kehangatan.',
    },
    {
      id: 'tertawa',
      name: 'Tertawa & Bahagia',
      img: '/assets/pak_kades_happy.jpg',
      quote: 'Hahaha, luar biasa! Kalian membagikan hasil panen dengan sangat adil dan cepat.',
      desc: 'Bahagia ketika warga rukun dan kegiatan gotong royong berjalan sukses.',
    },
    {
      id: 'berpikir',
      name: 'Berpikir Logis',
      img: '/assets/pak_kades_thinking.jpg',
      quote: 'Mari kita renungkan bersama: berapa isi tiap wadah agar pembagian ini habis dan merata?',
      desc: 'Menganalisis masalah pembagian dan perencanaan lumbung pangan desa.',
    },
    {
      id: 'semangat',
      name: 'Semangat Gotong Royong',
      img: '/assets/pak_kades_happy.jpg',
      quote: 'Ayo pantang menyerah! Dengan gotong royong dan ketelitian, semua tantangan pasti teratasi!',
      desc: 'Memberikan dorongan moril kepada seluruh warga desa.',
    },
  ];

  const currentExp = expressions.find(e => e.id === selectedExpression) || expressions[0];

  const handlePlayVoice = (text: string) => {
    sound.playClick();
    speakIndonesian(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto animate-bounce-in">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border-4 border-amber-500 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto space-y-5">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b-2 border-amber-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-xl font-bold text-amber-950">Profil Tokoh: Pak Kepala Desa</h3>
              <p className="text-xs text-slate-500">Tokoh Utama Pemimpin Petualangan di Desa Harmoni</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card (matching Image 2) */}
        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-lg flex-shrink-0">
            <img 
              src={currentExp.img} 
              alt={currentExp.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="font-title text-xl font-bold text-amber-950">Pak Wijaya</h4>
              <span className="bg-amber-200 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Kepala Desa Harmoni
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Pak Kepala Desa adalah sosok pemimpin yang bijaksana, ramah, dan selalu peduli dengan warganya. Beliau selalu mendukung kegiatan positif di Desa Harmoni, termasuk program pembagian hasil kebun dan bakti sosial pengurangan berulang.
            </p>

            <button
              onClick={() => handlePlayVoice(currentExp.quote)}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl inline-flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Petuah Pak Kades</span>
            </button>
          </div>
        </div>

        {/* Quotes Speech Bubble */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 italic">
          "{currentExp.quote}"
        </div>

        {/* Expressions Grid (Inspired by Image 2 Character Sheet) */}
        <div className="space-y-2">
          <h5 className="font-title text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Ekspresi & Sikap Karakter:</span>
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {expressions.map((exp) => (
              <button
                key={exp.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExpression(exp.id);
                }}
                className={`p-2.5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  selectedExpression === exp.id
                    ? 'bg-amber-100 border-amber-500 shadow-md scale-102'
                    : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-xl overflow-hidden border border-slate-300 mb-1.5">
                  <img src={exp.img} alt={exp.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-title text-xs font-bold text-slate-800 truncate">{exp.name}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-title text-base font-bold py-2.5 rounded-xl shadow-md cursor-pointer"
        >
          Kembali ke Permainan
        </button>

      </div>
    </div>
  );
};
