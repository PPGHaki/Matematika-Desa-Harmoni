import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface MateriModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MateriModal: React.FC<MateriModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto animate-bounce-in">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border-4 border-emerald-500 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto space-y-5">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b-2 border-emerald-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-xl font-bold text-emerald-950">Materi Konsep Pembagian</h3>
              <p className="text-xs text-slate-500">Matematika Kelas 4 SD • Pengurangan Berulang & HOTS</p>
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

        {/* Section 1: Konsep Inti */}
        <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 space-y-2">
          <h4 className="font-title text-base font-bold text-emerald-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>1. Pembagian sebagai Pengurangan Berulang</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Pembagian adalah proses membagi suatu kumpulan benda secara adil dan rata. Dalam konsep matematika, pembagian dapat diartikan sebagai <strong>mengurangi suatu bilangan secara terus-menerus dengan bilangan yang sama sampai menghasilkan 0 (habis)</strong>.
          </p>
        </div>

        {/* Section 2: Contoh Nyata */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 space-y-3">
          <h4 className="font-title text-base font-bold text-amber-950 flex items-center gap-1.5">
            <span>🧺</span>
            <span>2. Contoh Kasus: Membagikan 12 Apel ke Keranjang</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700">
            Pak Kades mempunyai <strong>12 apel</strong> dan ingin membagikannya ke beberapa keranjang. Setiap keranjang harus berisi tepat <strong>3 apel</strong>:
          </p>

          <div className="space-y-1.5 bg-white p-3 rounded-xl border border-amber-200 text-xs sm:text-sm font-mono font-semibold text-slate-800">
            <div className="flex justify-between">
              <span>Pengurangan ke-1:</span>
              <span>12 - 3 = <strong>9</strong> (Keranjang 1 terisi)</span>
            </div>
            <div className="flex justify-between">
              <span>Pengurangan ke-2:</span>
              <span>9 - 3 = <strong>6</strong> (Keranjang 2 terisi)</span>
            </div>
            <div className="flex justify-between">
              <span>Pengurangan ke-3:</span>
              <span>6 - 3 = <strong>3</strong> (Keranjang 3 terisi)</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Pengurangan ke-4:</span>
              <span>3 - 3 = <strong>0 (Habis!)</strong> (Keranjang 4 terisi)</span>
            </div>
          </div>

          <div className="bg-emerald-600 text-white p-3 rounded-xl text-center font-title text-sm sm:text-base font-bold">
            Karena ada 4 kali pengurangan dengan angka 3, maka: <br />
            <span className="text-yellow-200 text-lg">12 ÷ 3 = 4</span>
          </div>
        </div>

        {/* Section 3: Tips Menjawab Soal HOTS */}
        <div className="bg-rose-50/90 border-2 border-rose-300 rounded-2xl p-4 space-y-2">
          <h4 className="font-title text-base font-bold text-rose-950 flex items-center gap-1.5">
            <span>🔥</span>
            <span>3. Rahasia Memecahkan Soal Cerita HOTS</span>
          </h4>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span><strong>Cari Angka Bersih:</strong> Jika ada sisa panen yang disimpan atau dimakan terlebih dahulu, kurangkan dulu dari jumlah awal!</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span><strong>Tentukan Kapasitas Wadah:</strong> Teliti berapa barang yang diminta masuk ke tiap wadah / kelompok.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span><strong>Lakukan Pengurangan Sampai Nol:</strong> Hitung berapa wadah yang penuh dan periksa apakah ada barang yang tersisa.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-title text-base font-bold py-3 rounded-xl shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Siap Mengerjakan Tantangan!</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
