import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, CheckCircle2, RotateCcw, ArrowRight, Sparkles, AlertCircle, Info } from 'lucide-react';
import { QuestionData, LevelKey, CharacterMood } from '../types/game';
import { ItemVisual } from './ItemVisual';
import { StoryCard } from './StoryCard';
import { sound } from '../utils/sound';

interface GameScreenProps {
  question: QuestionData;
  questionIndex: number;
  totalQuestions: number;
  levelKey: LevelKey;
  levelTitle: string;
  onNextQuestion: () => void;
  onPrevLevelSelect: () => void;
  onAddScore: (points: number) => void;
}

interface ContainerItem {
  id: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  levelKey,
  levelTitle,
  onNextQuestion,
  onPrevLevelSelect,
  onAddScore,
}) => {
  // Items available on the table
  const [itemsAvailable, setItemsAvailable] = useState<boolean[]>([]);
  // Current active container being filled
  const [currentContainerItems, setCurrentContainerItems] = useState<ContainerItem[]>([]);
  // Completed containers
  const [completedContainers, setCompletedContainers] = useState<ContainerItem[][]>([]);
  // Mathematical history
  const [subtractionHistory, setSubtractionHistory] = useState<number[]>([]);
  // Feedback alert message and type
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  // Is current question completed?
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // Character mood
  const [mood, setMood] = useState<CharacterMood>('normal');
  // Modal for hint
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  // Ref for completion box
  const completionRef = useRef<HTMLDivElement>(null);

  // Initialize question state
  useEffect(() => {
    setItemsAvailable(Array(question.dividend).fill(true));
    setCurrentContainerItems([]);
    setCompletedContainers([]);
    setSubtractionHistory([question.dividend]);
    setFeedback(null);
    setIsCompleted(false);
    setMood(question.isHots ? 'thinking' : 'normal');
  }, [question]);

  // Smooth scroll to completion box when completed
  useEffect(() => {
    if (isCompleted && completionRef.current) {
      const timer = setTimeout(() => {
        completionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  const remainingCount = itemsAvailable.filter(Boolean).length;
  const stepCount = completedContainers.length;

  // Handle clicking an item from the main table
  const handleSelectItem = (index: number) => {
    if (isCompleted || !itemsAvailable[index]) return;

    sound.playItemPick();
    setFeedback(null);

    // Remove from table
    const nextAvailable = [...itemsAvailable];
    nextAvailable[index] = false;
    setItemsAvailable(nextAvailable);

    // Add to current active container
    const nextContainer = [...currentContainerItems, { id: index }];
    setCurrentContainerItems(nextContainer);

    // In Level 1 (Mudah), auto-check when container reaches divisor
    if (levelKey === 'mudah' && nextContainer.length === question.divisor) {
      commitContainerSuccess(nextContainer, nextAvailable);
    }
  };

  // Return item from container back to table
  const handleReturnItem = (containerItemIndex: number) => {
    if (isCompleted) return;

    sound.playClick();
    const itemToReturn = currentContainerItems[containerItemIndex];
    if (!itemToReturn) return;

    const nextContainer = [...currentContainerItems];
    nextContainer.splice(containerItemIndex, 1);
    setCurrentContainerItems(nextContainer);

    const nextAvailable = [...itemsAvailable];
    nextAvailable[itemToReturn.id] = true;
    setItemsAvailable(nextAvailable);
    setFeedback(null);
  };

  // Validate container in Level 2, 3, and HOTS
  const handleValidateContainer = () => {
    sound.playClick();

    if (currentContainerItems.length === 0) {
      sound.playError();
      setFeedback({
        message: '⚠️ Masukkan beberapa barang terlebih dahulu dari meja utama ke dalam wadah!',
        type: 'warning',
      });
      return;
    }

    if (currentContainerItems.length === question.divisor) {
      setFeedback({
        message: `✅ **BENAR & PAS!** Wadah terisi tepat ${question.divisor} ${question.unitName} sesuai cerita!`,
        type: 'success',
      });
      commitContainerSuccess(currentContainerItems);
    } else {
      sound.playError();
      setMood('thinking');
      setFeedback({
        message: `❌ **BELUM TEPAT!** Kamu memasukkan ${currentContainerItems.length} ${question.unitName}. Cermati cerita: berapa seharusnya isi tiap wadah? Barang dikembalikan ke meja untuk ditata ulang.`,
        type: 'error',
      });

      // Return items back to table
      const nextAvailable = [...itemsAvailable];
      currentContainerItems.forEach(item => {
        nextAvailable[item.id] = true;
      });
      setItemsAvailable(nextAvailable);
      setCurrentContainerItems([]);
    }
  };

  // Commit valid container
  const commitContainerSuccess = (validItems: ContainerItem[], updatedAvailable?: boolean[]) => {
    sound.playSubtract();
    const nextCompleted = [...completedContainers, validItems];
    setCompletedContainers(nextCompleted);
    setCurrentContainerItems([]);
    setSubtractionHistory(prev => [...prev, question.divisor]);

    // Check if all items on the table have been distributed or target containers reached
    const tableAvailable = updatedAvailable || itemsAvailable;
    const remainingOnTable = tableAvailable.filter(Boolean).length;
    const targetContainers = Math.round(question.dividend / question.divisor);
    const isFinished = remainingOnTable === 0 || nextCompleted.length >= targetContainers;

    if (isFinished) {
      handleCompleteQuestion();
    } else {
      if (levelKey === 'mudah') {
        setFeedback({
          message: `✨ Wadah ke-${nextCompleted.length} penuh! Dikurangi ${question.divisor} ${question.unitName}. Lanjut isi wadah berikutnya!`,
          type: 'info',
        });
      }
    }
  };

  // Complete question
  const handleCompleteQuestion = () => {
    sound.playSuccess();
    setIsCompleted(true);
    setMood('happy');
    onAddScore(20);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  // Progress percentage
  const progressPercent = Math.round(((questionIndex) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-5 p-2 sm:p-4">
      
      {/* Top Navigation & Level Progress Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-amber-300 shadow-md flex flex-col gap-2">
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick();
                onPrevLevelSelect();
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 transition-all border border-amber-300 shadow-sm active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ganti Level</span>
            </button>
            <span className="font-title text-emerald-800">
              Soal {questionIndex + 1} dari {totalQuestions}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-0.5 rounded-full text-xs font-bold">
              {levelTitle}
            </span>
          </div>
        </div>

        {/* Progress Bar with Green/Teal Gradient */}
        <div className="w-full bg-amber-100/80 h-3 rounded-full overflow-hidden p-0.5 border border-amber-300">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Story & Character Dialogue Box */}
      <StoryCard 
        question={question}
        mood={mood}
        onShowHint={() => setShowHintModal(true)}
      />

      {/* Educational Guide Pill */}
      <div className="bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 flex items-start space-x-3 text-amber-950 text-xs sm:text-sm shadow-sm">
        <div className="p-1.5 bg-amber-200 rounded-xl text-amber-800 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <span className="font-title font-bold text-amber-900 text-sm">Panduan Misi:</span>
          <p className="leading-relaxed text-slate-700">
            {levelKey === 'mudah' ? (
              <>Klik <strong>{question.itemName}</strong> di meja untuk dimasukkan ke wadah. Setiap wadah diisi tepat <strong>{question.divisor} {question.unitName}</strong> (ada slot panduan otomatis)!</>
            ) : question.isHots ? (
              <>🔥 <strong>Penalaran HOTS:</strong> Tentukan jumlah yang harus diisi di tiap wadah sesuai analisis ceritamu, klik barang ke wadah, lalu klik tombol <strong>"Cek Wadah Ini"</strong>!</>
            ) : (
              <>Klik <strong>{question.itemName}</strong> ke wadah sesuai cerita. Setelah menurutmu isinya pas, tekan tombol <strong>"Cek Wadah Ini"</strong>!</>
            )}
          </p>
        </div>
      </div>

      {/* Dynamic Feedback Toast */}
      {feedback && (
        <div 
          className={`rounded-2xl p-3 sm:p-4 text-center text-xs sm:text-sm font-bold border-2 animate-bounce-in shadow-md ${
            feedback.type === 'success'
              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
              : feedback.type === 'error'
              ? 'bg-rose-100 border-rose-400 text-rose-900 animate-shake'
              : feedback.type === 'warning'
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-teal-100 border-teal-400 text-teal-900'
          }`}
          dangerouslySetInnerHTML={{ __html: feedback.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
        />
      )}

      {/* Main Interactive Field (Meja Utama vs Wadah) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
        
        {/* LEFT COLUMN: Meja Utama Lumbung Desa (Items to be divided) */}
        <div className="md:col-span-6 bg-gradient-to-b from-amber-50/95 to-amber-100/90 border-3 border-amber-500 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3 min-h-[300px]">
          
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-amber-950 pb-2 border-b-2 border-amber-300">
            <span className="flex items-center gap-1.5">
              <span>🌾</span> Meja Utama (Belum Dibagi)
            </span>
            <span className="bg-amber-200/90 text-amber-900 px-3 py-0.5 rounded-full border border-amber-400 shadow-sm font-title">
              Sisa: <strong className="text-emerald-700 text-base">{remainingCount}</strong> {question.unitName}
            </span>
          </div>

          {/* Interactive Item Grid */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 p-2 max-h-[260px] overflow-y-auto">
            {itemsAvailable.map((isAvailable, idx) => {
              if (!isAvailable) return null;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectItem(idx)}
                  disabled={isCompleted}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 hover:bg-amber-100 border-2 border-amber-400 hover:border-amber-600 rounded-2xl flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all duration-200 transform animate-bounce-in cursor-pointer disabled:opacity-50"
                  title={`Klik untuk memasukkan ${question.itemName} ini ke wadah`}
                >
                  <ItemVisual itemKey={question.itemKey} size="md" />
                </button>
              );
            })}

            {remainingCount === 0 && (
              <div className="text-center py-8 space-y-2 animate-bounce-in">
                <span className="text-4xl">✨</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-800">
                  Seluruh {question.itemName} telah habis dibagikan ke wadah!
                </p>
              </div>
            )}
          </div>

          <p className="text-[11px] text-amber-800/80 text-center italic">
            👆 Klik barang di atas untuk memindahkannya ke wadah di sebelah kanan
          </p>
        </div>

        {/* RIGHT COLUMN: Area Wadah & Riwayat Matematika */}
        <div className="md:col-span-6 space-y-4">
          
          {/* Containers Area */}
          <div className="bg-white/95 border-3 border-teal-500 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3 min-h-[180px]">
            
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-teal-950 pb-2 border-b-2 border-teal-200">
              <span className="flex items-center gap-1.5">
                <span>🧺</span> Area Wadah Pembagian
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-title ${
                remainingCount === 0 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-teal-100 text-teal-800 border border-teal-300'
              }`}>
                {remainingCount === 0 ? 'Semua Selesai! ✨' : `Wadah ke-${stepCount + 1}`}
              </span>
            </div>

            {/* Containers List Display */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 max-h-[220px] overflow-y-auto p-1">
              
              {/* Completed Containers */}
              {completedContainers.map((container, cIdx) => (
                <div 
                  key={cIdx}
                  className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-2.5 flex flex-col items-center justify-between min-w-[95px] shadow-sm animate-bounce-in"
                >
                  <div className="text-[10px] font-bold text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-full mb-1">
                    Wadah {cIdx + 1} (Pas!)
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 my-1">
                    {container.map((_, iIdx) => (
                      <ItemVisual key={iIdx} itemKey={question.itemKey} size="sm" />
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 mt-1">
                    -{container.length} {question.unitName}
                  </div>
                </div>
              ))}

              {/* Active Container being filled */}
              {(remainingCount > 0 || currentContainerItems.length > 0) && (
                <div className="bg-amber-50 border-2 border-dashed border-amber-500 rounded-2xl p-2.5 flex flex-col items-center justify-between min-w-[110px] shadow-sm min-h-[100px]">
                  
                  <div className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full mb-1">
                    {levelKey === 'mudah'
                      ? `Wadah ${stepCount + 1} (${currentContainerItems.length}/${question.divisor})`
                      : `Wadah ${stepCount + 1} (${currentContainerItems.length} isi)`
                    }
                  </div>

                  {/* Items currently in active container */}
                  <div className="flex flex-wrap justify-center gap-1 my-1">
                    {levelKey === 'mudah' ? (
                      // Display divisor slots
                      Array.from({ length: question.divisor }).map((_, slotIdx) => {
                        if (slotIdx < currentContainerItems.length) {
                          return (
                            <button
                              key={slotIdx}
                              onClick={() => handleReturnItem(slotIdx)}
                              className="cursor-pointer hover:scale-90 transition-transform"
                              title="Klik untuk mengembalikan ke meja"
                            >
                              <ItemVisual itemKey={question.itemKey} size="sm" />
                            </button>
                          );
                        } else {
                          return (
                            <div 
                              key={slotIdx}
                              className="w-7 h-7 border-2 border-dashed border-amber-300 rounded-xl flex items-center justify-center text-xs text-amber-400 font-bold bg-white/60"
                              title="Slot kosong"
                            >
                              ?
                            </div>
                          );
                        }
                      })
                    ) : (
                      currentContainerItems.length === 0 ? (
                        <span className="text-[11px] text-amber-700/80 my-auto py-2 italic text-center">
                          Wadah masih kosong
                        </span>
                      ) : (
                        currentContainerItems.map((_, iIdx) => (
                          <button
                            key={iIdx}
                            onClick={() => handleReturnItem(iIdx)}
                            className="cursor-pointer hover:scale-90 transition-transform"
                            title="Klik untuk mengembalikan ke meja"
                          >
                            <ItemVisual itemKey={question.itemKey} size="sm" />
                          </button>
                        ))
                      )
                    )}
                  </div>

                  <div className="text-[9px] text-amber-800 font-medium mt-1">
                    {currentContainerItems.length > 0 ? '👆 Klik barang untuk batalkan' : 'Klik barang dari meja'}
                  </div>
                </div>
              )}

            </div>

            {/* Manual Check Button for Level 2, 3, and HOTS */}
            {levelKey !== 'mudah' && !isCompleted && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleValidateContainer}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-title font-bold py-2.5 px-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cek Wadah Ini</span>
                </button>
              </div>
            )}

          </div>

          {/* Subtraction History Card */}
          <div className="bg-emerald-50/95 border-2 border-emerald-400 rounded-2xl p-3 sm:p-4 text-center space-y-1 shadow-sm">
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
              Bentuk Pengurangan Berulang:
            </span>
            <div className="font-title text-lg sm:text-2xl text-emerald-950 font-extrabold tracking-wider min-h-[36px] flex items-center justify-center flex-wrap gap-1.5">
              {subtractionHistory.map((val, idx) => {
                if (idx === 0) return <span key={idx} className="text-slate-800">{val}</span>;
                return (
                  <React.Fragment key={idx}>
                    <span className="text-amber-600 font-bold">-</span>
                    <span className="text-emerald-700">{val}</span>
                  </React.Fragment>
                );
              })}

              {remainingCount === 0 && (
                <span className="text-emerald-700 font-bold ml-1">= 0 ✨</span>
              )}
            </div>
          </div>

          {/* Counter info */}
          <div className="bg-white/90 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-600 flex justify-between items-center shadow-inner">
            <span>Jumlah Wadah Terisi:</span>
            <span className="font-bold text-emerald-800 font-title text-sm">
              {stepCount} Wadah ({stepCount} kali pengurangan)
            </span>
          </div>

        </div>

      </div>

      {/* Completion & Explanation Box */}
      {isCompleted && (
        <div 
          ref={completionRef}
          className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-5 sm:p-7 space-y-4 shadow-2xl border-4 border-amber-300 animate-bounce-in scroll-mt-20"
        >
          
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
              ✨
            </div>
            <div>
              <h3 className="font-title text-xl sm:text-2xl font-bold text-amber-200">
                Luar Biasa! Analisis Tepat & Barang Habis Terbagi!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Kamu berhasil membagikan hasil panen Desa Harmoni dengan sangat adil.
              </p>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 text-sm sm:text-base leading-relaxed space-y-3 font-medium border border-white/20">
            <p>
              Seluruh <strong>{question.dividend} {question.itemName}</strong> berhasil dikurangi <strong>{question.divisor}</strong> sebanyak <strong>{Math.round(question.dividend / question.divisor)} kali</strong> hingga tersisa <strong>0</strong>.
            </p>

            {question.explanation && (
              <div className="bg-amber-400/20 border border-amber-300/40 p-3 rounded-xl text-yellow-100 text-xs sm:text-sm font-sans space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-200">
                  <Sparkles className="w-4 h-4" />
                  <span>Penjelasan Analisis HOTS:</span>
                </div>
                <p>{question.explanation}</p>
              </div>
            )}

            <div className="bg-white/20 p-3.5 rounded-xl text-center font-title text-base sm:text-lg border border-white/30 space-y-1">
              <div>
                Bentuk Pengurangan Berulang: <strong>{subtractionHistory.join(' - ')} = 0</strong>
              </div>
              <div className="text-yellow-200 font-bold">
                Bentuk Operasi Pembagian: <strong>{question.dividend} ÷ {question.divisor} = {Math.round(question.dividend / question.divisor)}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNextQuestion();
            }}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-title text-lg sm:text-xl font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center space-x-2 border-2 border-white cursor-pointer"
          >
            <span>{questionIndex + 1 < totalQuestions ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir Misi'}</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

        </div>
      )}

      {/* Hint Modal */}
      {showHintModal && question.hint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-bounce-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-400 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-title text-xl font-bold text-amber-950">Petunjuk Pak Kades</h4>
            </div>
            
            <p className="text-slate-700 text-sm leading-relaxed bg-amber-50 p-4 rounded-2xl border border-amber-200">
              {question.hint}
            </p>

            <button
              onClick={() => {
                sound.playClick();
                setShowHintModal(false);
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-title font-bold py-2.5 rounded-xl shadow-md cursor-pointer"
            >
              Saya Mengerti!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
